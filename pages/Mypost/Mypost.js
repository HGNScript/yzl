// pages/Mypost/Mypost.js
import {
    Mypost
} from 'Mypost-model.js'
var mypost = new Mypost()
import {
    Home
} from '../circle/home/home-model.js'

var home = new Home()
var app = getApp()

Page({
    data: {
        navbar: ['小猿圈', '跳蚤市场', '企业招聘', '我要兼职'],
        currentTab: 0,
        pStart: 1,
        limit: 5,
        CircleMy: [],
        Fleamarket: [],
        Recruit: [],
        allMyJob: []
    },
    // --导航条--
    navbarTap: function(e) {
        this.setData({
            currentTab: e.currentTarget.dataset.idx,
        })
        if (this.data.currentTab == 0) {
            this.setData({
                pStart: 1,
                CircleMy: []
            })
            this.allCircle();
        }
        if (this.data.currentTab == 1) {
            this.setData({
                pStart: 1,
                Fleamarket: []
            })
            this.allFleamarket();
        }
        if (this.data.currentTab == 2) {
            this.setData({
                pStart: 1,
                Recruit: []
            })
            this.allRecruit();
        }
        if (this.data.currentTab == 3) {
            this.setData({
                pStart: 1,
                allMyJob: []
            })
            this.allMyJob();

        }


    },
    onShow: function(){
        var that = this
        app.checkUser(function(){
            if (that.data.currentTab == 0) {
                that.allCircle()
            }

            that.setData({
                user: app.user
            })
        })
    },
    //跳蚤 内容详情
    detailed: function(e) {
        var id = e.currentTarget.dataset.id

        wx.navigateTo({
            url: '/pages/fleamarket/details/details?id=' + id
        })
    },
    //小圆圈内容详情
    post: function(e) {
        var id = e.currentTarget.id

        wx.navigateTo({
            url: '/pages/circle/detailed/detailed?id=' + id,
        })
    },

    //调用Model方法绑定小圆圈数据
    allCircle: function() {
        var pStart = this.data.pStart
        var limit = this.data.limit
        var id = app.user['id']
        var url = 'Mypost/allCircle/' + id + '?pStart=' + pStart + '&limit=' + limit
        var that = this
        mypost.allMypost(url, id, function(res) {
            if(res) {
                if (res.length > 0) {
                    if (that.data.pStart > 1) {
                        var res = that.data.CircleMy.concat(res)
                        that.setData({
                            CircleMy: res
                        })
                    } else {
                        that.setData({
                            CircleMy: res
                        })
                    }
                    that.setonReachBottom(true)
                    
                } else {
                    if (that.data.pStart > 1) {
                        that.setData({
                            pStart: 1
                        })
                    } else {
                        that.setData({
                            CircleMy: res
                        })
                    }

                }
                wx.stopPullDownRefresh()
            } else {
                if (that.data.pStart > 1) {
                    that.setData({
                        pStart: 1
                    })
                } else {
                    that.setData({
                        CircleMy: res
                    })
                }
                that.setonReachBottom(false)
                
            }
        })
    },
    //调用Model方法绑定企业数据
    allRecruit: function() {
        var id = app.user['id']
        var that = this
        var pStart = this.data.pStart
        var limit = this.data.limit
        var url = 'Mypost/allRecruit/' + id + '?pStart=' + pStart + '&limit=' + limit
        mypost.allMypost(url, id, function(res) {
            if (res) {
                if (res.length > 0) {
                    if (that.data.pStart > 1) {
                        var res = that.data.Recruit.concat(res)
                        that.setData({
                            Recruit: res
                        })
                    } else {
                        that.setData({
                            Recruit: res
                        })
                    }
                    that.setonReachBottom(true)
                    
                } else {
                    if (that.data.pStart > 1) {
                        that.setData({
                            pStart: 1
                        })
                    } else {
                        that.setData({
                            Recruit: res
                        })
                    }

                }
                wx.stopPullDownRefresh()
            } else {
                if (that.data.pStart > 1) {
                    that.setData({
                        pStart: 1
                    })
                } else {
                    that.setData({
                        Recruit: res
                    })
                }
                that.setonReachBottom(false)

            }

        })
    },
    //调用Model方法绑定跳蚤据
    allFleamarket: function() {
        var pStart = this.data.pStart
        var limit = this.data.limit
        var id = app.user['id']
        var url = 'Mypost/allFleamarket/' + id + '?pStart=' + pStart + '&limit=' + limit
        var that = this
        mypost.allMypost(url, id, function(res) {
            if (res) {
                if (res.length > 0) {
                    if (that.data.pStart > 1) {
                        var res = that.data.Fleamarket.concat(res)
                        that.setData({
                            Fleamarket: res
                        })
                    } else {
                        that.setData({
                            Fleamarket: res
                        })
                    }
                    
                    that.setonReachBottom(true)
                    
                } else {
                    if (that.data.pStart > 1) {
                        that.setData({
                            pStart: 1
                        })
                    } else {
                        that.setData({
                            Fleamarket: res
                        })
                    }

                }
                wx.stopPullDownRefresh()
            } else {
                if (that.data.pStart > 1) {
                    that.setData({
                        pStart: 1
                    })
                } else {
                    that.setData({
                        Fleamarket: res
                    })
                }
                that.setonReachBottom(false)

            }


        })
    },
    //调用Model方法兼职数据
    allMyJob: function() {
        var id = app.user['id']
        var pStart = this.data.pStart
        var limit = this.data.limit
        var id = app.user['id']
        var url = 'Mypost/allJob/' + id + '?pStart=' + pStart + '&limit=' + limit
        var that = this
        mypost.allMypost(url, id, function(res) {
            if(res) {
                if (res.length > 0) {
                    if (that.data.pStart > 1) {
                        var res = that.data.allMyJob.concat(res)
                        that.setData({
                            allMyJob: res
                        })
                    } else {
                        that.setData({
                            allMyJob: res
                        })
                    }

                } else {
                    if (that.data.pStart > 1) {
                        that.setData({
                            pStart: 1
                        })
                    } else {
                        that.setData({
                            allMyJob: res
                        })
                    }

                    that.setonReachBottom(true)
                }
                wx.stopPullDownRefresh()
            } else {
                if (that.data.pStart > 1) {
                    that.setData({
                        pStart: 1
                    })
                } else {
                    that.setData({
                        allMyJob: res
                    })
                }
                that.setonReachBottom(false)

            }
            

        })
    },

    // 删除小圆圈
    delCircleMy: function (e) {
        var that = this
        var id = e.currentTarget.id
        var index = e.currentTarget.dataset.index
        var url = 'Mypost/delCircle'
        wx.showModal({
            title: '提示',
            content: '是否要删除该帖子！',
            success: function (res) {
                if (res.confirm) {
                    mypost.delMypost(url, id, function (res) {
                        that.data.CircleMy.splice(index, 1)
                        that.setData({
                            CircleMy: that.data.CircleMy
                        })
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    //删除跳蚤数据
    delFleamarket: function(e) {
        var that = this
        var id = e.currentTarget.id
        var index = e.currentTarget.dataset.index
        
        var url = 'Mypost/delFleamarket'
        wx.showModal({
            title: '提示',
            content: '是否要删除该帖子！',
            success: function(res) {
                if (res.confirm) {
                    mypost.delMypost(url, id, function(res) {
                        that.data.Fleamarket.splice(index, 1)
                        that.setData({
                            Fleamarket: that.data.Fleamarket
                        })
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //删除企业数据
    delRecruit: function(e) {
        var that = this
        var id = e.currentTarget.id
        var index = e.currentTarget.dataset.index
        
        var url = 'Mypost/delRecruit'
        wx.showModal({
            title: '提示',
            content: '是否要删除该帖子！',
            success: function(res) {
                if (res.confirm) {
                    mypost.delMypost(url, id, function(res) {
                        that.data.Recruit.splice(index, 1)
                        that.setData({
                            Recruit: that.data.Recruit
                        })
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //删除兼职数据
    delJob: function(e) {
        var that = this
        var id = e.currentTarget.id
        var index = e.currentTarget.dataset.index

        var url = 'Mypost/delJob'
        wx.showModal({
            title: '提示',
            content: '是否要删除该帖子！',
            success: function(res) {
                if (res.confirm) {
                    mypost.delMypost(url, id, function(res) {
                        that.data.allMyJob.splice(index, 1)
                        that.setData({
                            allMyJob: that.data.allMyJob
                        })
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },


    //刷新上一级页面数据
    changeParentData: function() {
        var pages = getCurrentPages(); //当前页面栈
        if (pages.length > 1) {
            var beforePage = pages[pages.length - 0]; //获取上一个页面实例对象
            beforePage.changeData(); //触发父页面中的方法
        }
    },
    //父页面刷新
    changeData: function() {
        this.onLoad();
    },
    //跳转
    bind_market_details: function(e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/enterprise/details/details?recruit_id=' + id
        })
    },
    //跳转
    JobUrl: function(e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/parttimejob/details/details?job_id=' + id
        })
    },

    //下拉刷新
    onPullDownRefresh: function() {
        var id = this.data.currenttab
        if (this.data.currentTab == 0) {
            this.allCircle(this.data.id, this.data.pStart, this.data.limit)
        }
        if (this.data.currentTab == 1) {
            this.allFleamarket(this.data.id, this.data.pStart, this.data.limit)
        }
        if (this.data.currentTab == 2) {
            this.allRecruit(this.data.id, this.data.pStart, this.data.limit)
        }
        if (this.data.currentTab == 3) {
            this.allMyJob(this.data.id, this.data.pStart, this.data.limit)
        }

        this.setonReachBottom(true)


    },

    //上拉触底 加载数据
    onReachBottom: function() {
        this.data.pStart = this.data.pStart + 1

        this.setData({
            pStar: this.data.pStart
        })

        if (this.data.currentTab == 0) {
            this.allCircle(this.data.id, this.data.pStart, this.data.limit)
        }
        if (this.data.currentTab == 1) {
            this.allFleamarket(this.data.id, this.data.pStart, this.data.limit)
        }
        if (this.data.currentTab == 2) {
            this.allRecruit(this.data.id, this.data.pStart, this.data.limit)
        }
        if (this.data.currentTab == 3) {
            this.allMyJob(this.data.id, this.data.pStart, this.data.limit)
        }

    },


    //设置下拉事件
    setonReachBottom: function(flag) {
        if (flag) {
            this.onReachBottom = function() {
                this.data.pStart = this.data.pStart + 1

                this.setData({
                    pStart: this.data.pStart
                })
                if (this.data.currentTab == 0) {
                    this.allCircle(this.data.id, this.data.pStart, this.data.limit)
                }
                if (this.data.currentTab == 1) {
                    this.allFleamarket(this.data.id, this.data.pStart, this.data.limit)
                }
                if (this.data.currentTab == 2) {
                    this.allRecruit(this.data.id, this.data.pStart, this.data.limit)
                }
                if (this.data.currentTab == 3) {
                    this.allMyJob(this.data.id, this.data.pStart, this.data.limit)
                }

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
})