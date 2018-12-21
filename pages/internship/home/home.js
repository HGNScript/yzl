// pages/internship/home/home.js
import {
    Home
} from 'home-model.js';
var app = getApp();
var home = new Home();
Page({
    data: {
        headData: {
            open: false,
            username: null,
            sigintype: null,
            stu_id: null,
            logstype: null,
        },
        collected: true,
        authority: false,

    },

    onShow: function(option) {
        var that = this

        if (app.headData) {
            this.setData({
                headData: app.headData
            })
        }
        if (!this.data.share) {
            app.checkUser(function() {
                if (app.user.stu_id == 0 || app.user.student.stu_type != 2) {
                    wx.showModal({
                        title: '提示',
                        showCancel: false, //是否显示取消按钮
                        content: '此功能暂对广州城建技工学校实习生开放！请前往个人中心进行学生认证。',
                        success: function(res) {
                            if (res.confirm) {
                                wx.switchTab({
                                    url: '/pages/personal/personal'
                                })
                            }
                        }
                    })

                }
            });
        }
    },

    onLoad: function(e) {
        console.log(e)
        var that = this
        if (e.share) {
            this.setData({
                share: e.share
            })
            app.share(this, function(flag) {
                if (flag) {
                    if (app.user.stu_id == 0 || app.user.student.stu_type != 2) {
                        wx.showModal({
                            title: '提示',
                            showCancel: false, //是否显示取消按钮
                            content: '此功能暂对广州城建技工学校实习生开放！请前往个人中心进行学生认证。',
                            success: function(res) {
                                if (res.confirm) {
                                    wx.switchTab({
                                        url: '/pages/personal/personal'
                                    })
                                }
                            }
                        })

                    } else {
                        var stunum = app.user.student.stu_number;
                        that._loadData(stunum);
                    }
                }

            })
        } else {
            if (app.user && app.user.stu_id != 0 && app.user.student.stu_type == 2) {
                var stunum = app.user.student.stu_number;
                this._loadData(stunum);
            }
        }
    },

    //加载页面数据
    _loadData: function(stunum) {
        var that = this;
        //首页信息
        home.getStudentInfo(stunum, (data) => {
            that.data.headData['username'] = data.stu_name;
            that.data.headData['stu_id'] = data.stu_id;

            app.headData = that.data.headData
            var s = {
                current: 0,
                length: data.logsData.length
            }
            that.setData({
                stuData: data,
                headData: that.data.headData,
                swiper: s

            })

        })

        //是否签到
        home.siginType(stunum, (data) => {
            that.data.headData['sigintype'] = data
            that.setData({
                headData: that.data.headData
            })

        })

        //日志消息提示
        home.logsType(stunum, (data) => {
            if (data.length != 0) {
                that.data.headData['logstype'] = 0
                var arr = {}
                data.forEach(function(item, index) {
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

    },

    // 实习信息下拉按钮
    onCollectionTap: function(event) {
        this.setData({
            collected: !this.data.collected
        })
    },

    // swiper左右按钮
    left: function() {
        var swiper = this.data.swiper;
        var current = swiper.current;
        swiper.current = current > 0 ? current - 1 : swiper.length - 1;
        this.setData({
            swiper: swiper,
        })
    },
    right: function() {
        var swiper = this.data.swiper;
        var current = swiper.current;
        swiper.current = current < (swiper.length - 1) ? current + 1 : 0;
        this.setData({
            swiper: swiper,
        })
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
        app.getAddress(that, true, (res) => {

            if (!res){
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
                            wx.showToast({
                                title: res.msg,
                                icon: 'success',
                                duration: 2000,
                                success: function () {
                                    setTimeout(function () {
                                        app.headData['open'] = false;
                                        app.headData['sigintype'] = 1
                                        that.setData({
                                            headData: app.headData
                                        })
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
    // 修改密码
    changepassword: function() {
        wx.navigateTo({
            url: '/pages/internship/changepassword/changepassword',
        })
    },
    // 实习信息
    interninfo: function(e) {
        this.data.headData.open = false
        this.setData({
            headData: this.data.headData
        })
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/internship/interninfo/interninfo?id=' + id,
        })
    },
    // 实习记录
    practicenote: function() {
        this.data.headData.open = false
        this.setData({
            headData: this.data.headData
        })
        var stu_id = this.data.headData.stu_id;
        wx.navigateTo({
            url: '/pages/internship/practicenote/practicenote?id=' + stu_id,
        })
    },
    // 实习记录
    log: function(e) {
        this.data.headData.open = false
        this.setData({
            headData: this.data.headData
        })
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

    onShareAppMessage: function() {
        return {
            path: 'pages/internship/home/home?share=' + true,
        }
    },


    changeData: function() {
        this.onLoad({"share": null})
    },

    //登录
    getUserInfo: function(e) {
        var that = this

        app.shareLogin(this, e, function() {
            if (app.user.stu_id == 0 || app.user.student.stu_type != 2) {
                wx.showModal({
                    title: '提示',
                    showCancel: false, //是否显示取消按钮
                    content: '此功能暂对广州城建技工学校实习生开放！请前往个人中心进行学生认证。',
                    success: function (res) {
                        if (res.confirm) {
                            wx.switchTab({
                                url: '/pages/personal/personal'
                            })
                        }
                    }
                })

            } else {
                var stunum = app.user.student.stu_number;

                that._loadData(stunum);
            }
            
        })

    },

    csole: function(){
        this.setData({
            authority: false
        })
    },

})