// pages/parttimejob/release/release.js
var app = getApp();
import {
    Release
} from 'release-model.js';
var release = new Release();

Page({
    data: {
        array: ['日结', '周结', '月结', '面议'],
        index: 0,
        pic: [
            '/image/icon/circle/pic.png',
            '/image/icon/circle/pic.png',
            '/image/icon/circle/pic.png',
        ],
        imgurl: [],
        imgpath: [],
    },
    onLoad(o) {
        release.initValidate();
    },
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        })
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
            app.choose(this, function(imgsrc) {
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

    subjobdata(e) {
        let data = e.detail.value;
        //校验表单
        if (!release.WxValidate.checkForm(data)) {
            const error = release.WxValidate.errorList[0]
            this.showModal(error)
            return false
        }
        data.job_cycle = this.data.array[this.data.index];
        data.imgData = this.data.imgurl;
        data.user_id = app.user.id;

        release.submitJobData(data, (res) => {
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