// pages/student/certification/certification.js
import {
    Certification
} from 'certification-model.js';

var certification = new Certification();
var app = new getApp();

Page({
    data: {
        stu_type: null,
        casArray: null,
        casIndex: 0,
        gradeArray: ['请选择年级', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
        gradeIndex: 0,
        userInfo: {
            imageUrl: '',
            user_name: '',
            gender: '',
        }
    },

    onLoad: function () {
        var that = this
        that.setData({
            stu_type: app.user.student && app.user.student.stu_type,
        })

        if (that.data.stu_type == 0) {
            wx.showModal({
                title: '提示',
                content: '学生信息审核未通过，请前往学生注册，检查信息，重新提交',
                showCancel: false,
                success: function (res) {

                   wx.navigateBack({
                   })
                },
            })
        }
    },


    onShow: function(){
        var that = this
        app.checkUser(function(){

            if (app.user.company_id != 0) {
                wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: '你已经进行了企业认证，不能在进行学生注册或认证',
                    success: function (res) {
                        if (res.confirm) {
                            wx: wx.navigateBack({
                            })
                        }
                    }
                })
            }

            that._loadData();
            certification.initValidate();


            that.setData({
                stu_type: app.user.student && app.user.student.stu_type,
            })

        })


        
    },
    _loadData: function() {
        certification.getSchoolData((res) => {
            res.unshift({
                school_name: '请选择学校'
            })
            this.setData({
                casArray: res
            });
        })
    },
    // school
    school: function(e) {
        this.setData({
            casIndex: e.detail.value
        })
    },
    // 年级
    grade: function(e) {
        this.setData({
            gradeIndex: e.detail.value
        })
    },
    // 提交
    formSubmit: function(e) {
        var data = e.detail.value;
        var that = this;
        //校验表单
        if (!certification.WxValidate.checkForm(data)) {
            const error = certification.WxValidate.errorList[0]
            this.showModal(error)
            return false
        }

        var casindex = this.data.casIndex;
        data.school_id = this.data.casArray[casindex].school_id;

        if (casindex == 0) {
            wx.showModal({
                content: '请选择学校',
                showCancel: false,
            })
            return false
        }

        var gradeindex = this.data.gradeIndex
        data.stu_grade = this.data.gradeArray[gradeindex]

        if (gradeindex == 0) {
            wx.showModal({
                content: '请选择年级',
                showCancel: false,
            })
            return false
        }


        var user_id = app.user.id;
        data.user_id = user_id;
        certification.submitFrom(data, (res) => {
            if (res.valid == 1) {
                wx.showToast({
                    title: res.msg,
                    icon: 'success',
                    duration: 1000,
                    success: res => {
                        setTimeout(function () {
                            that.changeParentData()

                        }, 1000)


                    }
                })
            } else {
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                })
            }
        });
        // wx.switchTab({
        //   url: '/pages/personal/personal'
        // })
    },
    //报错
    showModal: function(error) {
        wx.showModal({
            content: error.msg,
            showCancel: false,
        })
    },

    //刷新上一级页面数据
    changeParentData: function () {

        var pages = getCurrentPages();//当前页面栈

        if (pages.length > 1) {

            var beforePage = pages[pages.length - 2];//获取上一个页面实例对象

            beforePage.changeData();//触发父页面中的方法

            wx.navigateBack({

            })

        }

    }


})