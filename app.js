//app.js
import {
    Base
} from 'utils/base.js'
import {
    Login
} from 'utils/login.js'

// var QQMapWX = require('/libs/qqmap-wx-jssdk.min.js');

var amapFile = require('/libs/amap-wx.js');

var login = new Login()

var base = new Base()



App({

    user: null,
    imgpath: [],
    imgurl: [],

    globalData: {
        url: '',
    },
    onLaunch: function() {

    },

    //配置高德地图
    getAddress(that, detailed, fn) {
        var appthis = this;


        appthis.myAmapFun = new amapFile.AMapWX({
            key: '6e874b8c59b8bbf9be232fabac966bd5'
        });


        wx.showLoading({
            title: '请稍等',
            mask: true,

        })
        appthis.setAddress(that, detailed, fn, )

    },

    // 高德
    setAddress(that, detailed, fn) {

        this.myAmapFun.getRegeo({
            success: function(e) {
                if (detailed) {
                    var address = e[0].regeocodeData.formatted_address;
                } else {
                    var address = e[0].desc + "·" + e[0].regeocodeData.addressComponent.district + "·" + e[0].regeocodeData.addressComponent.city;
                }
                fn(address)
            },

            fail: function(res) {
                wx.hideLoading()
                fn(false)


            }

        })
    },



    //查看是否登录，登录身份是学生还是游客
    checkUser: function(callback) {
        var that = this
        if (!this.user) {
            wx.showModal({
                title: '提示',
                showCancel: false, //是否显示取消按钮
                content: '您还未登录，无法使用该应用，请前往个人中心授权登录',
                success: function(res) {
                    if (res.confirm) {
                        wx.switchTab({
                            url: '/pages/personal/personal'
                        })
                    }
                }
            })
        } else {
            callback && callback()
        }
    },

    //登录
    login: function(that, fn) {

        var appthis = this
        wx.login({
            success: function(res) {

                var code = res.code;

                var data = {
                    user_name: that.data.userInfo['user_name'],
                    imageUrl: that.data.userInfo['imageUrl'],
                    gender: that.data.userInfo['gender'],
                }

                login.login(code, data, function(res) {
                    if (res['valid']) {
                        appthis.user = res['user']

                        that.setData({
                            user: res.user
                        })
                    }

                    fn && fn()

                })
            }
        })
    },

    //选取图片的方法
    choose: function(that, number, fn) {

        if (!number) {
            number = 3
        }

        var appthis = this,
            imgpath = this.imgpath;
        wx.chooseImage({
            count: number - imgpath.length, // 最多可以选择的图片张数，默认9
            sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function(res) {
                var imgsrc = res.tempFilePaths;
                fn && fn(imgsrc)
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })

    },
    //上传图片
    uploadImg: function(data, that) {
        var appthis = this,
            i = data.i ? data.i : 0, //当前上传的哪张图片
            success = data.success ? data.success : 0, //上传成功的个数
            fail = data.fail ? data.fail : 0; //上传失败的个数
        wx.showLoading({
            title: '正在上传',
            mask: true,

        })
        wx.uploadFile({
            url: base.baseRequestUrl + 'bc/upimg',
            filePath: data.path[i],
            name: 'images', //这里根据自己的实际情况改
            formData: {
                id: appthis.user['id'],
                flag: data.flag
            },
            success: (res) => {

                var data2 = JSON.parse(res.data);
                if (data2.valid == 1) {
                    success++; //图片上传成功，图片上传成功的变量+1
                    data.callback && data.callback(data2)

                } else {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: data2.msg,
                    })
                }
            },
            fail: (res) => {
                fail++; //图片上传失败，图片上传失败的变量+1

            },
            complete: () => {
                i++; //这个图片执行完上传后，开始上传下一张
                if (i == data.path.length) { //当图片传完时，停止调用     

                    wx.hideLoading()

                } else { //若图片还没有传完，则继续调用函数
                    data.i = i;
                    data.success = success;
                    data.fail = fail;
                    appthis.uploadImg(data, that);
                }

            }
        });
    },

    //获取字符串字节数
    getBytesCount: function(str) {
        var bytesCount = 0;
        if (str != null) {
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (/^[\u0000-\u00ff]$/.test(c)) {
                    bytesCount += 1;
                } else {
                    bytesCount += 2;
                }
            }
        }
        return bytesCount;
    },

    //跳转个人信息
    jump: function(e) {
        var id = e.currentTarget.dataset.id;


        wx.navigateTo({
            url: '/pages/fleamarket/personal/personal?uid=' + id,
        })
    },

    //刷新上一级页面数据
    changeParentData: function(fn, data) {

        var pages = getCurrentPages(); //当前页面栈

        if (pages.length > 1) {

            var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象

            beforePage.changeData(data); //触发父页面中的方法

            fn && fn()

        }

    },

    // 获取hei的id节点然后屏幕焦点调转到这个节点  
    bottom: function(fn) {
        wx.getSystemInfo({
            success: function(res) {
                wx.createSelectorQuery().select('#page').boundingClientRect(function(rect) {

                    wx.pageScrollTo({
                        scrollTop: rect.height
                    })
                }).exec()

                fn && fn()

            }
        })
    },

    //分享入口进来的需要检测是否登录
    share: function(that, fn) {
        var appthis = this

        if (that.data.share) {
            if (!appthis.user) {
                that.setData({
                    loginFlag: true
                })

                fn && fn(false)
            } else {
                fn && fn(true)
            }
        } else {
            fn && fn(true)
        }
    },


    //分享登录
    shareLogin: function(that, e, callback) {
        var appthis = this

        var fn = null

        wx.showLoading({
            title: '请稍等',
        })

        if (e.detail.userInfo != null) {
            that.setData({
                userInfo: {
                    imageUrl: e.detail.userInfo.avatarUrl,
                    user_name: e.detail.userInfo.nickName,
                    gender: e.detail.userInfo.gender,
                }
            })
            appthis.login(that, function() {

                if (that.data.user) {
                    that.setData({
                        loginFlag: false,
                    })

                    callback && callback()


                } else {
                    wx.showModal({
                        content: '登录失败，请检查网络是否连接',
                        showCancel: false,
                    })
                }
            })
        }
    },

    getH: function(that) {
        wx.getSystemInfo({
            success: (options) => {
                var h = options.windowHeight;
                that.setData({
                    h: h
                })
            }
        })
    },

    getW: function(that) {
        wx.getSystemInfo({
            success: (options) => {
                var w = options.windowWidth;
                that.setData({
                    w: w
                })
            }
        })
    },


    getWXACodeUnlimit: function(data, Callback) {

        var parmes = {
            url: '/bc/qrcode',
            type: 'post',
            data: data,
            eCallback: function(res) {
                Callback(base.imgUrl + res.data.tuiguangimg)
            }
        }
        base.request(parmes)
    },

    // 实习教师tabbar跳转
    tabbarsurveybtn: function() {
        wx.redirectTo({
            url: '/pages/sx_teacher/survey/survey',
        })
    },
    tabbarclassbtn: function() {
        wx.redirectTo({
            url: '/pages/sx_teacher/class/class',
        })
    },
    tabbarstudentbtn: function() {
        wx.redirectTo({
            url: '/pages/sx_teacher/student/student',
        })
    },
    tabbarsigninbtn: function() {
        wx.redirectTo({
            url: '/pages/sx_teacher/signin/signin',
        })
    },


    //实习请求
    practiceRequest: function(parmes) {
        var url = parmes.url

        if (!parmes.type) {
            parmes.type = 'GET'
        }
        var that = this

        wx.showLoading({
            title: '请稍等',
            mask: true,
        })

        wx.request({
            url: base.practiceApiUrl + url,
            data: parmes.data,
            method: parmes.type,
            header: {
                'content-type': 'application/json',
            },

            success: function(res) {
                wx.hideLoading();
                parmes.eCallback && parmes.eCallback(res.data)

            },
            fail: function(err) {
                wx.hideLoading();
                console.log(err)
            },
        })
    },


    showErrorModal: function (error) {
        wx.showModal({
            content: error.msg,
            showCancel: false,
        })
    },

    percentage: function(num, sum){
        return (num / sum) * 100
    }










})