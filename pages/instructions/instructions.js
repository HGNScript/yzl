// pages/instructions/instructions.js

import {
    Base
} from '../../utils/base.js';

var base = new Base()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: base.imgUrl,
        urls: [
            base.imgUrl + 'personal/practice/1.png',
            base.imgUrl + 'personal/practice/2.png',

            base.imgUrl + 'personal/tz/1.png',
            base.imgUrl + 'personal/tz/2.png',

            base.imgUrl + 'personal/wj/1.png',
            base.imgUrl + 'personal/wj/2.png',
            base.imgUrl + 'personal/wj/3.png',
            base.imgUrl + 'personal/wj/4.png',

            base.imgUrl + 'personal/sd/1.png',
            base.imgUrl + 'personal/sd/2.png',

            base.imgUrl + 'personal/bb/1.png',

            base.imgUrl + 'personal/lb/1.png',

            base.imgUrl + 'personal/zp/1.png',
            base.imgUrl + 'personal/zp/2.png',
            base.imgUrl + 'personal/zp/3.png',
            base.imgUrl + 'personal/zp/4.png',
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },


    img: function(e) {

        var url = e.currentTarget.dataset.url

        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: this.data.urls // 需要预览的图片http链接列表
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})