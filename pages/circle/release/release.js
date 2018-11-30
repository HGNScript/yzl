import {
    Release
} from 'release-model.js'

var release = new Release()

var app = getApp();

Page({
    data: {
        addressFlag: false,
        imgPath: '/image/icon/circle/pic.png',
        radio: [{
                name: '可见',
                value: '1',
                checked: 'true'
            },
            {
                name: '私密',
                value: '0'
            },
        ],
        // 表情包图片
        faceImgurl: [{
                faceimg: [
                    release.imgUrl + 'face/11.png',
                    release.imgUrl + 'face/2.png',
                    release.imgUrl + 'face/3.png',
                    release.imgUrl + 'face/4.png',
                    release.imgUrl + 'face/5.png',
                    release.imgUrl + 'face/6.png',
                    release.imgUrl + 'face/7.png',
                    release.imgUrl + 'face/8.png',
                    release.imgUrl + 'face/9.png',
                    release.imgUrl + 'face/10.png',
                ]
            },
            {
                faceimg: [
                    release.imgUrl + 'face/12.png',
                    release.imgUrl + 'face/13.png',
                    release.imgUrl + 'face/14.png',
                    release.imgUrl + 'face/15.png',
                    release.imgUrl + 'face/16.png',
                    release.imgUrl + 'face/17.png',
                    release.imgUrl + 'face/18.png',
                    release.imgUrl + 'face/19.png',
                    release.imgUrl + 'face/20.png',
                ]
            }
        ],
        // 上传图片
        pic: [],

        releaseData: {
            circle: {
                circle_status: 1,
                circle_content: '',
            },
            imgurl: [],
        },

        imgurl: [],
        imgpath: []

    },

    // 选择图片标签
    toDetail: function(e) {
        var that = this
        var faceUrl = e.currentTarget.dataset['faceurl']
        var index = e.currentTarget.dataset['index']
        var pindex = e.currentTarget.dataset['pindex']

        this.data.releaseData.circle.circle_faceUrl = faceUrl

        this.setData({
            releaseData: this.data.releaseData,
            faceindex: index,
            pindex: pindex,
        })
    },

    onLoad: function() {
        app.checkUser()
    },

    // 获取内容
    getContent: function(e) {
        var content = e.detail.value
        this.data.releaseData.circle.circle_content = content

        this.setData({
            releaseData: this.data.releaseData
        })
    },


    // 上传图片
    uploadImg: function() {
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
                            if (data.valid == 1) {
                                that.data.imgurl.push(data)
                                that.setData({
                                    imgurl: that.data.imgurl,
                                })
                            }

                        }
                    }

                    app.uploadImg(data, that)
                }
            })
        }
    },


    // 删除图片
    delImg: function(e) {
        var that = this
        var imgUrl = e.currentTarget.dataset['url']
        var index = e.currentTarget.dataset['index']

        var url = "bc/delimg"

        release.delImg(url, imgUrl, function(res) {
            if (res) {
                that.data.imgurl.splice(index, 1)

                that.setData({
                    imgurl: that.data.imgurl
                })
            }
        })

    },

    //监听是否获取地址
    getAddress: function(e) {

        var that = this
        this.data.addressFlag = !this.data.addressFlag

        this.setData({
            addressFlag: this.data.addressFlag
        })

        if (this.data.addressFlag) {
            app.getAddress(this, function(res) {

                wx.hideLoading()
                that.data.releaseData.circle.circle_addresss = res
                that.setData({
                    releaseData: that.data.releaseData
                })
            })
        } else {
            that.data.releaseData.circle.circle_addresss = null
            that.setData({
                releaseData: that.data.releaseData
            })
        }
    },

    //可见性选择
    radioChange: function(e) {
        var flag = e.detail['value']

        this.data.releaseData.circle.circle_status = flag
        this.setData({
            releaseData: this.data.releaseData
        })
    },

    // btn
    submit: function() {
        var that = this
        this.data.releaseData.circle.user_id = app.user['id']

        this.setData({
            releaseData: this.data.releaseData
        })

        release.imgHandle(this)

        if (this.data.releaseData.circle.circle_content || this.data.imgurl.length > 0) {
            var url = 'circle/addcircle'
            var data = this.data.releaseData
            release.submit(url, data, function(res) {
                if (res['valid']) {
                    wx.showToast({
                        title: res['msg'],
                        icon: 'succes',
                        duration: 1000,
                        mask: true,
                        success: function(res) {
                            setTimeout(function() {
                                that.changeParentData()
                            }, 1000);
                        },
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res['msg'],
                    })
                }
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '请填写要发布的内容,或选择需要发布的图片',
            })
        }

    },

    //刷新上一级页面数据
    changeParentData: function() {

        var pages = getCurrentPages(); //当前页面栈

        if (pages.length > 1) {

            var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象

            beforePage.changeData(); //触发父页面中的方法

            wx.navigateBack({

            })

        }

    }



})