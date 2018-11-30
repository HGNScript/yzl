// pages/schoolmap/schoolmap.js
import {
    Base
} from '../../utils/base.js';

var base = new Base()

Page({
    data: {
        url: base.imgUrl,
        urls: [
            base.imgUrl + 'schoolmap/cj.png',
            base.imgUrl + 'schoolmap/hr.png',
            base.imgUrl + 'schoolmap/sl.png',
            base.imgUrl + 'schoolmap/hx.png',
            base.imgUrl + 'schoolmap/ny.png',
            base.imgUrl + 'schoolmap/hnny.png',
            base.imgUrl + 'schoolmap/zsdx.png'
        ]
    },
    img: function(e) {

        var url = e.currentTarget.dataset.url

        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: this.data.urls // 需要预览的图片http链接列表
        })
    },

})