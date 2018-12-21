var app = getApp();
Page({
  data: {
    model1: true,
    model2:false,
    navbarid: 0,
    screenindex1: 0,
    screenindex2: 0,
    screenpicker1: ['签到时间','第1周', '第2周', '第3周', '第4周', '第5周', '第6周'],
    screenpicker2: ['日志时间','一月', '二月', '三月', '四月', '五月', '六月','七月','八月','九月','十月','十一月','十二月'],
    pickerindex: 0,
    pickerarray: ['旅游与酒店管理1班', '旅游与酒店管理2班', '计算机广告制作1班', '计算机广告制作2班'],
    navbar: ['签到详情','日志详情'],
    model2radio:[
      { name: '优秀', value: '优秀' },
      { name: '良好', value: '良好', checked: 'true' },
      { name: '合格', value: '合格' },
      { name: '不合格', value: '不合格' },
    ],
    signinpiacer: ['全部', '已签到', '未签到'],
    signinbox: ['冯玉霞冯玉霞', '高婉琳', '何普锋'],
    signintext: [
      {
        name:'冯玉霞冯玉霞冯玉霞冯玉霞',
        userid: '1699150106',
        state: '已签到',
      },
      {
        name: '高婉琳',
        userid: '1699150107',
        state: '未签到',
      },
      {
        name: '何普锋',
        userid: '1699150108',
        state: '已签到',
      }
    ],
    // 学生信息
    journalpicker:['全部','已评阅','未评阅'],
    studentname: ['冯玉霞冯玉霞', '高婉琳', '何普锋'],
    journal: [
      {
        studentid: '1699150106',
        studentname: '冯玉霞',
        time: '2018-12-16 20:15:51',
        journalimg: '/image/icon/teacher/dog.jpg',
        state: '已评阅',
      },
      {
        studentid: '1699150107',
        studentname: '高婉琳',
        time: '2018-12-16 09:05:01',
        journalimg: '/image/icon/teacher/dog.jpg',
        state: '已评阅',
      },
      {
        studentid: '1699150108',
        studentname: '何普锋',
        time: '2018-12-15 20:10:59',
        journalimg: '/image/icon/teacher/dog.jpg',
        state: '未评阅',
      }
    ],
    // 学生资料
    studentbox1: [
      {
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
    internship: [
      {
        label: '单位名称',
        textcon: '跟包工头去搬砖',
      },
      {
        label: '实习地点',
        textcon: '广东,深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳,龙岗',
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
    signin: [
      {
        time: '2018-12-12 22:49:45',
        address: '广东省深圳市龙岗区龙城街道龙岗公众高尔夫球场'
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
    ]
  },
  // 班级筛选
  bindPickerChange: function (e) {
    this.setData({
      pickerindex: e.detail.value
    })
  },
  // 签到每周筛选
  screenbtnChange1: function (e) {
    this.setData({
      screenindex1: e.detail.value
    })
  },
  // 日志每月筛选
  screenbtnChange2: function (e) {
    this.setData({
      screenindex2: e.detail.value
    })
  },
  // 导航
  navbarbtn: function (e) {
    var navid = e.currentTarget.dataset.navid
    this.setData({
      navbarid : navid
    })
  },

  // 查看日志图片
  journalimgbtn: function () {
    wx.previewImage({
      urls: ['http://img18.3lian.com/d/file/201711/11/aff81832b1472c2a44f2c703a4c0236c.png'],
    })
  },
  // model1
  model1btn: function () {
    this.setData({
      model1: !this.data.model1
    })
  },
  // 评阅日志
  model2btn: function () {
    this.setData({
      model2:!this.data.model2
    })
  },
  // 评阅日志提交按钮
  submitbtn: function() {
    wx.showToast({
      title: '提交成功',
    })
    this.setData({
      model2: !this.data.model2
    })
  },

  onLoad: function (options) {

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
  

  onShareAppMessage: function () {

  }
})