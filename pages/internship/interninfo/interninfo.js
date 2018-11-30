// pages/internship/interninfo/interninfo.js

import {
    Base
} from '../../../utils/base.js';
var base = new Base();

var app = getApp()
import {
    Home
} from '../home/home-model.js';
var home = new Home();


Page({
    data: {
        open: false,
        stu_id: null,
        radio1: [{
                name: 'yes',
                value: '是',
                checked: 'true'
            },
            {
                name: 'no',
                value: '否'
            },
        ],
        correct: '是',
        radio2: [{
                name: 'yes',
                value: '是',
                checked: 'true'
            },
            {
                name: 'no',
                value: '否'
            },
        ],
        introduce: '是',
        array: ['基本满意', '非常满意', '不满意'],
    },
    onLoad: function(option) {
        var id = option.id;
        this.setData({
            stu_id: id,
            headData: app.headData
        })
    },
    onShow: function(){
        this.setData({
            headData: app.headData
        })
    },

    companySubmit: function(e) {
        var stu_id = this.data.stu_id;
        var formData = e.detail.value;
        var addres = formData.province + formData.city + formData.county;
        var correct = this.data.correct;
        var introduce = this.data.introduce;
        var evaluate = this.data.array[this.data.index];
        var parmes = {
            url: 'internship/addCompany',
            type: 'POST',
            data: {
                stu_id: stu_id,
                company_name: formData.company_name,
                company_address: addres,
                company_position: formData.prin,
                principal: formData.padfd,
                principal_phone: formData.prin_phone,
                company_identical: correct,
                company_recommend: introduce,
                company_evaluate: evaluate,
                company_salary: formData.money
            },
            eCallback: function(data) {
                if (data.valid) {
                    wx.showToast({
                        title: data.msg,
                        icon: 'success',
                        duration: 1500,
                    })
                    setTimeout(function() {

                        app.changeParentData(function(){
                            wx.navigateBack({
                                delta: 1
                            })
                        })
                       
                    }, 1500)
                } else {
                    wx.showModal({
                        title: '提示',
                        content: data.msg,
                        showCancel: false,
                    })
                }
            }
        }
        base.request(parmes);

    },

    correct: function(e) {
        this.setData({
            correct: e.detail.value
        })
    },
    introduce: function(e) {
        this.setData({
            introduce: e.detail.value
        })
    },
    // 菜单列表
    menu: function () {
        this.data.headData['open'] = !this.data.headData.open;
        this.setData({
            headData: this.data.headData
        })
    },
    focus: function () {
        this.data.headData['open'] = false;
        this.setData({
            headData: this.data.headData
        })
    },

    // 签到
    Signin: function(e) {
        var that = this;
        that.data.headData.open = false
        that.setData({
            headData: that.data.headData
        })
        var id = e.currentTarget.dataset.id;
        app.getAddress(that, (res) => {
            var param = {
                url: 'internship/signIn',
                type: 'POST',
                data: {
                    stu_id: id,
                    address: res
                },
                eCallback: function (res) {
                    if (res.valid) {
                        app.headData['open'] = false;
                        app.headData['sigintype'] = 1
                        that.setData({
                            headData: app.headData
                        })
                        wx.showToast({
                            title: res.msg,
                            icon: 'success',
                            duration: 2000,
                            success: function () {
                                setTimeout(function () {
                                }, 2000)
                            }
                        })

                        

                    } else {
                        wx.showModal({
                            title: '提示',
                            content: res.msg,
                            showCancel: false,
                        })
                    }
                }
            }

            home.request(param);
        });
    },

    // 日志反馈
    feedback: function(e) {
        this.data.headData.open = false
        this.setData({
            headData: this.data.headData
        })
        var id = e.currentTarget.dataset.id;
        wx: wx.navigateTo({
            url: '/pages/internship/logfeedback/logfeedback?id=' + id,
        })
    },
    // 返回首页
    home: function() {
        wx.navigateBack({
            delta: 1
        })
    },
    // 修改密码
    changepassword: function() {
        wx.navigateTo({
            url: '/pages/internship/changepassword/changepassword',
        })
    },
    // 选择器
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        })
    },
    // 返回应用
    return: function() {
        wx.navigateBack({
            delta: 1
        })
    },

   
})