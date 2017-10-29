import $ from 'zepto';

export function switchNextPage(page, nextPage) {
  $(`#${page}`).removeClass('show').addClass('finish');
  $(`#${nextPage}`).removeClass('finish').addClass('show');
}
