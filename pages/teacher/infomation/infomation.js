// pages/teacher/infomation/infomation.js

import { Infomation } from 'infomation-model.js'

var infomation = new Infomation()

var app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          tch_id: app.user.tch_id,
          tch_type: app.user.tch_type,
      })

      this.getTchInfo()
  },

  getTchInfo: function(){
      var that = this
      infomation.getTchInfo(this, function(res){
          that.setData({
              tchData: res
          })
      })
  },

})