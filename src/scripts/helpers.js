import $ from 'zepto';
import wx from 'wx';

import { appId } from '../../settings';
import imgIcon from '../assets/icon.png';

export function switchNextPage(page, nextPage) {
  $(`#${page}`).removeClass('show').addClass('finish');
  $(`#${nextPage}`).removeClass('finish').addClass('show');
}

/**
 * 检查 HTTP 错误
 * @param response
 * @return {Response|Error}
 */
export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export function getjssdkConfig(url) {
  return fetch(`/service/resources/signature?url=${encodeURIComponent(url)}`)
    .then(checkStatus)
    .then(data => data.json());
}

export function reconfigWechat({ link, title, imgUrl, desc, label }) {
  wx.onMenuShareTimeline({
    title,
    link,
    imgUrl,
  });

  wx.onMenuShareAppMessage({
    title,
    desc,
    link,
    imgUrl,
    type: 'link',
    dataUrl: '',
  });

  wx.onMenuShareQQ({
    title,
    desc,
    link,
    imgUrl,
  });

  wx.onMenuShareQZone({
    title,
    desc,
    link,
    imgUrl,
  });
}

export function configWechat() {
  getjssdkConfig(window.location.href)
    .then((data) => {
      wx.config({
        debug: false,
        appId,
        timestamp: data.timestamp,
        nonceStr: data.noncestr,
        signature: data.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'],
      });

      wx.ready(() => {
        reconfigWechat({
          link: window.location.href,
          title: '英雄联盟音乐排位赛',
          imgUrl: imgIcon,
          desc: '我打败了喵喵喵喵喵喵喵喵喵',
          label: '',
        });
      });
    });
}
