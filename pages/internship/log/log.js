// pages/internship/log/log.js
import {
    Base
} from '../../../utils/base.js';
var base = new Base();

import {
    Home
} from '../home/home-model.js';
var home = new Home();

var app = getApp()
Page({
    data: {
        open: false
    },

    onLoad: function(o) {
        var that = this
        var id = o.id;
        this.getLogsData(id);

        var stunum = app.user.student.stu_number;

        home.siginType(stunum, (data) => {
            that.data.headData['sigintype'] = data
            that.setData({
                headData: that.data.headData
            })

            app.headData = that.data.headData

        })

        //日志消息提示
        home.logsType(stunum, (data) => {
            if (data != null) {
                that.data.headData['logstype'] = 0
                that.data.headData['logs_id'] = data.logs_id
            } else {
                that.data.headData['logstype'] = 1
            }
            that.setData({
                headData: that.data.headData
            })
            app.headData = that.data.headData

        })


    },

    onShow: function() {
        this.setData({
            headData: app.headData
        })
    },

    getLogsData: function(id) {
        var that = this;
        var params = {
            url: 'internship/logsData/' + id,
            eCallback: function(data) {
                that.setData({
                    logsData: data
                })
            }
        }
        base.request(params);
    },
    // 菜单列表
    menu: function() {
        this.data.headData['open'] = !this.data.headData.open;
        this.setData({
            headData: this.data.headData
        })
    },

    focus: function() {
        this.data.headData['open'] = false;
        this.setData({
            headData: this.data.headData
        })
    },

    // 图片预览
    img: function(e) {
        var url = e.currentTarget.dataset['imgurl']
        var imgurls = e.currentTarget.dataset['imgurls']
        wx.previewImage({
            current: url,
            urls: imgurls
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
                eCallback: function(res) {
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
                            success: function() {
                                setTimeout(function() {
                                    that.onShow();
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

    // 首页
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
    // 返回应用
    return: function() {
        wx.navigateBack({
            delta: 1
        })
    },
})