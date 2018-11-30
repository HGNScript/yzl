// pages/resources/home/home.js
import {
    Home
} from 'home-model.js';

var home = new Home();
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getShare();
    },

    onShow: function() {
        app.checkUser()
    },

    getShare: function() {
        var that = this;
        home.getShareData((res) => {
            that.setData({
                shareData: res
            })
        })
    },

    getKeyword: function(e) {
        var data = e.detail.value
        if (!data) {
            this.getShare();
        } else {
            this.setData({
                keyword: data
            })
        }
    },
    fuzzQuery: function() {
        var keyword = this.data.keyword;
        if (!keyword) {
            this.getShare();
        }
        var that = this;
        home.fuzzQueryData(keyword, (res) => {
            that.setData({
                shareData: res
            })
        })
    },
    bind_resources_details: function(e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/resources/details/details?id=' + id
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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