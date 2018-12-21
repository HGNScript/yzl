// pages/sx_teacher/class/class.js
var app = getApp();
var wxCharts = require("../../../utils/wxcharts.js");
var windowW = 0;
Page({
  data: {

  },

  onLoad: function (options) {
    // 屏幕宽度
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    });
    //计算屏幕宽度比列
    windowW = this.data.imageWidth / 375;
  },

  onShow: function () {
    new wxCharts({
      canvasId: 'columnCanvas1',
      type: 'column',
      categories: ['实习', '签到', '日志', '对口'],
      series: [{
        name: '已完成',
        data: [6, 20, 45, 37],
        format: function (val) {
          return val + '%';
        },
      }, {
        name: '未完成',
        data: [70, 40, 65, 100],
        format: function (val) {
          return val + '%';
        },
      }],
      yAxis: {
        format: function (val) {
          return val + '%';
        },
      },
      width: (375 * windowW),
      height: (200 * windowW),
    });
    new wxCharts({
      canvasId: 'columnCanvas2',
      type: 'column',
      categories: ['实习', '签到', '日志', '对口'],
      series: [{
        name: '已完成',
        data: [6, 20, 45, 37],
        format: function (val) {
          return val + '%';
        },
      }, {
        name: '未完成',
        data: [70, 40, 65, 100],
        format: function (val) {
          return val + '%';
        },
      }],
      yAxis: {
        format: function (val) {
          return val + '%';
        },
      },
      width: (375 * windowW),
      height: (200 * windowW),
    });
    new wxCharts({
      canvasId: 'columnCanvas3',
      type: 'column',
      categories: ['实习', '签到', '日志', '对口'],
      series: [{
        name: '已完成',
        data: [6, 20, 45, 37],
        format: function (val) {
          return val + '%';
        },
      }, {
        name: '未完成',
        data: [70, 40, 65, 100],
        format: function (val) {
          return val + '%';
        },
      }],
      yAxis: {
        format: function (val) {
          return val + '%';
        },
      },
      width: (375 * windowW),
      height: (200 * windowW),
    });
    new wxCharts({
      canvasId: 'columnCanvas4',
      type: 'column',
      categories: ['实习', '签到', '日志', '对口'],
      series: [{
        name: '已完成',
        data: [6, 20, 45, 37],
        format: function (val) {
          return val + '%';
        },
      }, {
        name: '未完成',
        data: [70, 40, 65, 100],
        format: function (val) {
          return val + '%';
        },
      }],
      yAxis: {
        format: function (val) {
          return val + '%';
        },
      },
      width: (375 * windowW),
      height: (200 * windowW),
    });

    // 超级管理员 设置当前页面导航文字
    wx.setNavigationBarTitle({
      title: '班级数据'
    })
  },

  // tabar点击跳转
  tabbarsurveybtn: function () {
    app.tabbarsurveybtn();
  },
  tabbarclassbtn: function () {
    app.tabbarclassbtn();
  },
  tabbarstudentbtn: function () {
    app.tabbarstudentbtn();
  },
  tabbarsigninbtn: function () {
    app.tabbarsigninbtn();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})