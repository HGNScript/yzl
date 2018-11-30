// pages/questionnaire/failure/failure.js
Page({
  data: {

  },

  submit: function () {
      wx.navigateTo({
          url: '/pages/questionnaire/home/home',
    })
  },
  failure: function () {
    wx.navigateTo({
        url: '/pages/questionnaire/manual/manual',
    })
  }
})