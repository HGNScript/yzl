// pages/sx_teacher/student/student.js
var app = getApp();
Page({
  data: {
    pickerindex: 0,
    pickerarray: ['计算机网络应用1班', '计算机2班','计算机3班'],
    studentname: ['周兴满', '周兴满', '周兴满', '周兴满'],
    information: [
      {
        studentid: '1699040346',
        studentname: '周兴满',
        studentphone: '13035801646',
        signin: '是',
        log: '是',
        visit: '否',
        unitname: '广州猿始人科技有限公司广州猿始人科技有限公司',
        place: '广东省广州市从化区',
      },
      {
        studentid: '1699040346',
        studentname: '周兴满',
        studentphone: '13035801646',
        signin: '是',
        log: '是',
        visit: '否',
        unitname: '广州猿始人科技有限公司',
        place: '广东省广州市从化区',
      },
      {
        studentid: '1699040346',
        studentname: '周兴满',
        studentphone: '13035801646',
        signin: '是',
        log: '是',
        visit: '否',
        unitname: '广州猿始人科技有限公司',
        place: '广东省广州市从化区',
      },
      {
        studentid: '1699040346',
        studentname: '周兴满',
        studentphone: '13035801646',
        signin: '否',
        log: '是',
        visit: '是',
        unitname: '广州猿始人科技有限公司',
        place: '广东省广州市从化区',
      },
      {
        studentid: '1699040346',
        studentname: '周兴满',
        studentphone: '13035801646',
        signin: '是',
        log: '是',
        visit: '否',
        unitname: '广州猿始人科技有限公司',
        place: '广东省广州市从化区',
      },
      {
        studentid: '1699040346',
        studentname: '周兴满',
        studentphone: '13035801646',
        signin: '是',
        log: '是',
        visit: '是',
        unitname: '广州猿始人科技有限公司',
        place: '广东省广州市从化区',
      },
      {
        studentid: '1699040346',
        studentname: '周兴满',
        studentphone: '13035801646',
        signin: '是',
        log: '否',
        visit: '是',
        unitname: '广州猿始人科技有限公司',
        place: '广东省广州市从化区',
      }, {
        studentid: '1699040346',
        studentname: '周兴满',
        studentphone: '13035801646',
        signin: '否',
        log: '是',
        visit: '否',
        unitname: '广州猿始人科技有限公司',
        place: '广东省广州市从化区',
      },
      {
        studentid: '1699040346',
        studentname: '周兴满',
        studentphone: '13035801646',
        signin: '否',
        log: '是',
        visit: '是',
        unitname: '广州猿始人科技有限公司',
        place: '广东省广州市从化区',
      },
      {
        studentid: '1699040346',
        studentname: '周兴满',
        studentphone: '13035801646',
        signin: '是',
        log: '是',
        visit: '否',
        unitname: '广州猿始人科技有限公司',
        place: '广东省广州市从化区',
      },
      {
        studentid: '1699040346',
        studentname: '周兴满',
        studentphone: '13035801646',
        signin: '是',
        log: '否',
        visit: '否',
        unitname: '广州猿始人科技有限公司',
        place: '广东省广州市从化区',
      },
      {
        studentid: '1699040346',
        studentname: '周兴满',
        studentphone: '13035801646',
        signin: '否',
        log: '是',
        visit: '否',
        unitname: '广州猿始人科技有限公司',
        place: '广东省广州市从化区',
      }
    ]
  },

  // picker选择取值
  bindPickerChange: function (e) {
    this.setData({
      pickerindex: e.detail.value
    })
  },

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
  }
})