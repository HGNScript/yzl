// pages/internship/changepassword/changepassword.js
Page({
  data: {
    open: false,
  },
  // 菜单列表
  menu: function () {
    this.setData({
      open: !this.data.open
    })
  },

  // 签到
  Signin: function () {
    wx: wx.showModal({
      title: '提示',
      content: '本周签到成功！',
      showCancel: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 日志反馈
  feedback: function () {
    wx: wx.navigateTo({
      url: '/pages/internship/logfeedback/logfeedback',
    })
  },
  // 返回首页
  home: function () {
    wx.navigateTo({
      url: '/pages/internship/home/home',
    })
  },
  // 返回应用
  return: function () {
    wx.switchTab({
      url: '/pages/apply/apply',
    })
  },
  submit: function () {
    wx.navigateTo({
      url: '/pages/internship/home/home',
    })
  }
})