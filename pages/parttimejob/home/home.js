// pages/parttimejob/home/home.js
import {
    Home
} from 'home-model.js';
var app = getApp();
var home = new Home();

Page({
    data: {
        list_rows: 5,
        page: 1,
        releaseFocus: true,
        reply: true,
    },

    userimg: function(e) {
        app.jump(e)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(option) {
        var that = this
        this.refreshView = this.selectComponent("#refreshView")

        if (option.share) {
            this.setData({
                share: option.share
            })
            app.share(this, function(flag) {
                if (flag) {
                    that.loadHomeData();
                }
            })

        } else {
            if (app.user) {
                this.loadHomeData();
            }
        }

    },

    onShow: function() {
        if (!this.data.share) {
            app.checkUser()
        }
    },

    // 收起全部
    check: function(e) {
        console.log(e)
        var index = e.currentTarget.dataset.index;
        this.data.homeData[index].checked = !this.data.homeData[index].checked
        this.setData({
            homeData: this.data.homeData
        })
    },

    //获取内容
    loadHomeData: function(fn, data) {
        var that = this;
        var list_rows = this.data.list_rows;
        var page = this.data.page;
        var url = 'job/getJobData?list=' + list_rows + '&page=' + page;
        home.getHomeData(url, (res) => {
            if (res.length > 0) {
                if (that.data.page > 1) {

                    var res = that.data.homeData.concat(res)
                    that.setData({
                        homeData: res
                    })

                } else {

                    that.setData({
                        homeData: res
                    })

                }

            } else {
                that.setData({
                    page: 1
                })

                that.setonReachBottom(false)
            }

            wx.stopPullDownRefresh()
            fn && fn()

        })
    },

    // 预览图片
    img: function(e) {
        var url = e.currentTarget.dataset['imgurl'];
        var imgurls = e.currentTarget.dataset['imgurls'];

        var urls = [];

        imgurls.forEach(function(item) {
            urls.push(item.img_url)
        })

        wx.previewImage({
            current: url,
            urls: urls // 需要预览的图片http链接列表
        })
    },

    // 点赞
    good: function(e) {
        var that = this
        var index = e.currentTarget.dataset['index']

        if (!this.data.homeData[index]['goodFlag']) {
            this.data.homeData[index]['goodFlag'] = !this.data.homeData[index]['goodFlag']

            this.data.homeData[index]['job_good'] = parseInt(this.data.homeData[index]['job_good']) + 1


            var user_id = app.user['id']
            var info_id = this.data.homeData[index]['job_id']

            home.good(user_id, info_id, function(res) {
                that.data.homeData[index]['goodid'] = res.msg['good_id']
                that.setData({
                    homeData: that.data.homeData
                })

            })
        } else {
            var id = this.data.homeData[index]['goodid']
            this.data.homeData[index]['goodFlag'] = !this.data.homeData[index]['goodFlag']

            this.data.homeData[index]['job_good'] = parseInt(this.data.homeData[index]['job_good']) - 1

            home.delGood(id, function(res) {
                that.setData({
                    homeData: that.data.homeData
                })
                // that.getCircle(that.data.where, that.data.pStart, that.data.limit)

            })
        }
    },

    // 收藏
    coller: function(e) {
        var that = this
        var index = e.currentTarget.dataset['index']
        if (!this.data.homeData[index]['collectFlag']) {
            this.data.homeData[index]['collectFlag'] = !this.data.homeData[index]['collectFlag']

            var user_id = app.user['id']
            var info_id = this.data.homeData[index]['job_id']

            home.coller(user_id, info_id, function(res) {
                that.data.homeData[index]['collectid'] = res.msg['collect_id']
                that.setData({
                    homeData: that.data.homeData
                })

            })
        } else {
            var id = this.data.homeData[index]['collectid']
            this.data.homeData[index]['collectFlag'] = !this.data.homeData[index]['collectFlag']

            home.delColler(id, function(res) {
                that.setData({
                    homeData: that.data.homeData
                })

            })
        }
    },

    //上拉触底 加载数据
    onReachBottom: function() {
        this.data.page = this.data.page + 1

        this.setData({
            page: this.data.page
        })

        this.loadHomeData();

    },
    //设置下拉事件
    setonReachBottom: function(flag) {
        if (flag) {
            this.onReachBottom = function() {
                this.data.page = this.data.page + 1

                this.setData({
                    page: this.data.page
                })

                this.loadHomeData();

            }
        } else {
            this.onReachBottom = function() {
                // wx.showToast({
                //     title: '没有更多数据了！',
                //     image: '/image/noneData.png',
                // })
            }
        }

    },

    // 页面跳转
    append: function() {
        wx.navigateTo({
            url: '/pages/parttimejob/release/release',
        })
    },

    bind_market_details: function(e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/parttimejob/details/details?job_id=' + id
        })
    },

    changeData: function(data) {
        var that = this
        if (data) {

            that.data.homeData.forEach(function(item, index) {
                if (item.job_id == data.job_id) {
                    that.data.homeData[index] = data
                    that.setData({
                        homeData: that.data.homeData
                    })
                }
            })



        } else {
            this.setData({
                page: 1,
            })

            this.loadHomeData() 
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

        this.setData({
            page: 1
        })
        this.loadHomeData(function() {
            that.refreshView.stopPullRefresh()

        });

        this.setonReachBottom(true)



    },

    onShareAppMessage: function() {
        return {
            path: 'pages/parttimejob/home/home?share=' + true,
        }
    },

    //登录
    getUserInfo: function(e) {
        var that = this

        app.shareLogin(this, e, function() {
            that.loadHomeData();
        })

    },
})