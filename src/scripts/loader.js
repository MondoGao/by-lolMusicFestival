import $ from 'zepto';
import preloader from 'preloader';

import { switchNextPage } from './helpers';
import { publicPath } from '../../settings';

let assets = {};
const $loadingStrip = $('#loadingStrip');
const $loadingTip = $('#loadingTip');

function loadAssetsList() {
  return fetch(`${publicPath}manifest.json`)
    .then(data => data.json())
    .then((data) => {
      assets = data;
      return data;
    });
}

function resetStrip() {
  $loadingStrip.css('left', '-100%');
}

function handleLoadingFailed() {
  $loadingTip.text('看起来好像加载失败了, 尝试刷新试试吧');

  _czc.push(['_trackEvent', '页面', '加载', '失败']);
}

function showLoadingFestivalTip() {
  $loadingTip.text('可在腾讯视频免费观看英雄联盟音乐节直播');

  _czc.push(['_trackEvent', '页面', '加载', '显示广告']);
}

export function isFirstLoad() {
  return Object.keys(assets).length < 1;
}

export function createLoader(regx, include = true, toPage = 'home') {
  resetStrip();

  let failTimer;
  let adTimer;

  return new Promise((resolve) => {
    const start = Date.now();
    const loader = preloader({
      xhrImages: false,
    });

    let progress = 0;

    loader.on('progress', (p) => {
      if (p > progress) {
        progress = p;
      }

      $loadingStrip.css('left', `${-(1 - progress) * 100}%`);
    });
    loader.on('complete', () => {
      clearTimeout(failTimer);
      clearTimeout(adTimer);

      $loadingStrip.css('left', '0');

      let remainTime = 1500 - Date.now() + start;
      if (remainTime < 0) {
        remainTime = 0;
      }

      setTimeout(() => {
        switchNextPage('load', toPage);

        setTimeout(resolve, 500);
      }, remainTime);
    });

    Object.values(assets).forEach((url) => {
      if ((include && url.match(regx)) ||
        (!include && !url.match(regx))) {
        loader.add(url);
      }
    });

    loader.load();

    adTimer = setTimeout(showLoadingFestivalTip, 3000);
    failTimer = setTimeout(handleLoadingFailed, 40000);
  });
}

export function quizLoad(quizIds = [], toPage = '') {
  $loadingTip.text('音乐排位赛正在匹配中');

  const regStr = `quiz/(${quizIds.join('|')})/`;

  return createLoader(new RegExp(regStr), true, toPage);
}

export function initLoad() {
  if (isFirstLoad()) {
    return loadAssetsList()
      .then(() => {
        return createLoader(/\.mp3|Bg|Background|quiz/, false);
      });
  }

  return createLoader(/\.mp3|Bg|Background|quiz/, false);
}
