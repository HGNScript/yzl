// pages/Mycollection/Mycollection.js
var app = getApp()
import {
    Mycollection
} from 'Mycollection-model.js'
var mycollection = new Mycollection()

import {
    Home
} from '../../pages/circle/home/home-model.js'

var home = new Home()

var app = getApp()
Page({
    data: {
        navbar: ['跳蚤市场', '企业招聘', '我要兼职'],
        currentTab: 0,
        pStart: 1,
        limit: 5,
        Mycollection: []
    },
    // --导航条--
    navbarTap: function(e) {
        var that = this
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        })
        if (this.data.currentTab == 0) {
            this.setData({
                pStar: 1,
                Mycollection: []
            })
            this.allFleamarket()
            
        }
        if (this.data.currentTab == 1) {
            this.setData({
                pStar: 1,
                Mycollection: []
            })
            this.allrecruit()
            
        }
        if (this.data.currentTab == 2) {
            this.setData({
                pStar: 1,
                Mycollection: []
            })
            this.allJob()
            
        }

        this.onPullDownRefresh()
        


    },
    // 内容详情
    post: function(e) {
        var id = e.currentTarget.dataset.id

        wx.navigateTo({
            url: '/pages/fleamarket/details/details?id=' + id
        })
    },

    post1: function(e) {
        var id = e.currentTarget.dataset.id

        wx.navigateTo({
            url: '/pages/enterprise/details/details?recruit_id=' + id
        })
    },

    post2: function(e) {
        var id = e.currentTarget.dataset.id

        wx.navigateTo({
            url: '/pages/parttimejob/details/details?job_id=' + id
        })
    },


    // 用户信息
    user: function(e) {
        app.jump(e)
    },
    //获取跳蚤收藏数据
    allFleamarket: function(data) {
        var pStart = this.data.pStart
        var limit = this.data.limit
        var id = app.user['id']
        var url = 'collect/getusercollect/' + id + '?pStart=' + pStart + '&limit=' + limit
        var that = this
        var infoType = 'fleamarket'
        mycollection.allMycollection(url, infoType, function(res) {
            if (res.length > 0) {
                if (that.data.pStart > 1) {
                    if (data) {
                        if (!data.collectFlag) {
                            that.data.Mycollection.forEach(function(item, index) {
                                if (item.fleamarket_id == data.fleamarket_id) {
                                    that.data.Mycollection.splice(index, 1)
                                    that.setData({
                                        Mycollection: that.data.Mycollection
                                    })
                                }
                            })
                        }
                    } else {
                        var res = that.data.Mycollection.concat(res)
                        that.setData({
                            Mycollection: res
                        })
                        that.setonReachBottom(true)
                        
                    }

                } else {
                    if (data) {

                        if (!data.collectFlag) {

                            that.data.Mycollection.forEach(function(item, index) {
                                if (item.fleamarket_id == data.fleamarket_id) {
                                    that.data.Mycollection.splice(index, 1)
                                    that.setData({
                                        Mycollection: that.data.Mycollection
                                    })
                                }
                            })

                        }
                    } else {
                        that.setData({
                            Mycollection: res
                        })
                        that.setonReachBottom(true)
                        
                    }

                }

            } else {
                if (that.data.pStart > 1) {
                    that.setData({
                        pStart: 1
                    })
                } else {
                    that.setData({
                        Mycollection: res
                    })
                }

                that.setonReachBottom(false)
            }


            wx.stopPullDownRefresh()

        })
    },
    //获取企业收藏数据
    allrecruit: function(data) {
        var pStart = this.data.pStart
        var limit = this.data.limit
        var id = app.user['id']
        var url = 'collect/getusercollect/' + id + '?pStart=' + pStart + '&limit=' + limit
        var that = this
        var infoType = 'recruit'
        mycollection.allMycollection(url, infoType, function(res) {
            if (res.length > 0) {
                if (that.data.pStart > 1) {

                    if (data) {
                        if (!data.collectFlag) {
                            that.data.Mycollection.forEach(function(item, index) {
                                if (item.recruit_id == data.recruit_id) {
                                    that.data.Mycollection.splice(index, 1)
                                    that.setData({
                                        Mycollection: that.data.Mycollection
                                    })
                                }
                            })

                        }
                    } else {
                        var res = that.data.Mycollection.concat(res)
                        that.setData({
                            Mycollection: res
                        })
                        that.setonReachBottom(true)
                        
                    }


                } else {
                    if (data) {

                        if (!data.collectFlag) {

                            that.data.Mycollection.forEach(function (item, index) {
                                if (item.recruit_id == data.recruit_id) {
                                    that.data.Mycollection.splice(index, 1)
                                    that.setData({
                                        Mycollection: that.data.Mycollection
                                    })
                                }
                            })

                        }
                    } else {
                        that.setData({
                            Mycollection: res
                        })
                        that.setonReachBottom(true)
                        
                    }
                }

            } else {
                if (that.data.pStart > 1) {
                    that.setData({
                        pStart: 1
                    })
                } else {
                    that.setData({
                        Mycollection: res
                    })
                }

                that.setonReachBottom(false)
            }

            wx.stopPullDownRefresh()

        })
    },
    //获取兼职收藏数据
    allJob: function(data) {
        var pStart = this.data.pStart
        var limit = this.data.limit
        var id = app.user['id']
        var url = 'collect/getusercollect/' + id + '?pStart=' + pStart + '&limit=' + limit
        var that = this
        var infoType = 'job'
        mycollection.allMycollection(url, infoType, function(res) {
            console.log(data)
            
            if (res.length > 0) {
                if (that.data.pStart > 1) {
                    if (data) {
                        if (!data.collectFlag) {
                            that.data.Mycollection.forEach(function (item, index) {
                                if (item.job_id == data.job_id) {
                                    that.data.Mycollection.splice(index, 1)
                                    that.setData({
                                        Mycollection: that.data.Mycollection
                                    })
                                }
                            })

                        }
                    } else {
                        var res = that.data.Mycollection.concat(res)
                        that.setData({
                            Mycollection: res
                        })
                        that.setonReachBottom(true)
                        
                    }
                    
                } else {
                    if (data) {

                        if (!data.collectFlag) {

                            that.data.Mycollection.forEach(function (item, index) {
                                if (item.job_id == data.job_id) {
                                    that.data.Mycollection.splice(index, 1)
                                    that.setData({
                                        Mycollection: that.data.Mycollection
                                    })
                                }
                            })

                        }
                    } else {
                        that.setData({
                            Mycollection: res
                        })
                        that.setonReachBottom(true)
                        
                    }
                    
                }

                

            } else {
                if (that.data.pStart > 1) {
                    that.setData({
                        pStart: 1
                    })
                } else {
                    that.setData({
                        Mycollection: res
                    })
                }

                that.setonReachBottom(false)
            }

            wx.stopPullDownRefresh()

        })
    },
    onLoad: function() {
        this.allFleamarket()
       
    },
    onShow: function() {
        var that = this
        app.checkUser(function() {

            that.setData({
                user: app.user
            })
        })
    },

    //删除收藏数据
    delect: function(e) {
        var that = this
        var id = e.currentTarget.id
        var index = e.currentTarget.dataset.index
        wx.showModal({
            title: '提示',
            content: '确定取消收藏该帖子！',
            success: function(res) {
                if (res.confirm && that.data.currentTab == 0) {
                    mycollection.delMycollection(id, function(res) {
                        console.log(index)
                        that.data.Mycollection.splice(index, 1)
                        that.setData({
                            Mycollection: that.data.Mycollection
                        })
                    })
                }
                if (res.confirm && that.data.currentTab == 1) {
                    mycollection.delMycollection(id, function(res) {
                        that.data.Mycollection.splice(index, 1)
                        that.setData({
                            Mycollection: that.data.Mycollection
                        })
                    })
                }
                if (res.confirm && that.data.currentTab == 2) {
                    mycollection.delMycollection(id, function(res) {
                        that.data.Mycollection.splice(index, 1)
                        that.setData({
                            Mycollection: that.data.Mycollection
                        })
                    })
                } else if (res.cancel) {}
            }
        })
    },


    //父页面刷新
    changeData: function(data) {
        if (this.data.currentTab == 0) {
            this.allFleamarket(data)
        } else if (this.data.currentTab == 1) {
            this.allrecruit(data)

        } else if (this.data.currentTab == 2) {
            this.allJob(data)
        }
    },



    //下拉刷新
    onPullDownRefresh: function() {
        var id = this.data.currenttab
        if (this.data.currentTab == 0) {
            this.allFleamarket(this.data.id, this.data.pStart, this.data.limit)
        }
        if (this.data.currentTab == 1) {
            this.allrecruit(this.data.id, this.data.pStart, this.data.limit)
        }
        if (this.data.currentTab == 2) {
            this.allJob(this.data.id, this.data.pStart, this.data.limit)
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
            this.allFleamarket(this.data.id, this.data.pStart, this.data.limit)
        }
        if (this.data.currentTab == 1) {
            this.allrecruit(this.data.id, this.data.pStart, this.data.limit)
        }
        if (this.data.currentTab == 2) {
            this.allJob(this.data.id, this.data.pStart, this.data.limit)
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
                    this.allFleamarket(this.data.id, this.data.pStart, this.data.limit)
                }
                if (this.data.currentTab == 1) {
                    this.allrecruit(this.data.id, this.data.pStart, this.data.limit)
                }
                if (this.data.currentTab == 2) {
                    this.allJob(this.data.id, this.data.pStart, this.data.limit)
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