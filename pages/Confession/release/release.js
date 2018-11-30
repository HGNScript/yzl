import {
    Release
} from 'release-model.js'
var release = new Release()
var app = getApp();
Page({
    data: {
        texts: "至少5个字",
        min: 5, //最少字数
        max: 249, //最多字数 (根据自己需求改变)
        imgurl: null,
        objtext: '',
        content: '',
        so: 0,
        userId: ''
    },

    onLoad: function(){
        app.checkUser()
        
    },
    //绑定表白主题内容
    content: function (e) {
        this.setData({
            content: e.detail.value

        })

        var value = e.detail.value;
        // 获取输入框内容的长度
        var len = parseInt(value.length);

        this.setData({
            currentWordNumber: len //当前字数  
        });
    },
    //添加图片
    select: function() {
        var that = this
        app.choose(this, function(res) {

            that.setData({
                imgpath: res
            })

            var data = {
                path: that.data.imgpath,
                flag: 'confession',
                callback: function(data) {
                    if (data.valid == 1) {
                        that.setData({
                            imgurl: data,
                        })
                        wx.showToast({
                            title: '上传成功',
                            icon: 'success',
                            mask: true,
                        })
                    }
                }
            }
            //判断图片张数
            if (data.path.length > 1) {
                wx.showToast({
                    title: '只能上传一张图片',
                    icon: 'loading',
                    duration: 5000,
                    success: function() {}
                })

            } else {
                app.uploadImg(data, that)
            }

        })
    },

    //确定按钮 添加发布信息
    AddFb: function() {
        var thar = this
        var userid = app.user.id

        var data = {
            white_obj: this.data.objtext,
            white_content: thar.data.content,
            white_so: thar.data.so,
            img_url: thar.data.imgurl,
            user_id: userid
        }
        var url = 'whw/addwall'
        release.add(url, data, thar)
    },


    //绑定对谁表白文本框
    objtext: function(e) {
        this.setData({
            objtext: e.detail.value

        })
    },

    




    //是否匿名
    sliderBindchange: function(e) {
        this.setData({
            text: e.detail.value
        })
        if (e.detail.value) {
            this.setData({
                so: 1
            })
        } else {
            this.setData({
                so: 0
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

    },

    // 删除图片
    delImg: function (e) {
        var that = this
        var imgUrl = e.currentTarget.dataset['url']
        var index = e.currentTarget.dataset['index']

        var url = "bc/delimg"

        release.delImg(url, imgUrl, function (res) {
            if (res) {
                that.setData({
                    imgurl: null
                })
            }
        })

    },


})