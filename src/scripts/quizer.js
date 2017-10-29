import $ from 'zepto';

import { publicPath } from '../../settings';
import quizData from './quizData';
import ranksData, { getRankName } from './ranksData';
import audioController from './audioController';

import { switchNextPage } from './helpers';

const optionResolveContext = require.context('../assets/quiz', true, /\.(jpg|mp3)$/);
const rankResolveContext = require.context('../assets/ranks', false, /\.svg$/);

const quizer = {
  init() {
    this.MAX_FAIL = 999;

    this.current = 0;
    this.total = quizData.length;
    this.score = 0;
    this.fail = 0;
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

    const { answerIndex } = quizData[this.current];
    const isRight = optionIndex === answerIndex;

    const cards = this.$quizAnwsers.children();

    const $rightCard = $(cards[answerIndex]);
    const $clickedCard = $(cards[optionIndex]);

    if (isRight) {
      $rightCard.addClass('congratulation');

      this.score += 10;
    } else {
      this.fail += 1;

      $rightCard.addClass('rightAnswer');
      $clickedCard.addClass('wrongAnswer');
    }

    setTimeout(this.switchQuiz, 1000);
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
    // .then(() => ({
    // data: {
    // beat_player_number: 50,
    // sum_player_number: 200,
    // }
    // }))
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
    this.current += 1;

    if (this.isEnded()) {
      this.finish();
    } else {
      this.sync();

      this.isLocked = false;
      audioController.isLocked = false;
    }
  },
  createAnswerCard(quizIndex, optionIndex, desc, hasImage = true) {
    const card = $(`
      <li class="answerCard">
        ${hasImage ?
            `<img src="${optionResolveContext(`./${quizIndex + 1}/${optionIndex + 1}.jpg`)}" alt=""/>` : ''}
        <span>${desc}</span>
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
    switchNextPage('result', 'quiz');
    audioController.play();
  },
  sync() {
    if (!this.isEnded()) {
      const quiz = quizData[this.current];
      const cards = quiz.options
        .map((option, index) => this.createAnswerCard(this.current, index, option, quiz.hasImage));

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

      audioController.switchAudio(optionResolveContext(`./${this.current + 1}/audio.mp3`));

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
