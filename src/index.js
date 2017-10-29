import $ from 'zepto';
import preloader from 'preloader';

import 'normalize.css';

import './index.css';

import { publicPath } from '../settings.js';

const loader = preloader({
  xhrImages: false,
});
const loadingStrip = $('#loadingStrip');

loader.on('progress', (progress) => {
  loadingStrip.css('left', `${-(1 - progress) * 100}%`);
});
loader.on('complete', () => {
  loadingStrip.css('left', '0');

  setTimeout(() => {
    $('#load').removeClass('show').addClass('finish');
    $('#home').addClass('show');
  }, 500);
});

fetch('/manifest.json')
  .then(data => data.json())
  .then((data) => {
    Object.values(data).forEach(url => loader.add(url));
    loader.load();
  });

function switchNextPage($page, $nextPage) {
  $page.removeClass('show').addClass('finish');
  $nextPage.addClass('show');
}

function createOption(desc, options, answerIndex) {
  return {
    desc,
    options,
    answerIndex,
  };
}

const quizData = [
  createOption('播放上面的音乐，在下方选出其代表的英雄角色名', ['麦冬', '然然', '萌萌', '杰杰'], 0),
  createOption('播放上面的音乐，在下方选出其代表的英雄角色名', ['麦冬', '然然', '萌萌', '杰杰'], 1),
];

const optionResolveContext = require.context('./assets/quiz', true, /\.(png|mp3)$/);

const audioController = {
  init() {
    this.$audio = $('#audio');
    this.$audioTimer = $('#audioTimer');
    this.$timerWrapper = $('#timerWrapper');
    this.isPlaying = false;
    this.currentTime = 0;
    this.isLocked = false;

    this.handleTimeupdate = this.handleTimeupdate.bind(this);
    this.handleDurationchange = this.handleDurationchange.bind(this);
    this.handlePlaying = this.handlePlaying.bind(this);
    this.handleEnded = this.handleEnded.bind(this);

    this.toggle = this.toggle.bind(this);

    this.$audio.on('timeupdate', this.handleTimeupdate);
    this.$audio.on('durationchange', this.handleDurationchange);
    this.$audio.on('playing', this.handlePlaying);
    this.$audio.on('ended', this.handleEnded);
    this.$audio.on('pause', this.handleEnded);

    this.$timerWrapper.on('click', this.toggle);

    this.sync();
  },
  toggle() {
    if (this.isLocked) {
      return;
    }

    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },
  handlePlaying() {
    this.isPlaying = true;

    this.sync();
  },
  handleEnded() {
    this.isPlaying = false;

    this.sync();
  },
  handleTimeupdate() {
    this.currentTime = this.$audio[0].currentTime;

    this.sync();
  },
  handleDurationchange() {
    this.duration = this.$audio[0].duration;
    this.currentTime = 0;

    this.sync();
  },
  switchAudio(nextSrc) {
    this.$audio.attr('src', nextSrc);
    this.$audio.currentTime = 0;
    this.isPlaying = false;
    this.isLocked = false;
    this.handleDurationchange();

    this.sync();
  },
  play() {
    this.$audio[0].play();
  },
  pause() {
    this.$audio[0].pause();
  },
  sync() {
    this.$timerWrapper[this.isPlaying ? 'removeClass' : 'addClass']('paused');

    this.$audioTimer.text(Math.floor(this.duration - this.currentTime));
  },
};



const quizer = {
  init() {
    this.MAX_FAIL = 3;

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

    this.$ranks = $('.rank');
    this.$beatPercent = $('#bearPercent');

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

        switchNextPage($('#quiz'), $('#result'));
      });
  },
  switchQuiz() {
    if (this.fail === this.MAX_FAIL || this.current === this.total - 1) {
      this.finish();
    } else {
      this.current += 1;
      this.sync();

      this.isLocked = false;
      audioController.isLocked = false;
    }
  },
  createAnswerCard(quizIndex, optionIndex, desc) {
    const card = $(`
      <li class="answerCard">
        <img src="${optionResolveContext(`./${quizIndex + 1}/${optionIndex + 1}.png`)}" alt=""/>
        <span>${desc}</span>
      </li>
    `);

    card.on('click', () => {
      this.handleOptionClick(optionIndex);
    });

    return card;
  },
  sync() {
    const quiz = quizData[this.current];
    const cards = quiz.options
      .map((option, index) => this.createAnswerCard(this.current, index, option));

    this.$quizAnwsers.empty();

    cards.forEach((card) => {
      this.$quizAnwsers.append(card);
    });

    this.$quizQuestion.text(quiz.desc);
    this.$currentNum.text(this.current + 1);
    this.$totalNum.text(this.total);

    this.$beatPercent.text(Math.ceil(this.beatPlayerNum / this.totalPlayerNum));

    audioController.switchAudio(optionResolveContext(`./${this.current + 1}/audio.mp3`));

    if (this.current !== 0) {
      audioController.play();
    }
  },
};


$(() => {
  const pageHome = $('#home');
  const pageQuiz = $('#quiz');
  const pageResult = $('#result');
  const btnStart = $('#btnStart');

  btnStart.on('click', () => {
    switchNextPage(pageHome, pageQuiz);
    audioController.play();
  });

  quizer.init();
});
