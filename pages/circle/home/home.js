var app = getApp()

import {
    Home
} from 'home-model.js'

var home = new Home()
Page({
    data: {
        navbar: [{
                'name': '新鲜',
                'value': '',
            },
            {
                'name': '热门',
                'value': 'circle_good'
            },
        ],
        currentTab: 0,
        reply: true,
        // releaseFocus: true,
        matter: [],
        where: '',
        pStart: 1,
        limit: 5,
        loginFlag: false

    },
    // 发布帖子
    anniu: function() {
        wx.navigateTo({
            url: '/pages/circle/release/release'
        })
    },
    // --导航条--
    navbarTap: function(e) {
        var where = e.currentTarget.dataset.where

        this.data.matter = []

        this.setData({
            currentTab: e.currentTarget.dataset.idx,
            where: where,
            matter: this.data.matter,
            pStart: 1,
        })

        this.setonReachBottom(true)


        this.getCircle(this.data.where, this.data.pStart, this.data.limit)
    },

    // 文本内容
    bindundetails: function(e) {
        var id = e.currentTarget.dataset['id']
        wx.navigateTo({
            url: '/pages/circle/detailed/detailed?id=' + id
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


    onLoad: function(option) {
        var where = ''
        this.getCircle(where, this.data.pStart, this.data.limit)

        this.refreshView = this.selectComponent("#refreshView")


    },

    onShow: function() {

        this.checkUser()

    },

    //查看是否登录，登录身份是学生还是游客
    checkUser: function(e) {
        app.checkUser()
    },

    //刷新
    changeData: function(data) {
        var that = this

        if (data) {

            that.data.matter.forEach(function(item, index) {
                if (item.circle_id == data.circle_id) {
                    var old = that.data.matter[index]

                    that.data.matter[index] = data

                    that.data.matter[index].checked = old['checked']

                    that.data.matter[index].checkedFlag = old['checkedFlag']


                    that.setData({
                        matter: that.data.matter
                    })
                }
            })



        } else {
            this.setData({
                pStart: 1,
                limit: 5,
            })
            that.onLoad()
        }
    },

    // 收起||全部
    check: function(e) {
        var index = e.currentTarget.dataset['index']

        this.data.matter[index]['checked'] = !this.data.matter[index]['checked']


        this.setData({
            matter: this.data.matter
        })

    },

    // 评论输入
    bindReply: function(e) {
        this.setData({
            releaseFocus: !this.data.releaseFocus
        })
    },

    // 点击头像
    userimg: function(e) {
        var user_id = e.currentTarget.dataset.uid

        wx.navigateTo({
            url: '/pages/fleamarket/personal/personal?uid=' + user_id,
        })
    },

    //获取动态数据
    getCircle: function(where, pStart, limit, fn, data) {
        if (app.user) {
            var url = 'circle/getcircles?where=' + where + '&pStart=' + pStart + '&limit=' + limit + '&uid=' + app.user.id
            var that = this
            home.getCircle(url, function(res) {
                if (res.length > 0) {
                    if (that.data.pStart > 1) {
                        res = that.data.matter.concat(res)
                        that.setData({
                            matter: res
                        })
                    } else {
                        that.setData({
                            matter: res
                        })
                    }

                } else {
                    that.setData({
                        pStart: 1
                    })

                    that.setonReachBottom(false)
                }

                wx.stopPullDownRefresh()

                fn && fn()

            })
        }

    },

    // 点赞
    good: function(e) {
        var that = this
        var index = e.currentTarget.dataset['index']

        if (!this.data.matter[index]['goodFlag']) {
            this.data.matter[index]['goodFlag'] = !this.data.matter[index]['goodFlag']

            this.data.matter[index]['circle_good'] = parseInt(this.data.matter[index]['circle_good']) + 1


            var user_id = app.user['id']
            var info_id = this.data.matter[index]['circle_id']

            home.good(user_id, info_id, function(res) {
                that.data.matter[index]['goodid'] = res.msg['good_id']
                that.setData({
                    matter: that.data.matter
                })

            })
        } else {
            var id = this.data.matter[index]['goodid']
            this.data.matter[index]['goodFlag'] = !this.data.matter[index]['goodFlag']

            this.data.matter[index]['circle_good'] = parseInt(this.data.matter[index]['circle_good']) - 1

            home.delGood(id, function(res) {
                that.setData({
                    matter: that.data.matter
                })

            })
        }
    },

    //调用上拉加载
    onPullDownRefresh: function() {
        var where = this.data.where
        this.getCircle(this.data.where, this.data.pStart, this.data.limit)

        this.setonReachBottom(true)


    },

    //上拉触底
    onReachBottom: function() {
        this.data.pStart = this.data.pStart + 1

        this.setData({
            pStar: this.data.pStart
        })

        this.getCircle(this.data.where, this.data.pStart, this.data.limit)

    },


    //设置上拉触底方法 默认为上拉加载新数据，当数据加载完毕后，上拉触底方法不再加载数据
    setonReachBottom: function(flag) {
        if (flag) {
            this.onReachBottom = function() {
                this.data.pStart = this.data.pStart + 1

                this.setData({
                    pStar: this.data.pStart
                })

                this.getCircle(this.data.where, this.data.pStart, this.data.limit)

            }
        } else {
            this.onReachBottom = function() {
                return
            }
        }

    },

    //触摸开始
    handletouchstart: function(event) {
        this.refreshView.handletouchstart(event)
    },
    //触摸移动
    handletouchmove: function(event) {
        this.refreshView.handletouchmove(event)
    },
    //触摸结束
    handletouchend: function(event) {
        this.refreshView.handletouchend(event)
    },
    //触摸取消
    handletouchcancel: function(event) {
        this.refreshView.handletouchcancel(event)
    },
    //页面滚动
    onPageScroll: function(event) {
        this.refreshView.onPageScroll(event)
    },
    _pullState: function(event) {

    },

    onPullDownRefresh: function() {
        var that = this
        this.getCircle(this.data.where, this.data.pStart, this.data.limit, function() {
            that.refreshView.stopPullRefresh()

        })
        this.setonReachBottom(true)

    },

    //分享
    onShareAppMessage: function() {
        return {
            title: '猿周率',
            path: '/pages/circle/home/home'
        }
    },




})