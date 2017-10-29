import $ from 'zepto';
import 'normalize.css';

import './index.css';

import load from './scripts/loader';

import audioController from './scripts/audioController';
import quizer from './scripts/quizer';
import { switchNextPage } from './scripts/helpers';

load();

$(() => {
  $('#btnStart').on('click', () => {
    switchNextPage('home', 'quiz');
    audioController.play();
  });

  $('#btnShare').on('click', () => {
    alert('点击右上角分享本网页哦~');
  });

  $('#btnReplay').on('click', () => {
    quizer.replay();
  });

  quizer.init();
});
