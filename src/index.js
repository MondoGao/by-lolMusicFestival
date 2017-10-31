import $ from 'zepto';

import './index.css';

import { initLoad } from './scripts/loader';

import quizer from './scripts/quizer';
import { switchNextPage, configWechat } from './scripts/helpers';

initLoad();
quizer.init();
$('#audioWelcome')[0].play();

$(() => {
  const $share = $('#share');

  $('#btnStart').on('click', () => {
    $('#audioStart')[0].play();
    switchNextPage('home', 'load');
    quizer.load('quiz');

    _czc.push(["_trackEvent", '按钮', '点击', '开始']);
  });

  $('#btnShare').on('click', () => {
    $share.addClass('show');

    _czc.push(["_trackEvent", '按钮', '点击', '分享']);
  });

  $('#btnReplay').on('click', () => {
    quizer.replay();

    _czc.push(["_trackEvent", '按钮', '点击', '重新开始']);
  });

  $('#btnJump').on('click', () => {
    setTimeout(() => {
      window.location.href = 'http://v.qq.com/live/p/topic/40842/preview.html?from=binyan';
    }, 500);

    _czc.push(["_trackEvent", '按钮', '点击', '观看直播']);
  });

  $share.on('click', () => {
    $share.removeClass('show');

    _czc.push(["_trackEvent", '按钮', '点击', '隐藏分享页']);
  });

  configWechat();
});
