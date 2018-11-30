import {
    Base
} from '../../utils/base.js'
import {
    Login
} from '../../utils/login.js'
import {
    Index
} from 'index-model.js'

var login = new Login()

var app = new getApp()

var index = new Index()

Page({
    data: {
        imgUrls: [],
        orderOrBusiness: 'order',
        newsarr: [{
                id: 0,
                message: "检查网线、调制解调器和路由器检查网线、调制解调器和路由器"
            },
            {
                id: 1,
                message: "请试试以下办法：请试试以下办法：请试试以下办法："
            },
            {
                id: 2,
                message: "请试试以下办法"
            },
            {
                id: 3,
                message: "请试试以下办法请试试以下办法"
            },
            {
                id: 4,
                message: "请试试以下请试试以下办法"
            }
        ],
        indicatorDots: true,
        autoplay: true,
        autoplay1: true,
        interva: 4000,
        interval: 5000,
        interva2: 3000,
        duration: 500,
        vertical: true,
        circular: true,
        gg: [],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        user: null,
        userInfo: {
            imageUrl: '',
            user_name: '',
            gender: '',
        },
        fmdata: null,
        recruit: null,
        job: null,
        pStart: 1,
        limit: 5,
        pageFlag: false,
    },



    bind_fleamarket: function() {
        wx.navigateTo({
            url: '/pages/fleamarket/home/home',
        })
    },
    bind_fleamarket_details: function(e) {
        var id = e.currentTarget.dataset['id']
        wx.navigateTo({
            url: '/pages/fleamarket/details/details?id=' + id
        })
    },
    bind_parttimejob: function() {
        wx.navigateTo({
            url: '/pages/parttimejob/home/home',
        })
    },
    bind_parttimejob_details: function(e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/parttimejob/details/details?job_id=' + id
        })
    },
    bind_personal_personal: function(e) {
        app.jump(e)
    },
    bind_enterprise: function() {
        wx.navigateTo({
            url: '/pages/enterprise/home/home',
        })
    },
    bind_enterprise_details: function(e) {
        var id = e.currentTarget.dataset.id;
        console.log(id)
        wx.navigateTo({
            url: '/pages/enterprise/details/details?recruit_id=' + id
        })
    },
    bind_enterprise_personal: function(e) {

        app.jump(e)
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

    // 公告
    notice: function() {
        wx.navigateTo({
            url: '/pages/notice/home/home',
        })
    },

    onLoad: function() {
        this.refreshView = this.selectComponent("#refreshView")

        var that = this

        app.login(that, function() {
            that.getFm()
            that.getRecruit()
            that.getJob()
            that.getBanner()
            that.getNotice()
            that.getGG()
        })

        this.setonReachBottom(true)


    },
    //获取跳蚤数据
    getFm: function() {
        var that = this
        index.getFm(function(res) {
            that.setData({
                fmdata: res
            })
        })
    },
    //获取企业招聘数据
    getRecruit: function() {
        var that = this
        index.getrRecruit(function(res) {
            that.setData({
                recruit: res
            })
        })
    },
    //获取兼职数据
    getJob: function(fn) {
        var that = this
        index.getJob(function(res) {

            if (res.length > 0) {
                if (that.data.pStart > 1) {
                    var res = that.data.job.concat(res)
                    that.setData({
                        job: res
                    })
                } else {
                    that.setData({
                        job: res
                    })
                }

            } else {
                that.setData({
                    pStart: 1,
                    pageFlag: true,
                })

                that.setonReachBottom(false)
            }

            wx.stopPullDownRefresh()

            fn && fn()

        }, that)
    },

    //获取轮播图数据
    getBanner: function() {
        var that = this;
        index.getBannerData((res) => {
            that.setData({
                imgUrls: res
            })
        })
    },
    //通知
    getNotice: function() {
        var that = this;
        index.getNoticeData((res) => {
            that.setData({
                newsarr: res
            })
        })
    },

    //获取广告数据
    getGG: function() {
        var that = this;
        index.getGG((res) => {
            that.setData({
                gg: res
            })
        })
    },


    //上拉触底
    onReachBottom: function() {
        this.data.pStart = this.data.pStart + 1

        this.setData({
            pStart: this.data.pStart
        })

        this.setonReachBottom(true)

    },

    //设置上拉触底方法 默认为上拉加载新数据，当数据加载完毕后，上拉触底方法不再加载数据
    setonReachBottom: function(flag) {
        if (flag == true) {
            this.onReachBottom = function() {
                this.data.pStart = this.data.pStart + 1

                this.setData({
                    pStart: this.data.pStart
                })


                this.getJob()


            }
        } else {
            this.onReachBottom = function() {}
        }

    },


    changeData: function() {

    },



    //触摸开始
    handletouchstart: function (event) {
        this.refreshView.handletouchstart(event)
    },
    //触摸移动
    handletouchmove: function (event) {
        this.refreshView.handletouchmove(event)
    },
    //触摸结束
    handletouchend: function (event) {
        this.refreshView.handletouchend(event)
    },
    //触摸取消
    handletouchcancel: function (event) {
        this.refreshView.handletouchcancel(event)
    },
    //页面滚动
    onPageScroll: function (event) {
        this.refreshView.onPageScroll(event)
    },
    _pullState: function (event) {
       
    },

    onPullDownRefresh: function() {
        var that = this
        var where = this.data.where
        this.getFm()
        this.getRecruit()
        this.getJob(function(){
            that.refreshView.stopPullRefresh()
            
        })

        this.setData({
            pageFlag: false
        })

        this.setonReachBottom(true)

        
        

    },

    onShareAppMessage: function () {
        return {
            title: '猿周率',
            path: '/pages/index/index'
        }
    }


})