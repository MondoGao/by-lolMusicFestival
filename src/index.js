import $ from 'zepto';
import preloader from 'preloader';

import 'normalize.css';

import './index.css';

const loader = preloader({
  xhrImages: false,
});
const loadingStrip = $('#loadingStrip');

loader.on('progress', (progress) => {
  loadingStrip.css('left', `${-(1 - progress) * 100}%`);
});
loader.on('complete', () => {
  loadingStrip.css('left', '0');

  setTimeout(() => {
    $('#load').removeClass('show').addClass('finish');
    $('#home').addClass('show');
  }, 500);

});

fetch('/manifest.json')
  .then(data => data.json())
  .then((data) => {
    Object.values(data).forEach(url => loader.add(url));
    loader.load();
  });

function switchNextPage($page, $nextPage) {
  $page.removeClass('show').addClass('finish');
  $nextPage.addClass('show');
}

$(() => {
  const pageHome = $('#home');
  const pageQuiz = $('#quiz');
  const pageResult = $('#result');
  const btnStart = $('#btnStart');

  btnStart.on('click', () => {
    switchNextPage(pageHome, pageQuiz);
  });
});
