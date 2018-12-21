// pages/internship/practicenote/practicenote.js

import {
    Base
} from '../../../utils/base.js';
var base = new Base();
const app = getApp();

import {
    Home
} from '../home/home-model.js';
var home = new Home();

Page({
    data: {
        open: false,
        imgurl: [],
        imgdata: [],
        authority: false,
        
    },
    onLoad: function(o) {
        var id = o.id;
        this.setData({
            stu_id: id,
        })
    },
    onShow: function () {
        this.setData({
            headData: app.headData
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
    feedback: function() {
        wx: wx.navigateTo({
            url: '/pages/internship/logfeedback/logfeedback',
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

    // 图片上传
    upload: function() {
        var that = this;
        wx.chooseImage({
            count: 3,
            sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'],
            success: function(res) {
                var tempFilePaths = res.tempFilePaths
                var newimglen = that.data.imgurl.length + tempFilePaths.length;

                if (newimglen > 3) {
                    wx.showModal({
                        title: '提示',
                        content: '只能上传三张图片',
                    })
                } else {

                    that.setData({
                        imgdata: tempFilePaths,
                    })

                    that.uploadImg(tempFilePaths);
                }
            }
        })
    },


    uploadImg: function(data) {
        var that = this,
            i = data.i ? data.i : 0, //当前上传的哪张图片
            success = data.success ? data.success : 0, //上传成功的个数
            fail = data.fail ? data.fail : 0; //上传失败的个数

        wx.showLoading({
            title: '正在上传',
            mask: true,

        })

        wx.uploadFile({
            url: base.practiceUrl + '/index/index/upload?flag=practice',
            filePath: data[i],
            name: 'image', 
            success: (res) => {
                var res2 = JSON.parse(res.data)
                

                if (res2.status == 1) {
                    var url = base.practiceUrl + res2.url
                    success++; 
                    that.data.imgurl.push(url);
                    that.setData({
                        imgurl: that.data.imgurl,
                    })
                } else {
                    fail++;1
                }
            },
            complete: () => {
                i++; 

                if (i == that.data.imgdata.length) {  
                    wx.hideLoading()

                } else { 
                    data.i = i;
                    data.success = success;
                    data.fail = fail;
                    that.uploadImg(data);
                }

            },
            fail: function(){
                wx.hideLoading()
                
            }
        });
    },



    submitdata: function(e) {
        var that = this
        var stu_id = this.data.stu_id;

        var len = base.practiceUrl.length

        this.data.imgurl.forEach(function(item, index){
            that.data.imgurl[index] = item.slice(len, item.length)
        })

        var url = this.data.imgurl
       
        if (!this.data.imgurl.length) {
            wx.showModal({
                title: '提示',
                content: '请添加照片',
            })

            return
        } else {
            var logsdata = {
                logs_content: url,
                stu_id: stu_id
            };
        }
        
        var params = {
            url: 'internship/addLogsData',
            data: logsdata,
            type: 'POST',
            eCallback: function(res) {
                if (res.valid == 1) {
                    wx.showToast({
                        title: res.msg,
                        icon: 'success',
                        duration: 2000,
                        success: function() {
                            setTimeout(function() {
                                app.changeParentData(function () {
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                })
                            }, 2000)
                        }
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.msg,
                    })
                }
            }
        }
        base.request(params);
    },

    // 删除图片上传
    delete: function(e) {

        console.log(e)
        var index = e.currentTarget.dataset.index

        this.data.imgurl.splice(index, 1)

        this.setData({
            imgurl: this.data.imgurl
        })
    },

    // 日志反馈
    feedback: function (e) {
        this.data.headData.open = false
        this.setData({
            headData: this.data.headData
        })
        var id = e.currentTarget.dataset.id;
        wx: wx.navigateTo({
            url: '/pages/internship/logfeedback/logfeedback?id=' + id,
        })
    },
    csole: function () {
        this.setData({
            authority: false
        })
    },
})