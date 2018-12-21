// pages/sx_teacher/survey/survey.js
var app = getApp();
var wxCharts = require("../../../utils/wxcharts.js");
var windowW = 0;
Page({
  data: {
    // 普通管理员数据
    model1: true,
    bigwidtn: false,
    studentname: ['陈辉国陈辉国', '陈国业', '范智淇', '封孝伟', '冯玉霞'],
    information: [{
        class: '计算机网络应用（北大青鸟）3班',
        name: '陈辉国',
        text: '更改用户信息',
      },
      {
        class: '旅游与酒店管理1班',
        name: '陈国业',
        text: '更改用户信息',
      },
      {
        class: '旅游与酒店管理1班',
        name: '范智淇',
        text: '更改用户信息',
      },
      {
        class: '旅游与酒店管理1班',
        name: '封孝伟',
        text: '更改用户信息',
      },
      {
        class: '旅游与酒店管理1班',
        name: '冯玉霞',
        text: '更改用户信息',
      }
    ],
    // 学生资料
    studentbox1: [{
        label1: '姓名',
        listcon: '龙文湛',
      },
      {
        label1: '学号',
        listcon: '1499050226',
      },
      {
        label1: '身份证',
        listcon: '440883199609143237',
      },
      {
        label1: '联系电话',
        listcon: '13710712455',
      },
      {
        label1: '班主任',
        listcon: '向德美',
      },
      {
        label1: '班主任联系电话',
        listcon: '13622202830',
      },
      {
        label1: '跟班教师',
        listcon: '向德美',
      },
      {
        label1: '跟班教师联系电话',
        listcon: '13622202830',
      }
    ],
    // 实习资料
    internship: [{
        label: '单位名称',
        textcon: '跟包工头去搬砖',
      },
      {
        label: '实习地点',
        textcon: '广东省广州市从化区江浦街道环市东路166号',
      },
      {
        label: '月薪',
        textcon: '10000',
      },
      {
        label: '职位',
        textcon: '搬砖',
      },
      {
        label: '单位负责人',
        textcon: '包工头',
      },
      {
        label: '单位负责人联系电话',
        textcon: '12345678910',
      }
    ],
    // 签到记录
    signin: [{
        time: '2018-12-12 22:49:45',
        address: '广东省深圳市龙岗区龙城岗区龙城岗区龙城岗区龙城s街道龙岗公众高尔夫球场'
      },
      {
        time: '2018-12-12 22:49:45',
        address: '广东省深圳市龙岗区龙城街道龙岗公众高尔夫球场'
      }
    ],
    // 日志信息
    journal2: [
      {
        time: '2018-12-12 22:49:45',
        text: ''
      },
      {
        time: '2018-12-12 22:49:45',
        text: ''
      }
    ],


    // 超级管理员数据
    gradedata1: ['2016'],
    gradedata2: [
      {
        signin1: '1175',
        signin2: '77',
        nonesignin1: '349',
        nonesignin2: '23',
        log1: '118',
        log2: '8',
        nonelog1: '1407',
        nonelog2: '92',
        people1: '1462',
        people2: '96',
        nonepeople1: '62',
        nonepeople2: '4',
        numberpeople: '1524'
      }
    ],
  },

  // classbtn
  classbtn: function() {
    this.setData({
      bigwidtn: !this.data.bigwidtn
    })
  },
  // model模态信息
  model1btn: function() {
    this.setData({
      model1: !this.data.model1
    })
  },
  // 文件导出
  exportbtn: function() {
    wx.navigateTo({
      url: '/pages/sx_teacher/export/export',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 图表只适应屏幕
  onLoad: function(options) {
    // 屏幕宽度
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth,
    });
    //计算屏幕宽度比列
    windowW = this.data.imageWidth / 375;

  },


  onShow: function() {
    // 普通教师查看数据
    new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      categories: ['实习', '签到', '日志', '对口'],
      series: [{
        name: '已完成',
        data: [6, 20, 45, 37],
        format: function(val) {
          return val + '%';
        },
      }, {
        name: '未完成',
        data: [70, 40, 65, 100],
        format: function(val) {
          return val + '%';
        },

      }],
      yAxis: {
        format: function(val) {
          return val + '%';
        },
      },
      width: (375 * windowW),
      height: (200 * windowW),
    });
    // 年级数据
    new wxCharts({
      canvasId: 'gradeData',
      type: 'column',
      categories: ['实习', '签到', '日志', '对口'],
      series: [{
        name: '已完成',
        data: [90, 20, 15, 50],
        format: function(val) {
          return val + '%';
        },
      }, {
        name: '未完成',
        data: [10, 80, 85, 50],
        format: function(val) {
          return val + '%';
        },
      }],
      yAxis: {
        format: function(val) {
          return val + '%';
        },
      },
      width: (375 * windowW),
      height: (200 * windowW),
    });
  },

  // tabar点击跳转
  tabbarsurveybtn: function() {
    app.tabbarsurveybtn();
  },
  tabbarclassbtn: function() {
    app.tabbarclassbtn();
  },
  tabbarstudentbtn: function() {
    app.tabbarstudentbtn();
  },
  tabbarsigninbtn: function() {
    app.tabbarsigninbtn();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})