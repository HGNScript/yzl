// pages/notice/details/details.js
import {
  Details
} from 'details-model.js';

var details = new Details();
var app = getApp();

Page({
  data: {
    content:null
  },

  onLoad:function(o){
    var id = o.id
    this.getNotice(id);
  },
  getNotice: function (id) {
    var that = this;
    details.getNoticeData(id, (res) => {
      that.setData({
        content: res
      })
    })
  },

})