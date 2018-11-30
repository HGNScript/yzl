// pages/notice/home/home.js
import {
  Home
} from 'home-model.js';

var home = new Home();
var app = getApp();
Page({
  data: {
    content:[
      {
        title: '阿萨德科技暗红色的奥斯卡较好的阿萨啊是的阿萨德',
        name: '阿萨德',
        time: '2018.11.11',
      },
      {
        title: '阿萨德科技暗红色的奥斯卡较好的阿萨啊是的阿萨德阿萨德科技暗红色的奥斯卡较好的阿萨啊是的阿萨德',
        name: '阿萨德',
        time: '2018.11.11',
      },
      {
        title: '阿萨德科技暗红色的奥斯卡较好的阿萨啊是的阿萨德',
        name: '阿萨德',
        time: '2018.11.11',
      }
    ]
  },
  onLoad:function(o){
     this.getNotice(); 
  },
  getNotice: function () {
    var that = this;
    home.getNoticeData((res) => {
      that.setData({
        content: res
      })
    })
  },
  fuzzQuery: function () {
    var keyword = this.data.keyword;
    if (!keyword) {
      this.getNotice();
    }
    var that = this;
    home.fuzzQueryData(keyword, (res) => {
      that.setData({
        content: res
      })
    })
  },
  getKeyword: function (e) {
    var data = e.detail.value
    if (!data) {
      this.getNotice();
    } else {
      this.setData({
        keyword: data
      })
    }
  },
  details: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/notice/details/details?id='+id,
    })
  }

})