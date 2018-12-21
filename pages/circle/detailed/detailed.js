// pages/detailed/detailed.js

import {
    Detailed
} from 'detailed-model.js'

var detailed = new Detailed()

var app = new getApp()


Page({
    data: {
        id: null,
        releaseFocus: true,
        matter: null,
        comment: {},
        addComment: '',
        textValue: '请输入评论内容',
        textFlag: false,
        commentData: {
            pid: null,
            uid: null,
            pname: null,
            user_name: null,
        },
        loginFlag: false,
        id: null,

    },

    // 点击头像
    userimg: function(e) {

        var user_id = e.currentTarget.dataset.uid

        wx.navigateTo({
            url: '/pages/fleamarket/personal/personal?uid=' + user_id,
        })
    },

    // 图片跳转
    img: function(e) {
        var url = e.currentTarget.dataset['imgurl']
        var imgurls = e.currentTarget.dataset['imgurls']

        var urls = []

        imgurls.forEach(function(item) {
            urls.push(item.img_url)
        })

        wx.previewImage({
            current: url,
            urls: urls // 需要预览的图片http链接列表
        })
    },

    onLoad: function(e, fn) {
        var that = this

        app.getH(this)

        var id = e.id

        that.setData({
            id: id
        })

        

        if (e.share) {
            this.setData({
                share: e.share
            })

            app.share(that, function (flag) {
                if(flag) {
                    that.getComment(that.data.id, function () {
                        fn && fn()
                    })
                    that.setIncFlow(that.data.id)
                }
            })

        } else {
            app.checkUser(function() {

                that.getComment(id, function() {
                    fn && fn()
                })
                that.setIncFlow(id)
            })
        }

    },

    //获取动态数据
    getCircle: function(id) {
        var that = this
        var url = 'circle/getcircle/' + id
        detailed.getCircle(url, function(res) {
            that.setData({
                matter: res
            })
        })
    },

    //获取数据评论
    getComment: function(id, fn) {
        var that = this

        detailed.getComment(id, function(res) {
            that.setData({
                comment: res,
            })
            fn && fn()

        })
    },

    //显示评论数据
    reply: function(e) {
        var index = e.currentTarget.dataset['index']

        if (this.data.comment[index]['son'].length > 0) {
            this.data.comment[index]['reply'] = !this.data.comment[index]['reply']

            this.setData({
                comment: this.data.comment
            })
        }

    },

    //绑定填写评论数据
    comment: function(e) {
        var value = e.detail['value']

        this.setData({
            addComment: value,
        })
    },

    //回复评论
    replyComment: function(e) {
        var that = this
        setTimeout(function() {
            var pid = e.currentTarget.dataset['pid']
            var uid = e.currentTarget.dataset['uid']
            var pname = e.currentTarget.dataset['pname']

            var user_name = app.user['user_name']

            that.data.commentData['pid'] = pid
            that.data.commentData['uid'] = uid
            that.data.commentData['user_name'] = user_name

            if (uid) {
                that.data.commentData['pname'] = pname
            } else {
                that.data.commentData['pname'] = ''

            }

            that.setData({
                textValue: '回复:' + pname,
                textFlag: true,
                commentData: that.data.commentData,
            })
        }, 100)
    },

    textFocus: function(e) {
        this.setData({
            textValue: '请输入评论内容',
            commentData: {
                pid: null,
                uid: null,
                pname: null,
                user_name: null,
            },
        })
    },


    //提交评论
    submit: function(e) {

        var that = this
        var info_id = e.currentTarget.dataset['id']
        var user_id = app.user['id']
        var value = this.data.addComment

        if (this.data.commentData.pid) {
            var data = {
                user_id: user_id,
                info_id: info_id,
                pid: this.data.commentData.pid,
                uid: this.data.commentData.uid,
                value: value,
            }
        } else {
            var data = {
                user_id: user_id,
                info_id: info_id,
                value: value,
            }
        }

        if (!that.data.commentData.pid) {
            that.setData({
                buttomFlag: true
            })
        } else {
            that.setData({
                buttomFlag: false
            })
        }



        detailed.submit(data, function(res) {
            if (res.comment_id) {
                that.setData({
                    addComment: null,
                })

                that.onLoad({
                    id: that.data.id
                }, function() {
                    if (that.data.buttomFlag) {
                        that.setData({
                            toViewRt: 't1'
                        })
                    }
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: '发送失败',
                })
            }
        })

    },

    //浏览量增加
    setIncFlow: function(id) {
        var that = this
        detailed.setIncFlow(id, function(res) {
            var data = {
                id: that.data.id
            }
            that.getCircle(that.data.id)
        })
    },

    onUnload: function() {
        this.changeParentData()
    },

    //刷新上一级页面数据
    changeParentData: function() {
        var that = this

        var pages = getCurrentPages(); //当前页面栈

        if (pages.length > 1) {

            var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象

            beforePage.changeData(that.data.matter); //触发父页面中的方法

        }

    },


    // 点赞事件
    good: function(e) {

        var that = this
        var info_id = this.data.matter['circle_id']

        if (!this.data.matter['goodFlag']) {
            this.data.matter['goodFlag'] = !this.data.matter['goodFlag']
            this.data.matter['circle_good'] = parseInt(this.data.matter['circle_good']) + 1

            var user_id = app.user['id']

            detailed.good(user_id, info_id, function(res) {
                that.data.matter['goodid'] = res.msg['good_id']
                that.setData({
                    matter: that.data.matter
                })
            })
        } else {
            var id = this.data.matter['goodid']
            this.data.matter['goodFlag'] = !this.data.matter['goodFlag']
            this.data.matter['circle_good'] = parseInt(this.data.matter['circle_good']) - 1

            detailed.delGood(id, function(res) {
                that.setData({
                    matter: that.data.matter
                })
            })
        }
    },


    onShareAppMessage: function() {
        return {
            title: '猿周率',
            path: '/pages/circle/detailed/detailed?id=' + this.data.id + '&share=' + true
        }
    },

    //登录
    getUserInfo: function(e) {
        var that = this

        app.shareLogin(this, e, function(){
            that.getComment(that.data.id, function () {
                fn && fn()
            })
            that.setIncFlow(that.data.id)
        })

        
    },



    csole: function() {
        // this.setData({
        //     loginFlag: false,
        // })

    }




})