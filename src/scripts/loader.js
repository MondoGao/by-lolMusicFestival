import $ from 'zepto';
import preloader from 'preloader';

import { switchNextPage } from './helpers';

const loader = preloader({
  xhrImages: false,
});
const loadingStrip = $('#loadingStrip');

loader.on('progress', (progress) => {
  loadingStrip.css('left', `${-(1 - progress) * 100}%`);
});
loader.on('complete', () => {
  loadingStrip.css('left', '0');

  setTimeout(switchNextPage, 500, 'load', 'home');
});

function load() {
  return fetch('/manifest.json')
    .then(data => data.json())
    .then((data) => {
      Object.values(data).forEach(url => loader.add(url));
      loader.load();
    });
}

module.exports = load;
