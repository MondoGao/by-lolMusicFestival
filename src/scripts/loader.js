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

export function isFirstLoad() {
  return Object.keys(assets).length < 1;
}

export function createLoader(regx, include = true, toPage = 'home') {
  resetStrip();

  return new Promise((resolve) => {
    const start = Date.now();
    const loader = preloader({
      xhrImages: false,
    });

    loader.on('progress', (progress) => {
      $loadingStrip.css('left', `${-(1 - progress) * 100}%`);
    });
    loader.on('complete', () => {
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
