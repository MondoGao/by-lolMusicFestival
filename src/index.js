import $ from 'zepto';

import './index.css';

import { initLoad } from './scripts/loader';

import audioController from './scripts/audioController';
import quizer from './scripts/quizer';
import { switchNextPage } from './scripts/helpers';

initLoad();
quizer.init();

$(() => {
  $('#btnStart').on('click', () => {
    switchNextPage('home', 'load');
    quizer.load('quiz');
  });

  $('#btnShare').on('click', () => {
    alert('点击右上角分享本网页哦~');
  });

  $('#btnReplay').on('click', () => {
    quizer.replay();
  });
});
