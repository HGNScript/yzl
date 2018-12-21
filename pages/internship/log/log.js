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
        open: false,
        authority: false,
    },

    onLoad: function(o) {
        var that = this
        var id = o.id;

        var stunum = app.user.student.stu_number;

        this.getLogsData(id, stunum);
        
    },

    onShow: function() {
        this.setData({
            headData: app.headData
        })
    },

    getLogsData: function (id, stunum) {
        var that = this;
        var params = {
            url: 'internship/logsData',
            type: 'post',
            data: { id: id },
            eCallback: function(data) {
                that.setData({
                    logsData: data
                })

                app.changeParentData()

                //日志消息提示
                home.logsType(stunum, (data) => {
                    if (data.length != 0) {
                        that.data.headData['logstype'] = 0
                        var arr = {}
                        data.forEach(function (item, index) {
                            arr[index] = item.logs_id
                        })

                        that.data.headData['logs_id'] = JSON.stringify(arr)
                    } else {
                        that.data.headData['logstype'] = 1
                    }
                    that.setData({
                        headData: that.data.headData
                    })
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
        app.getAddress(that, true, (res) => {

            if (!res) {
                that.setData({
                    authority: true,
                })
            } else {
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
            }

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

    csole: function () {
        this.setData({
            authority: false
        })
    },
})