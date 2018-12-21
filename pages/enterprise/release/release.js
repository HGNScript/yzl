// pages/enterprise/release/release.js
var app = getApp();
import {
    Release
} from 'release-model.js';
var release = new Release();
Page({
    data: {
        imgurl: [],
        imgpath: [],
    },
    onLoad: function(o) {
        release.initValidate();
    },
    // 上传图片
    upload: function() {
        var that = this
        if (this.data.imgurl.length > 3) {
            wx.showModal({
                title: '提示',
                content: '只能上传三张图片',
            })
        } else {
            app.choose(this, 3,function(imgsrc) {
                that.setData({
                    imgpath: imgsrc
                })
                if ((that.data.imgpath.length + that.data.imgurl.length) > 3) {
                    wx.showModal({
                        title: '提示',
                        content: '只能上传三张图片',
                    })
                } else {
                    var data = {
                        path: that.data.imgpath,
                        flag: 'upimg',
                        callback: function(data) {
                            that.data.imgurl.push(data.url)
                            that.setData({
                                imgurl: that.data.imgurl,
                            })
                        }
                    }
                    app.uploadImg(data, that)
                }
            })
        }
    },
    // 删除图片提示
    delete(e) {
        var that = this
        var imgUrl = e.currentTarget.dataset['url']
        var index = e.currentTarget.dataset['index']

        var url = "bc/delimg"

        release.delImg(url, imgUrl, function(res) {
            if (res) {
                that.data.imgurl.splice(index, 1)
                that.data.imgpath.splice(index, 1)
                that.setData({
                    imgurl: that.data.imgurl,
                    imgpath: that.data.imgpath
                })
            }
        })
    },
    formSubmit: function(e) {
        var data = e.detail.value;
        //校验表单
        if (!release.WxValidate.checkForm(data)) {
            const error = release.WxValidate.errorList[0]
            this.showModal(error)
            return false
        }
        data.imgData = this.data.imgurl;
        data.type_id = app.user.company.classify_id;
        data.user_id = app.user.id;
        release.addReleaseData(data, (res) => {
            if (res.valid == 1) {
                wx.showToast({
                    title: res.msg,
                    icon: 'success',
                    duration: 1500,
                    mask: true,
                    success: function() {
                        setTimeout(function() {
                            app.changeParentData(function() {
                                wx.navigateBack({})
                            })
                        }, 1500)
                    }
                })
            }
        })
    },
    //报错
    showModal: function(error) {
        wx.showModal({
            content: error.msg,
            showCancel: false,
        })
    }
})