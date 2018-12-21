// pages/market/market.js
import {
    Home
} from 'home-model.js';
var app = getApp();
var home = new Home();
Page({
    data: {
        navData: [],
        currentTab: 0,
        tabData: 0,
        navScrollLeft: 0,
        releaseFocus: true,
        reply: true,
        list_rows: 5,
        page: 1,
        homeData: null,

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(option) {
        var that = this
        app.getW(this)
        this.refreshView = this.selectComponent("#refreshView")

        if (option.share) {
            this.setData({
                share: option.share
            })
            app.share(this, function(flag) {
                if (flag) {
                    that._loadData();
                }

            })
        } else {
            if (app.user) {
                this._loadData();
            }
        }


    },

    onShow: function() {
        if (!this.data.share) {
            app.checkUser()
        }
    },

    //加载数据
    _loadData: function() {
        //获取分类数据
        home.getTypeData((data) => {
            var nav = [{
                type_id: 0,
                type_name: "全部"
            }];
            var a = nav.concat(data);
            this.setData({
                navData: a
            })
        });
        this.loadHomeData()
    },
    //获取内容
    loadHomeData: function(fn, data) {
        var that = this;
        var tab = this.data.tabData;
        var list_rows = this.data.list_rows;
        var page = this.data.page;
        var url = 'recruit/getHomeData?tab=' + tab + '&list=' + list_rows + '&page=' + page;
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
                that.setonReachBottom(true)

            } else {

                if (this.data.homeData.length > 0) {
                    if (tab && this.data.homeData) {
                        if (tab != that.data.homeData[0]['companytype']['type_id']) {
                            that.setData({
                                homeData: res,
                                page: 1,
                            })
                        } else {
                            that.setData({
                                page: 1,
                            })
                        }
                    } else {
                        that.setData({
                            page: 1,
                        })
                    }
                }
                that.setonReachBottom(false)
            }

            wx.stopPullDownRefresh()

            fn && fn()

        })
    },
    // 收起全部
    check: function(e) {
        var index = e.currentTarget.dataset.index;
        this.data.homeData[index].checked = !this.data.homeData[index].checked
        this.setData({
            homeData: this.data.homeData
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

            this.data.homeData[index]['recruit_good'] = parseInt(this.data.homeData[index]['recruit_good']) + 1


            var user_id = app.user['id']
            var info_id = this.data.homeData[index]['recruit_id']

            home.good(user_id, info_id, function(res) {
                that.data.homeData[index]['goodid'] = res.msg['good_id']
                that.setData({
                    homeData: that.data.homeData
                })

                // that.getCircle(that.data.where, that.data.pStart, that.data.limit)
            })
        } else {
            var id = this.data.homeData[index]['goodid']
            this.data.homeData[index]['goodFlag'] = !this.data.homeData[index]['goodFlag']

            this.data.homeData[index]['recruit_good'] = parseInt(this.data.homeData[index]['recruit_good']) - 1

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
            var info_id = this.data.homeData[index]['recruit_id']

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
    // 导航条
    switchNav(event) {
        var cur = event.currentTarget.dataset.current;
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
                tabData: this.data.navData[cur].type_id,
                page: 1
            })
            this.loadHomeData();
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
                //   title: '没有更多数据了！',
                // })
            }
        }

    },

    // 页面跳转
    append: function() {
        if (!app.user.company || app.user.company_id == 0 || app.user.company.company_state != 2) {
            wx.showModal({
                title: '提示',
                showCancel: false, //是否显示取消按钮
                content: '此功能只对企业开放！请前往个人中心进行企业认证。',
                success: function(res) {
                    if (res.confirm) {
                        wx.switchTab({
                            url: '/pages/personal/personal'
                        })
                    }
                }
            })
        } else {
            wx.navigateTo({
                url: '/pages/enterprise/release/release',
            })
        }

    },
    userimg: function(e) {
        app.jump(e)
    },
    bind_market_details: function(e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/enterprise/details/details?recruit_id=' + id
        })
    },
    bind_market_search: function() {
        wx.navigateTo({
            url: '/pages/enterprise/search/search'
        })
    },


    //刷新
    changeData: function(data) {
        var that = this
        if (data) {
            that.data.homeData.forEach(function(item, index) {
                if (item.recruit_id == data.recruit_id) {

                    var old = that.data.homeData[index]

                    that.data.homeData[index] = data

                    that.data.homeData[index].checked = old['checked']


                    that.setData({
                        homeData: that.data.homeData
                    })
                }
            })

        } else {
            this.setData({
                page: 1
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
            path: 'pages/enterprise/home/home?share=' + true,
        }
    },

    //登录
    getUserInfo: function(e) {
        var that = this

        app.shareLogin(this, e, function() {
            that._loadData();
        })

    },


})