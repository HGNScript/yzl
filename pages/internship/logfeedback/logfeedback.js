// pages/internship/logfeedback/logfeedback.js
import {
    Base
} from '../../../utils/base.js';
var base = new Base();

var app = getApp()
Page({
    data: {
        open: false,
        logsData: null
    },

    onLoad: function(option) {
        var logs_id = option.id;
        this.getLogsData(logs_id);
        this.setData({
            headData: app.headData
        })
    },

    getLogsData: function(logs_id) {
        var that = this;
        var params = {
            url: 'internship/logsData/' + logs_id,
            eCallback: function(data) {
                that.data.headData.logstype = 1
                app.headData.logstype = 1
                that.setData({
                    logsData: data,
                    headData: that.data.headData,
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
    log: function(e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/internship/log/log?id=' + id,
        })
    },
    // 返回应用
    return: function() {
        wx.navigateBack({
            delta: 1
        })
    },

})