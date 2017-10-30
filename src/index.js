import $ from 'zepto';

import './index.css';

import { initLoad, quizLoad } from './scripts/loader';

import audioController from './scripts/audioController';
import quizer from './scripts/quizer';
import { switchNextPage } from './scripts/helpers';

initLoad();

$(() => {
  $('#btnStart').on('click', () => {
    switchNextPage('home', 'load');
    quizLoad([1, 2])
      .then(() => {
        audioController.play();
      });
  });

  $('#btnShare').on('click', () => {
    alert('点击右上角分享本网页哦~');
  });

  $('#btnReplay').on('click', () => {
    quizer.replay();
  });

  quizer.init();
});
