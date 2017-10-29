import $ from 'zepto';
import preloader from 'preloader';

import 'normalize.css';

import './index.css';

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

};

const quizer = {
  init() {
    this.MAX_FAIL = 3;

    this.current = 0;
    this.total = quizData.length;
    this.score = 0;
    this.fail = 0;
    this.isLocked = false;

    this.$currentNum = $('#quizCurrentNum');
    this.$totalNum = $('#quizTotalNum');
    this.$quizQuestion = $('#quizQuestion');
    this.$quizAnwsers = $('#quizAnwsers');

    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.switchQuiz = this.switchQuiz.bind(this);

    this.sync();
  },
  handleOptionClick(optionIndex) {
    if (this.isLocked) {
      return;
    }

    this.isLocked = true;

    const { answerIndex } = quizData[this.current];
    const isRight = optionIndex === answerIndex;

    const cards = this.$quizAnwsers.children();

    const $rightCard = $(cards[answerIndex]);
    const $clickedCard = $(cards[optionIndex]);

    if (isRight) {
      $rightCard.addClass('congratulation');
    } else {
      this.fail += 1;

      $rightCard.addClass('rightAnswer');
      $clickedCard.addClass('wrongAnswer');
    }

    setTimeout(this.switchQuiz, 1000);
  },
  switchQuiz() {
    if (this.fail === this.MAX_FAIL || this.current === this.total - 1) {
      switchNextPage($('#quiz'), $('#result'));
    } else {
      this.current += 1;
      this.sync();
    }

    this.isLocked = false;
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
  },
};


$(() => {
  const pageHome = $('#home');
  const pageQuiz = $('#quiz');
  const pageResult = $('#result');
  const btnStart = $('#btnStart');

  btnStart.on('click', () => {
    switchNextPage(pageHome, pageQuiz);
  });

  quizer.init();
});
