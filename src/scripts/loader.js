import $ from 'zepto';
import preloader from 'preloader';

import { switchNextPage } from './helpers';
import { publicPath } from '../../settings';

const loader = preloader({
  xhrImages: false,
});
const loadingStrip = $('#loadingStrip');
let assets = {};

loader.on('progress', (progress) => {
  loadingStrip.css('left', `${-(1 - progress) * 100}%`);
});
loader.on('complete', () => {
  loadingStrip.css('left', '0');

  setTimeout(switchNextPage, 500, 'load', 'home');

  const musicLoader = preloader({
    xhrImages: false,
  });

  Object.values(assets).forEach((url) => {
    if (url.match(/\.mp3|Bg|Background/)) {
      musicLoader.add(url);
    }
  });
  musicLoader.load();
});

function load() {
  return fetch(`${publicPath}manifest.json`)
    .then(data => data.json())
    .then((data) => {
      assets = data;
      Object.values(data).forEach((url) => {
        if (url.match(/\.mp3|Bg|Background/)) {
          return;
        }

        loader.add(url);
      });
      loader.load();
    });
}

module.exports = load;
