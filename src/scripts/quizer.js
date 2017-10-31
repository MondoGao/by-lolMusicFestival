import $ from 'zepto';

import { publicPath } from '../../settings';
import { quizSetData, quizData } from './quizData';
import ranksData, { getRankName } from './ranksData';
import audioController from './audioController';
import { quizLoad } from './loader';

import { switchNextPage, reconfigWechat } from './helpers';
import imgIcon from '../assets/icon.png';

const optionResolveContext = require.context('../assets/quiz', true, /\.(jpg|mp3)$/);
const rankResolveContext = require.context('../assets/ranks', false, /\.svg$/);

const quizer = {
  /**
   * Select quiz set, prefer 'REC'
   */
  resetQuizSet() {
    let isRec = Math.random() <= 0.3;
    if (this.currentSet === 'REC') {
      isRec = false;
    }

    if (isRec) {
      this.currentSet = 'REC';
    } else {
      const sets = Object.keys(quizSetData).filter(setName => setName !== 'REC');

      this.currentSet = sets[Math.floor((Math.random() * 0.999) * sets.length)];
    }

    this.current = 0;
    this.total = this.getSetData().length;
    this.score = 0;
    this.fail = 0;
    this.combo = 0;
  },
  /**
   * Return quiz arr
   */
  getSetData() {
    return quizSetData[this.currentSet];
  },
  getCurrentQuiz() {
    return quizData.find(({ id }) => id === this.getSetData()[this.current]);
  },
  init() {
    this.MAX_FAIL = 999;

    this.resetQuizSet();

    this.isLocked = false;

    this.beatPlayerNum = 0;
    this.totalPlayerNum = 1;

    this.$currentNum = $('#quizCurrentNum');
    this.$totalNum = $('#quizTotalNum');
    this.$quizQuestion = $('#quizQuestion');
    this.$quizAnwsers = $('#quizAnwsers');
    this.$shortRank = $('#shortRank');

    this.$ranks = $('.rank');
    this.$beatPercent = $('#beatPercent');
    this.$medal = $('#medal');

    $('.star').forEach(star => $(star).removeClass('right wrong'));

    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.switchQuiz = this.switchQuiz.bind(this);

    audioController.init();

    this.sync();
  },
  handleOptionClick(optionIndex) {
    if (this.isLocked) {
      return;
    }

    this.isLocked = true;
    audioController.isLocked = true;

    audioController.pause();

    const { answerIndex } = this.getCurrentQuiz();
    const isRight = optionIndex === answerIndex;

    const cards = this.$quizAnwsers.children();

    const $rightCard = $(cards[answerIndex]);
    const $clickedCard = $(cards[optionIndex]);

    if (isRight) {
      $(`#star${this.current + 1}`).addClass('right');

      $rightCard.addClass('congratulation');

      $('#timerWrapper').addClass('update');

      this.score += 10;
      this.combo += 1;

      if (this.score !== 10) {
        $(`#audioKill${this.combo}`)[0].play();
      } else {
        $('#audioFirst')[0].play();
      }
    } else {
      this.fail += 1;

      if (this.combo >= 2) {
        $('#audioShutdown')[0].play();
      }

      this.combo = 0;

      $(`#star${this.current + 1}`).addClass('wrong');

      $rightCard.addClass('rightAnswer');
      $clickedCard.addClass('wrongAnswer');
    }

    setTimeout(this.switchQuiz, 1200);
    this.updateRank();
  },
  finish() {
    _czc.push(["_trackEvent", '游戏', '完成', this.currentSet, this.score]);

    fetch(`${publicPath}rank`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'x-www-form-urlencoded',
      },
      body: $.param({
        score: this.score,
      }),
    })
      .then(data => data.json())
      .then(({ data }) => {
        this.beatPlayerNum = data.beat_player_number;
        this.totalPlayerNum = data.sum_player_number;

        this.sync();

        switchNextPage('quiz', 'result');
      });

    const rankEngName = getRankName(this.score);
    const rank = ranksData[rankEngName];

    reconfigWechat({
      link: window.location.href.split('#')[0],
      title: '英雄联盟音乐排位赛',
      imgUrl: imgIcon,
      desc: rank.shareDesc,
      label: '',
    });
  },
  isEnded() {
    return this.fail === this.MAX_FAIL || this.current === this.total;
  },
  switchQuiz() {
    $('#timerWrapper').removeClass('update');

    this.current += 1;

    if (this.isEnded()) {
      this.finish();
    } else {
      this.sync();

      this.isLocked = false;
      audioController.isLocked = false;
    }
  },
  createAnswerCard({ id, hasImage }, optionIndex, optionDesc) {
    const card = $(`
      <li class="answerCard fadeInDown animated">
        ${hasImage ?
            `<img src="${optionResolveContext(`./${id}/${optionIndex + 1}.jpg`)}" alt=""/>` : ''}
        <span>${optionDesc}</span>
      </li>
    `);

    card.on('click', () => {
      this.handleOptionClick(optionIndex);
    });

    return card;
  },
  updateRank() {
    const rankEngName = getRankName(this.score);
    const rank = ranksData[rankEngName];

    this.$shortRank.text(rank.name);

    // update rank after animation
    setTimeout(() => {
      this.$ranks.forEach((rankEl) => {
        $(rankEl).text(rank.name);
      });

      this.$medal.attr('src', rankResolveContext(`./${rankEngName}.svg`));

      $('#praise').text(rank.praise);

      this.$beatPercent.text(`${Math.ceil((this.beatPlayerNum / this.totalPlayerNum) * 100)}%`);
    }, 500);
  },
  replay() {
    this.init();
    switchNextPage('result', 'load');
    this.load('quiz');
  },
  load(toPage = '') {
    return quizLoad(this.getSetData(), toPage)
      .then(() => {
        audioController.play();

        // Tip for iOS
        setTimeout(() => {
          if (!audioController.isPlaying) {
            this.$quizQuestion.text('点击上方按钮播放题目哦！').addClass('animated');

            audioController.onPlay = () => {
              this.$quizQuestion.text(this.getCurrentQuiz().desc);
              this.$quizQuestion.removeClass('animated');
            };
          }
        }, 100);
      });
  },
  sync() {
    if (!this.isEnded()) {
      const quiz = this.getCurrentQuiz();
      const cards = quiz.options
        .map((option, index) => this.createAnswerCard(quiz, index, option));

      this.$quizAnwsers.empty();
      if (!quiz.hasImage) {
        this.$quizAnwsers.addClass('text');
      } else {
        this.$quizAnwsers.removeClass('text');
      }

      cards.forEach((card) => {
        this.$quizAnwsers.append(card);
      });

      this.$quizQuestion.text(quiz.desc);
      this.$currentNum.text(this.current + 1);

      audioController.switchAudio(optionResolveContext(`./${quiz.id}/audio.mp3`));

      if (this.current !== 0) {
        audioController.play();
      }
    }

    this.$totalNum.text(this.total);

    this.updateRank();
  },
};

export default quizer;
