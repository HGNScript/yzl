import {
    Detailed
} from 'detailed-model.js'

var detailed = new Detailed()

var app = new getApp()

Page({
    data: {
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
    },

    bindReply: function(e) {
        this.setData({
            releaseFocus: false,
            textFlag: true,
        })
    },

    bind_market_seller: function(e) {
        var user_id = e.currentTarget.dataset['id']
        wx.navigateTo({
            url: '/pages/fleamarket/personal/personal?uid=' + user_id,
        })
    },

    // 图片预览
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


    // 拨打电话
    calling: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.matter.fleamarket_phone,
            success: function() {
                console.log("拨打电话成功！")
            },
            fail: function() {
                console.log("拨打电话失败！")
            }
        })
    },

    onLoad: function(e, fn) {
        var that = this

        app.checkUser(function () {
            var id = e.id

            that.setData({
                id: id
            })

            that.setIncFlow(id)

            that.getComment(id, function () {
                fn && fn()
            })
        })        
    },

    //退出刷新
    onUnload: function () {
        this.changeParentData()
    },

    //获取动态数据
    getFm: function(id) {
        var that = this
        var url = 'fm/getfm/' + id
        detailed.getFm(url, function(res) {
            that.setData({
                matter: res
            })
        })
    },

    //浏览量增加
    setIncFlow: function(id) {

        var that = this
        detailed.setIncFlow(id, function(res) {
            var data = {
                id: that.data.id
            }
        })

        this.getFm(id)
    },

    // 点赞
    good: function(e) {
        //点赞
        var that = this

        if (!this.data.matter['goodFlag']) {
            this.data.matter['goodFlag'] = !this.data.matter['goodFlag']

            this.data.matter['fleamarket_good'] = parseInt(this.data.matter['fleamarket_good']) + 1


            var user_id = app.user['id']
            var info_id = this.data.matter['fleamarket_id']

            detailed.good(user_id, info_id, function(res) {
                that.data.matter['goodid'] = res.msg['good_id']
                that.setData({
                    matter: that.data.matter
                })
            })

        } else {

            //删除点赞数据
            var id = this.data.matter['goodid']
            this.data.matter['goodFlag'] = !this.data.matter['goodFlag']

            this.data.matter['fleamarket_good'] = parseInt(this.data.matter['fleamarket_good']) - 1

            detailed.delGood(id, function(res) {
                that.setData({
                    matter: that.data.matter
                })

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
        this.setData({
            releaseFocus: !this.data.releaseFocus
        })

        var pid = e.currentTarget.dataset['pid']
        var uid = e.currentTarget.dataset['uid']
        var pname = e.currentTarget.dataset['pname']

        var user_name = app.user['user_name']

        this.data.commentData['pid'] = pid
        this.data.commentData['uid'] = uid
        this.data.commentData['user_name'] = user_name

        if (uid) {
            this.data.commentData['pname'] = pname
        } else {
            this.data.commentData['pname'] = ''

        }

        this.setData({
            textValue: '回复:' + pname,
            textFlag: true,
            commentData: this.data.commentData,
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

            that.setData({
                releaseFocus: true,
                commentData: {
                    pid: null,
                    uid: null,
                    pname: null,
                    user_name: null,
                },
                addComment: null,
            })

            if (res.comment_id) {
                that.onLoad({id: that.data.id}, function(){
                    if (that.data.buttomFlag) {
                        app.bottom(function () {
                            that.setData({
                                buttomFlag: false
                            })
                        })
                    }
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: res.msg,
                })
            }
        })

    },

    textFocus: function(e) {

        this.setData({
            textValue: '请输入评论内容',
            releaseFocus: true,
        })
    },

    // 收藏
    coller: function(e) {
        //点赞
        var that = this

        if (!this.data.matter['collectFlag']) {
            this.data.matter['collectFlag'] = !this.data.matter['collectFlag']

            var user_id = app.user['id']
            var info_id = this.data.matter['fleamarket_id']

            detailed.coller(user_id, info_id, function(res) {

                that.data.matter['collectid'] = res.msg['collect_id']


                that.setData({
                    matter: that.data.matter
                })
                

            })

        } else {

            //删除点赞数据
            var id = this.data.matter['collectid']
            this.data.matter['collectFlag'] = !this.data.matter['collectFlag']

            detailed.delColler(id, function(res) {
                that.setData({
                    matter: that.data.matter
                })
                

            })
        }
    },

    //刷新上一级页面数据
    changeParentData: function () {

        var pages = getCurrentPages();//当前页面栈

        if (pages.length > 1) {

            var beforePage = pages[pages.length - 2];//获取上一个页面实例对象

            beforePage.changeData(this.data.matter);//触发父页面中的方法

        }

    },

    onShareAppMessage: function () {
        return {
            path: '/pages/fleamarket/details/details?id=' + this.data.id
        }
    },



})