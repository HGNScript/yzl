// pages/resources/details/details.js
import {
  Details
} from 'details-model.js';

var details = new Details();
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
    var id = options.id;
    this.getShare(id);
    this.setIncFlow(id);

  },

  getShare: function(id) {
    var that = this;
    details.getShareData(id,(res)=>{
        that.setData({
          ShareData: res
        })
    })
  },

  //浏览量增加
  setIncFlow: function (id) {
    var that = this
    details.setIncFlow(id, function (res) {
      details.getShareData(id, (res) => {
        that.setData({
          ShareData: res
        })
      })
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