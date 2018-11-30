// pages/feedback/feedback.js

import {
    Feedback
} from 'feedback-model.js'

var feedback = new Feedback()

var app = new getApp()
Page({
    data: {
        feedback_content: '',
        imgurl: [],
        imgpath: []
    },

    feedbackContent: function(e) {
        this.setData({
            feedback_content: e.detail.value
        })
    },

    onLoad: function() {
        app.checkUser(function() {})
    },


    submit: function() {
        var that = this

        var data = {
            feedback_content: that.data.feedback_content,
            user_id: app.user.id,
            imgurl: that.data.imgurl,
        }

        feedback.submit(data, function(res) {
            if (res['valid']) {
                wx.showToast({
                    title: '提交成功',
                    icon: 'succes',
                    mask: true,
                    success: function(res) {
                        setTimeout(function(){
                            wx.navigateBack({})
                        },1000)
                    },
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: '提交失败',
                })
            }
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
                        flag: 'feedback',
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

        feedback.delImg(url, imgUrl, function(res) {
            if (res) {
                that.data.imgurl.splice(index, 1)

                that.setData({
                    imgurl: that.data.imgurl
                })
            }
        })

    },

})