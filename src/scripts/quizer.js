import $ from 'zepto';

import { publicPath } from '../../settings';
import { quizSetData, quizData } from './quizData';
import ranksData, { getRankName } from './ranksData';
import audioController from './audioController';
import { quizLoad } from './loader';

import { switchNextPage } from './helpers';

const optionResolveContext = require.context('../assets/quiz', true, /\.(jpg|mp3)$/);
const rankResolveContext = require.context('../assets/ranks', false, /\.svg$/);

const quizer = {
  /**
   * Select quiz set, prefer 'REC'
   */
  resetQuizSet() {
    const isRec = Math.random() <= 0.3;

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
    console.log(this.currentSet);

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
      $rightCard.addClass('congratulation');

      $('#timerWrapper').addClass('update');

      this.score += 10;
    } else {
      this.fail += 1;

      $rightCard.addClass('rightAnswer');
      $clickedCard.addClass('wrongAnswer');
    }

    setTimeout(this.switchQuiz, 700);
    this.updateRank();
  },
  finish() {
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
      <li class="answerCard">
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

    this.$shortRank.text(rank.name.slice(2));

    this.$ranks.forEach((rankEl) => {
      $(rankEl).text(rank.name);
    });

    this.$medal.attr('src', rankResolveContext(`./${rankEngName}.svg`));

    $('#praise').text(rank.praise);
  },
  replay() {
    this.init();
    switchNextPage('result', 'load');
    this.load('quiz');
  },
  load(toPage = '') {
    return quizLoad(this.getSetData(), toPage)
      .then(() => audioController.play());
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

    this.$beatPercent.text(`${Math.ceil((this.beatPlayerNum / this.totalPlayerNum) * 100)}%`);
  },
};

export default quizer;
