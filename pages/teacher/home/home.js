// pages/teacher/home/home.js

import {Home} from 'home-model.js'

var home = new Home()

var app = new getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {
          imageUrl: '',
          user_name: '',
          gender: '',
      },
      tch_id: null,
      tch_type: null,
  },

  onShow: function(){
      home.initValidate();
  },

  submit: function(e){
      var that = this;
      var data = e.detail.value;
      data.id = app.user.id

      console.log(data)

      //校验表单
      if (!home.WxValidate.checkForm(data)) {
          const error = home.WxValidate.errorList[0]
          app.showErrorModal(error)
          return false
          
      }


      home.validate(data, function(res){
          if (res.valid) {
              app.login(that, function(){
                  wx.showToast({
                      title: res.msg,
                      icon: 'success',
                      duration: 1000,
                      success: res => {
                          setTimeout(function () {
                              that.setData({
                                  tch_id: app.user.tch_id,
                                  tch_type: app.user.tch_type,
                              })

                              app.changeParentData()

                          }, 1000)


                      }
                  })

                  

                  wx.navigateBack({})
              })              
          } else {
              app.showErrorModal({"msg": res.msg})
          }
      })
 
  }

})