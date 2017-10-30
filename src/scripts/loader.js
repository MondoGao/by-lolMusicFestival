import $ from 'zepto';
import preloader from 'preloader';

import { switchNextPage } from './helpers';
import { publicPath } from '../../settings';

let assets = {};
const loadingStrip = $('#loadingStrip');

export function loadAssetsList() {
  return fetch(`${publicPath}manifest.json`)
    .then(data => data.json())
    .then((data) => {
      assets = data;
      return data;
    });
}

export function isFirstLoad() {
  return Object.keys(assets).length < 1;
}

export function createLoader(regx, include = true, toPage = 'home') {
  return new Promise((resolve, reject) => {
    const loader = preloader({
      xhrImages: false,
    });

    loader.on('progress', (progress) => {
      loadingStrip.css('left', `${-(1 - progress) * 100}%`);
    });
    loader.on('complete', () => {
      loadingStrip.css('left', '0');

      setTimeout(switchNextPage, 500, 'load', toPage);

      resolve();
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

export function quizLoad(quizIds = []) {
  const regStr = `quiz/(${quizIds.join('|')})/`;

  return createLoader(new RegExp(regStr), true, 'quiz');
}

export function initLoad() {
  if (isFirstLoad()) {
    return loadAssetsList()
      .then(() => {
        createLoader(/\.mp3|Bg|Background|quiz/, false);
      });
  }

  return createLoader(/\.mp3|Bg|Background|quiz/, false);
}
