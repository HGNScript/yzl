// pages/gzysr/gzysr.js

import {
    Base
} from '../../utils/base.js';

var base = new Base()
Page({
  data: {
      url: base.imgUrl,
  },
    img: function (e) {

        var url = e.currentTarget.dataset.url

        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: [url] // 需要预览的图片http链接列表
        })
    },
})