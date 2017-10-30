import $ from 'zepto';

import './index.css';

import { initLoad } from './scripts/loader';

import quizer from './scripts/quizer';
import { switchNextPage, configWechat } from './scripts/helpers';

initLoad();
quizer.init();

$(() => {
  const $share = $('#share');

  $('#btnStart').on('click', () => {
    switchNextPage('home', 'load');
    quizer.load('quiz');
  });

  $('#btnShare').on('click', () => {
    $share.addClass('show');
  });

  $('#btnReplay').on('click', () => {
    quizer.replay();
  });

  $share.on('click', () => {
    $share.removeClass('show');
  });

  configWechat();
});
