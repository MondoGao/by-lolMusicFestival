import $ from 'zepto';
import 'normalize.css';

import './index.css';

import load from './scripts/loader';

import audioController from './scripts/audioController';
import quizer from './scripts/quizer';
import { switchNextPage } from './scripts/helpers';

load();

$(() => {
  const btnStart = $('#btnStart');

  btnStart.on('click', () => {
    switchNextPage('home', 'quiz');
    audioController.play();
  });

  quizer.init();
});
