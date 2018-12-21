// pages/sx_teacher/student/student.js
var app = getApp();
Page({
  data: {
    pickerindex: 0,
    model1: true,
    unittext: false,
    pickerarray: ['旅游与酒店管理1班','旅游与酒店管理2班', '计算机广告制作1班','计算机广告制作2班'],
    studentname: ['冯玉霞冯玉霞', '高婉琳', '何普锋'],
    picker1: ['全部', '是', '否'],
    // 学生信息
    information: [
      {
        studentid: '1699150106',
        studentname: '冯玉霞',
        studentphone: '13172043749',
        signin: '是',
        log: '是',
        visit: '否',
        counterpart: '是',
        unitname: '大洋办公家具',
        place: '广东,珠海,前山',
      },
      {
        studentid: '1699150107',
        studentname: '高婉琳',
        studentphone: '15920484117',
        signin: '是',
        log: '是',
        visit: '否',
        counterpart: '是',
        unitname: '从化区桦森装饰设计有限公司',
        place: '从化区从城大道江湾路海朗横街4栋',
      },
      {
        studentid: '1699150108',
        studentname: '何普锋',
        studentphone: '15007592779',
        signin: '是',
        log: '是',
        visit: '否',
        counterpart: '否',
        unitname: '广州善川装饰工程有限公司',
        place: '广东省,广州市,天河',
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
        textcon: '广东,深圳,龙岗广东,深圳,龙岗广东,深圳,龙岗广东,深圳,龙岗',
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

  // picker选择取值
  bindPickerChange: function (e) {
    this.setData({
      pickerindex: e.detail.value
    })
  },

  // model模态信息
  model1btn: function () {
    this.setData({
      model1:!this.data.model1
    })
  },
  // 实习单位名称变宽
  // unitbtn: function () {
  //   this.setData({
  //     unittext:!this.data.unittext
  //   })
  // },
  onLoad: function (options) {
    // var information = options.currentTarget.dataset.studentnameindex
    // var studentname = this.data.studentname
    // var information = this.data.information[0].studentname.toString()
    // this.setData({
    //   studentname: information
    // })
    // console.log(this.data.information[0]['studentname'])
  },

  onShareAppMessage: function () {

  },
  // tabar点击跳转
  tabbarsurveybtn: function(){
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
})