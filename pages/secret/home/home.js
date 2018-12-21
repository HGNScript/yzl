// pages/around/details/details.js



const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()

import {
    Home
} from 'home-model.js'

import {
    Details
} from '../details/details-model.js'

var details = new Details()

var home = new Home()

var app = getApp()

Page({
    data: {
        time: 1,
        stop: false,
        imgLIst: [{
            url: '/image/g.png',
            hoverUrl: '/image/lygif.gif'
        }, ],
        authority: false,
    },
    bind_secret_details: function() {
        wx.navigateTo({
            url: '/pages/secret/details/details'
        })
    },

    onLoad: function(option) {
        var that = this

        if (option.share) {
            this.setData({
                share: option.share
            })

            app.share(this, function(flag) {
                if (flag) {
                    that.inspectTime(function(res) {
                        that.setData({
                            flag: res
                        })
                    })
                }

            })
        } else {
            that.inspectTime(function(res) {
                that.setData({
                    flag: res
                })
            })

        }
    },

    onShow: function() {
        var that = this

        if (!this.data.share) {
            app.checkUser()
        }



    },

    //查看权限
    handler: function(e) {

        if (e.detail.authSetting['scope.record']) {
            this.setData({
                authority: false
            })
        } else {
            this.setData({
                authority: true
            })
        }
    },
    //开始录制
    Start: function(e) {
        var that = this

        if (this.data.flag) {
            wx.getSetting({
                success(res) {
                    if (!res.authSetting['scope.record']) {
                        wx.authorize({
                            scope: 'scope.record',
                            success() {},
                            fail: function() {
                                that.setData({
                                    authority: true
                                })
                            }
                        })
                    } else {
                        that.audio()
                    }
                }
            })

        } else {
            wx.showModal({
                title: '提示',
                content: '每天只能录制三次',
                showCancel: false,
            });
        }
    },

    //设置录音
    audio: function() {
        var that = this
        that.setData({
            stop: true
        })

        //开始录音的时候
        const options = {
            duration: 60000, //指定录音的时长，单位 ms
            sampleRate: 16000, //采样率
            numberOfChannels: 1, //录音通道数
            encodeBitRate: 96000, //编码码率
            format: 'mp3', //音频格式，有效值 aac/mp3
            frameSize: 50, //指定帧大小，单位 KB
        }
        //开始录音
        recorderManager.start(options);

        recorderManager.onStart((res) => {
            wx.showLoading({
                title: '正在录音   ' + that.data.time + 's',
                mask: true,
            })

            that.data.setInter = setInterval(function() {

                that.data.time++

                    wx.showLoading({
                        title: '正在录音   ' + that.data.time + 's',
                        mask: true,
                    })
            }, 1000)


            that.setData({
                setInter: this.data.setInter
            })


        });

        //错误回调
        recorderManager.onError((res) => {
            wx.showModal({
                title: '提示',
                content: '录音出现异常',
                showCancel: false,
            });
        })

        recorderManager.onStop((res) => {
            wx.hideLoading()
            wx.showLoading({
                title: '正在生成录音',
                mask: true,
            })
            clearInterval(this.data.setInter)
            that.upAudio(res)
        })
    },

    //录音结束
    touchEnd: function(e) {
        if (this.data.flag) {
            var that = this

            clearInterval(that.data.setInter)

            wx.showLoading({
                title: '正在生成录音',
                mask: true,
            })

            wx.getSetting({
                success(res) {
                    if (res.authSetting['scope.record']) {
                        wx.authorize({
                            scope: 'scope.record',
                            success() {
                                recorderManager.stop();
                                recorderManager.onStop((res) => {
                                    clearInterval(that.data.setInter)
                                    that.upAudio(res)
                                })
                            }
                        })
                    } else {
                        wx.hideLoading()
                    }
                }
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '每天只能录制三次',
                showCancel: false,
            });
        }



    },

    //上传音频
    upAudio: function(res) {
        var that = this
        wx.hideLoading()

        this.setData({
            stop: false
        })
        wx.showModal({
            title: '提示',
            content: '是否保存录音',
            success: function(r) {
                if (r.cancel) {
                    that.setData({
                        time: 1
                    })
                } else {
                    wx.showLoading({
                        title: '正在保存录音',
                        mask: true,
                    })
                    home.uploadFile(res.tempFilePath, that.data.time, function(res) {
                        that.setData({
                            audio: res,
                            time: 1
                        })

                        that.inspectTime(function(res) {
                            that.setData({
                                flag: res
                            })
                        })

                        wx.hideLoading()

                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 1500
                        })


                    })
                }


            },

        })
    },



    chooseThis(e) {
        this.setData({
            imgHoverIndex: e.currentTarget.dataset.index
        })
    },

    //检查一天内的录音数量
    inspectTime: function(fn) {
        var that = this
        var timestamp = new Date().getTime()
        // console.log(new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' '));

        var date = new Date(timestamp);
        var y = 1900 + date.getYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        var tiem = y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);

        details.getAudiio('', function(data) {
            that.setData({
                audio: data
            })
            if (data.length) {
                if (data[tiem] != 'undefined') {
                    if (data[tiem].length >= 3) {
                        wx.showModal({
                            title: '提示',
                            content: '每天只能录制三次',
                            showCancel: false,
                        });

                        var res = false
                    } else {
                        var res = true
                    }
                } else {
                    var res = true
                }
            } else {
                var res = true
            }

            fn && fn(res)
        })


    },

    onHide: function() {

        if (recorderManager.start.arguments) {
            recorderManager.stop();
        }
    },

    onUnload: function() {
        if (recorderManager.start.arguments) {
            recorderManager.stop();
        }
    },

    onShareAppMessage: function() {
        return {
            path: 'pages/secret/home/home?share=' + true,
        }
    },

    //登录
    getUserInfo: function(e) {
        var that = this

        app.shareLogin(this, e, function() {
            that.inspectTime(function(res) {
                that.setData({
                    flag: res
                })
            })
        })

    },

    csole: function(){
        this.setData({
            authority: false,
        })
    }

})