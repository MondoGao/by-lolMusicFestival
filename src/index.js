import $ from 'zepto';

import 'normalize.css';

import './index.css';

$(() => {
  $('#load').removeClass('show').addClass('finish');
  $('#home').addClass('show');
});
