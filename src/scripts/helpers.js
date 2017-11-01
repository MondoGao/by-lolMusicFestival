import $ from 'zepto';
import wx from 'wx';

import { appId } from '../../settings';
import imgIcon from '../assets/icon.png';

export function switchNextPage(page, nextPage) {
  $(`#${page}`).removeClass('show').addClass('finish');
  $(`#${nextPage}`).removeClass('finish').addClass('show');

  setTimeout(() => {
    $(`#${page}`).removeClass('show finish');
  }, 1000);

  if (nextPage) {
    _czc.push(['_trackEvent', '页面', '切换至', nextPage, 0, page]);
  }
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

export function reconfigWechat({ link, title, imgUrl, desc, label }, flip = true) {
  const realImgUrl = imgIcon.match(/hustonline/) ? imgIcon : `http://weixin.bingyan-tech.hustonline.net${imgIcon}`;

  wx.onMenuShareTimeline({
    link,
    title: flip ? desc : title,
    imgUrl: realImgUrl,
    success() {
      _czc.push(['_trackEvent', '微信', '分享', '朋友圈', 1]);
    },
    cancel() {
      _czc.push(['_trackEvent', '微信', '分享', '朋友圈', 0]);
    },
  });

  wx.onMenuShareAppMessage({
    title,
    desc,
    link,
    imgUrl: realImgUrl,
    type: 'link',
    dataUrl: '',
    success() {
      _czc.push(['_trackEvent', '微信', '分享', '好友', 1]);
    },
    cancel() {
      _czc.push(['_trackEvent', '微信', '分享', '好友', 0]);
    },
  });

  wx.onMenuShareQQ({
    title,
    desc,
    link,
    imgUrl: realImgUrl,
    success() {
      _czc.push(['_trackEvent', '微信', '分享', 'QQ', 1]);
    },
    cancel() {
      _czc.push(['_trackEvent', '微信', '分享', 'QQ', 0]);
    },
  });

  wx.onMenuShareQZone({
    title,
    desc,
    link,
    imgUrl: realImgUrl,
    success() {
      _czc.push(['_trackEvent', '微信', '分享', '空间', 1]);
    },
    cancel() {
      _czc.push(['_trackEvent', '微信', '分享', '空间', 0]);
    },
  });
}

export function configWechat() {
  getjssdkConfig(window.location.href.split('#')[0])
    .then((data) => {
      wx.config({
        debug: false,
        appId,
        timestamp: data.timestamp,
        nonceStr: data.nonce_str,
        signature: data.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'],
      });

      wx.ready(() => {
        _czc.push(['_trackEvent', '微信', '签名', '成功', 1]);

        reconfigWechat({
          link: window.location.href.split('#')[0],
          title: '哼，一个能打的都没有|英雄联盟音乐排位赛',
          imgUrl: imgIcon,
          desc: '是时候展现真正的技术了|英雄联盟音乐排位赛',
          label: '',
        }, false);
      });

      wx.error(() => {
        _czc.push(['_trackEvent', '微信', '签名', '失败', 0]);
      })
    });
}
