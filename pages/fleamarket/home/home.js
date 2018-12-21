// pages/market/market.js

var app = getApp()

import {
    Home
} from 'home-model.js'

var home = new Home()
Page({
    data: {
        navData: null,
        currentTab: 0,
        reply: true,
        releaseFocus: true,
        matter: [],
        cateid: 0,
        pStart: 1,
        limit: 5,
        navData: [{
            text: '全部'
        }, ],
    },

    detailed: function(e) {
        var id = e.currentTarget.dataset['id']
        wx.navigateTo({
            url: '/pages/fleamarket/details/details?id=' + id
        })
    },

    navbarTap: function(e) {
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(option) {
        var that = this
        app.getW(this)

        this.refreshView = this.selectComponent("#refreshView")

        this.getFmCate()
        var cateid = ''

        if (option.share) {
            this.setData({
                share: option.share
            })
        } else {
            if (app.user) {
                this.getAllFm(cateid, this.data.pStart, this.data.limit)
            }
        }


    },

    onShow: function() {
        var that = this
        if (this.data.share) {
            app.share(this, function(flag) {
                var cateid = ''

                if (flag) {
                    that.getAllFm(cateid, that.data.pStart, that.data.limit)
                }
            })
        } else {
            app.checkUser()
        }

    },


    // 点击头像
    userimg: function(e) {
        app.jump(e)
    },

    //模糊查询
    bind_market_search: function() {
        wx.navigateTo({
            url: '/pages/fleamarket/search/search'
        })
    },

    // 导航条
    switchNav(event) {
        var cur = event.currentTarget.dataset.current;

        var cateid = event.currentTarget.dataset.cateid;

        if (!cateid) {
            cateid = ''
        }

        //每个tab选项宽度占1/5
        var singleNavWidth = this.data.w / 5;

        //tab选项居中                            
        this.setData({
            navScrollLeft: (cur - 2) * singleNavWidth
        })
        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur,
                matter: null,
                cateid: cateid
            })

            if (cateid) {
                this.getAllFm(cateid, this.data.pStart, this.data.limit)
            } else {
                var cateid = ''
                this.getAllFm(cateid, this.data.pStart, this.data.limit)

            }

            this.setonReachBottom(true)

        }

    },

    // 添加发布
    append: function() {
        wx.navigateTo({
            url: '/pages/fleamarket/release/release',
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

    // 收起||全部
    check: function(e) {
        var index = e.currentTarget.dataset['index']

        this.data.matter[index]['checked'] = !this.data.matter[index]['checked']


        this.setData({
            matter: this.data.matter
        })

    },
    //刷新
    changeData: function(data) {
        var that = this
        if (data) {
            that.data.matter.forEach(function(item, index) {
                if (item.fleamarket_id == data.fleamarket_id) {
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
            })
            this.getAllFm(this.data.cateid, this.data.pStart, this.data.limit)
        }
    },

    //获取跳蚤市场分类数据
    getFmCate: function() {
        var that = this
        home.getFmCate(function(res) {
            res.unshift({
                fleamarketCate_name: '全部',
            });
            that.setData({
                navData: res,
            })
        })
    },

    //获取跳蚤市场贴子数据
    getAllFm: function(cateid, pStart, limit, fn, data) {
        var url = 'fm/getCateFms?cateid=' + cateid + '&pStart=' + pStart + '&limit=' + limit
        var that = this
        home.getAllFm(url, function(res) {
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

            fn && fn()

            wx.stopPullDownRefresh()

        })
    },

    //上拉触底 加载数据
    onReachBottom: function() {
        this.data.pStart = this.data.pStart + 1

        this.setData({
            pStar: this.data.pStart
        })

        this.getAllFm(this.data.cateid, this.data.pStart, this.data.limit)

    },


    //设置上拉事件
    setonReachBottom: function(flag) {
        if (flag) {
            this.onReachBottom = function() {
                this.data.pStart = this.data.pStart + 1

                this.setData({
                    pStar: this.data.pStart
                })

                this.getAllFm(this.data.cateid, this.data.pStart, this.data.limit)

            }
        } else {
            this.onReachBottom = function() {
                // wx.showModal({
                //     title: '提示',
                //     content: '数据已加载完',
                // })
                return
            }
        }

    },

    // 点赞
    good: function(e) {
        //点赞
        var that = this
        var index = e.currentTarget.dataset['index']


        if (!this.data.matter[index]['goodFlag']) {
            this.data.matter[index]['goodFlag'] = !this.data.matter[index]['goodFlag']

            this.data.matter[index]['fleamarket_good'] = parseInt(this.data.matter[index]['fleamarket_good']) + 1


            var user_id = app.user['id']
            var info_id = this.data.matter[index]['fleamarket_id']

            home.good(user_id, info_id, function(res) {

                that.data.matter[index]['goodid'] = res.msg['good_id']


                that.setData({
                    matter: that.data.matter
                })

            })

        } else {

            //删除点赞数据
            var id = this.data.matter[index]['goodid']
            this.data.matter[index]['goodFlag'] = !this.data.matter[index]['goodFlag']

            this.data.matter[index]['fleamarket_good'] = parseInt(this.data.matter[index]['fleamarket_good']) - 1

            home.delGood(id, function(res) {
                that.setData({
                    matter: that.data.matter
                })

            })
        }
    },

    // 收藏
    coller: function(e) {
        //点赞
        var that = this
        var index = e.currentTarget.dataset['index']


        if (!this.data.matter[index]['collectFlag']) {
            this.data.matter[index]['collectFlag'] = !this.data.matter[index]['collectFlag']

            var user_id = app.user['id']
            var info_id = this.data.matter[index]['fleamarket_id']

            home.coller(user_id, info_id, function(res) {

                that.data.matter[index]['collectid'] = res.msg['collect_id']


                that.setData({
                    matter: that.data.matter
                })

            })

        } else {

            //删除点赞数据
            var id = this.data.matter[index]['collectid']
            this.data.matter[index]['collectFlag'] = !this.data.matter[index]['collectFlag']

            home.delColler(id, function(res) {
                that.setData({
                    matter: that.data.matter
                })

            })
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
        var cateid = this.data.cateid
        this.getAllFm(this.data.cateid, this.data.pStart, this.data.limit, function() {
            that.refreshView.stopPullRefresh()
        })

        this.setonReachBottom(true)

    },

    onShareAppMessage: function() {
        return {
            title: '猿周率',
            path: '/pages/fleamarket/home/home?share=' + true
        }
    },

    //登录
    getUserInfo: function(e) {
        var that = this

        app.shareLogin(this, e, function() {
            var cateid = ''


            that.getAllFm(cateid, that.data.pStart, that.data.limit)
        })


    },






})