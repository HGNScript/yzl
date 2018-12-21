import {
    Inde
} from 'inde-model.js'
var inde = new Inde()

const app = getApp()
Page({
    to: function(e) {
        wx.navigateTo({
            url: '../release/release',
        })
    },
    data: {
        imgUrls: [
            '../../../image/type-r.jpg',
            '../../../image/type-r.jpg',
            '../../../image/type-r.jpg',
        ],
        confessionAll: null,
        interval: 5000,
        duration: 1000,
        currenttab: 0,
        navbar: ['新鲜', '热门'],
        pStart: 1,
        limit: 5,
    },
    // --导航条--
    navbarTap: function(e) {

        this.setData({
            currenttab: e.currentTarget.dataset.ind
        })
        if (this.data.currenttab == 1) {
            this.getConfession()
        }
        if (this.data.currenttab == 0) {
            this.getConfession()
        }

    },
    // 选项卡
    menuTap: function(e) {
        var current = e.currentTarget.dataset.current; //获取到绑定的数据
        //改变menuTapCurrent的值为当前选中的menu所绑定的数据
        this.setData({
            menuTapCurrent: current
        });
    },
    // 点赞
    onLoad: function(option) {
        var that = this

        if (option.share) {
            this.setData({
                share: option.share
            })
            app.share(this, function(flag){
                if(flag){
                    that._loadData()
                }
            })
        }   else {

            if(app.user){
                this.refreshView = this.selectComponent("#refreshView")

                this._loadData()
            }
        }
        
    },

    onShow: function() {
        if (!this.data.share) {
            app.checkUser()
        }
    },

    good: function(e) {
        var that = this
        var index = e.currentTarget.dataset['index']
        if (!this.data.confessionAll[index]['goodFlag']) {
            this.data.confessionAll[index]['goodFlag'] = !this.data.confessionAll[index]['goodFlag']
            var user_id = app.user['id']
            this.data.confessionAll[index]['white_fabulous'] = parseInt(this.data.confessionAll[index]['white_fabulous']) + 1
            var info_id = this.data.confessionAll[index]['white_id']
            inde.good(user_id, info_id, function(res) {
                that.data.confessionAll[index]['goodid'] = res.msg['good_id']
                that.setData({
                    confessionAll: that.data.confessionAll
                })
            })
        } else {
            var id = this.data.confessionAll[index]['goodid']
            this.data.confessionAll[index]['goodFlag'] = !this.data.confessionAll[index]['goodFlag']
            this.data.confessionAll[index]['white_fabulous'] = parseInt(this.data.confessionAll[index]['white_fabulous']) - 1

            inde.delGood(id, function(res) {
                that.setData({
                    confessionAll: that.data.confessionAll
                })
            })
        }
    },



    //执行表白墙获取数据
    _loadData: function() {
        this.getConfession()
    },

    getConfession: function(fn) {
        var id = this.data.currenttab
        var url = 'whw/allwall/'
        var pStart = this.data.pStart
        var limit = this.data.limit
        var url = 'whw/allwall?id=' + id + '&pStart=' + pStart + '&limit=' + limit

        var that = this
        inde.Confession(url, function(res) {
            if (res.length > 0) {
                if (that.data.pStart > 1) {
                    var res = that.data.confessionAll.concat(res)
                    that.setData({
                        confessionAll: res
                    })
                } else {
                    that.setData({
                        confessionAll: res
                    })
                }

            } else {
                that.setData({
                    pStart: 1
                })

                that.setonReachBottom(false)
            }

            wx.stopPullDownRefresh()
            fn&& fn()
        })
    },

    changeData() {
        this.setData({
            pStart: 1,    
        })
        this.onLoad({'share': false})
    },

    //上拉触底 加载数据
    onReachBottom: function() {
        this.data.pStart = this.data.pStart + 1

        this.setData({
            pStar: this.data.pStart
        })

        this.getConfession()

    },

    //设置下拉事件
    setonReachBottom: function(flag) {
        if (flag) {
            this.onReachBottom = function() {
                this.data.pStart = this.data.pStart + 1

                this.setData({
                    pStar: this.data.pStart
                })

                this.getConfession()

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



    Dj: function(e) {
        var ImgUrl = [e.currentTarget.dataset.url]
        wx.previewImage({
            current: ImgUrl, //当前图片地址
            urls: ImgUrl, //所有要预览的图片的地址集合 数组形式
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
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

        var id = this.data.currenttab
        this.getConfession(function(){
            that.refreshView.stopPullRefresh()
            
        })

        this.setonReachBottom(true)


    },

    onShareAppMessage: function () {
        return {
            path: 'pages/Confession/index/inde?share=' + true,
        }
    },

    //登录
    getUserInfo: function (e) {
        var that = this

        app.shareLogin(this, e, function () {
            that._loadData()
        })

    },

})