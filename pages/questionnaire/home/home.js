// pages/questionnaire/home/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    case: [
      {
        url: '/pages/questionnaire/initiate/initiate',
        image: '/image/icon/answer/initiate.png',
        title: '发起问卷'
      },
      {
        url: '/pages/questionnaire/write/write',
        image: '/image/icon/answer/write.png',
        title: '填写问卷'
      },
      {
        url: '/pages/questionnaire/management/management',
        image: '/image/icon/answer/management.png',
        title: '问卷管理'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      app.checkUser()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})