// pages/sx_teacher/survey/survey.js

import {
    Survey
} from 'survey-model.js'

var survey = new Survey()

var app = getApp();
var wxCharts = require("../../../utils/wxcharts.js");
var windowW = 0;
Page({
    data: {
        bigwidtn: false,
        tchData: null,

        sum: null,

        //签到
        signin: {
            y: null,
            n: null,
        },

        //日志
        logs: {
            y: null,
            n: null,
        },

        //实习
        company: {
            y: null,
            n: null,
        },

        //对口
        identical: {
            y: null,
            n: null,
        },

        start: 1,
        limit: 4,

        changeData: [],
        pageflag: true,



    },

    // classbtn
    classbtn: function() {
        this.setData({
            bigwidtn: !this.data.bigwidtn
        })
    },

    // 图表只适应屏幕
    onLoad: function(options) {
        // 屏幕宽度
        this.setData({
            imageWidth: wx.getSystemInfoSync().windowWidth
        });
        //计算屏幕宽度比列
        windowW = this.data.imageWidth / 375;

        this.setData({
            tch_id: app.user.tch_id,
            tch_type: app.user.tch_type,
        })

        var that = this
        this.getTchData(function() {
            that.getPracticeData()

        })

        this.getChange()

    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

        if (!app.user.tch_id || app.user.tch_type != "practice") {
            wx.showModal({
                title: '提示',
                showCancel: false, //是否显示取消按钮
                content: '此功能只对实习教师开放，请前往个人中心进行教师认证',
                success: function(res) {
                    if (res.confirm) {
                        wx.switchTab({
                            url: '/pages/personal/personal'
                        })
                    }
                }
            })
        }


    },

    //获取教师数据
    getTchData: function(fn) {
        var that = this
        survey.getTchInfo(that, function(res) {
            that.setData({
                tchData: res
            })

            fn()
        })
    },

    getPracticeData: function() {
        var that = this
        survey.getPracticeData(that, function(res) {

            var sum = res.company.length

            var companyY = 0

            var identicalY = 0

            res.company.forEach(function(item) {
                if (item.company) {
                    companyY++
                }

                if (item.company && item.company['company_identical'] == '是') {
                    identicalY++
                }
            })

            that.data.signin = {
                y: res.signIn,
                n: sum - res.signIn
            }

            that.data.logs = {
                y: res.logs,
                n: sum - res.logs
            }

            that.data.company = {
                y: companyY,
                n: sum - companyY
            }

            that.data.identical = {
                y: identicalY,
                n: sum - identicalY
            }

            that.setData({
                signin: that.data.signin,
                logs: that.data.logs,
                company: that.data.company,
                identical: that.data.identical,
                sum: sum,
            })


            that.wxCharts()
        })
    },


    //渲染条形图
    wxCharts: function() {
        var that = this
        new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            categories: ['实习', '签到', '日志', '对口'],
            series: [{
                    name: '(已实习，已签到，已填写日志，专业对口)',
                    data: [
                        app.percentage(that.data.company.n, that.data.sum),
                        app.percentage(that.data.signin.n, that.data.sum),
                        app.percentage(that.data.logs.n, that.data.sum),
                        app.percentage(that.data.identical.n, that.data.sum)
                    ],
                    format: function(val) {
                        return parseInt(val) + '%-' + Math.round(val / 100 * that.data.sum ) + '人';
                    },
                },

                {
                    name: '(未实习，未签到，未填写日志，专业不对口)',
                    data: [
                        100 - app.percentage(that.data.company.n, that.data.sum),
                        100 - app.percentage(that.data.signin.n, that.data.sum),
                        100 - app.percentage(that.data.logs.n, that.data.sum),
                        100 - app.percentage(that.data.identical.n, that.data.sum)
                    ],
                    format: function(val) {
                        return parseInt(val) + '%-' + Math.round(val / 100 * that.data.sum) + '人';
                    },

                }
            ],
            width: (375 * windowW),
            height: (200 * windowW),
        });
    },

    //获取变更数据
    getChange: function(){
        var that = this
        survey.getChange(this, function(res){
            if (res.length > 0) {
                if (that.data.start > 1) {
                    var res = that.data.changeData.concat(res)
                    that.setData({
                        changeData: res
                    })
                } else {
                    that.setData({
                        changeData: res
                    })
                }

            } else {
                that.setData({
                    Start: 1,
                    pageflag: false
                })

                that.setonReachBottom(false)
            }

        })
    },

    //上拉加载数据
    onReachBottom: function () {
        this.setData({
            pStart: this.data.pStart + 1
        })

        this.setonReachBottom(true)

    },

    //设置上拉触底方法 默认为上拉加载新数据，当数据加载完毕后，上拉触底方法不再加载数据
    setonReachBottom: function (flag) {
        if (flag == true) {
            this.onReachBottom = function () {

                this.setData({
                    start: this.data.start + 1
                })


                this.getChange()


            }
        } else {
            this.onReachBottom = function () { }
        }

    },

    //改变数据状态
    changeStatus: function(e){
        var that = this
        var change_id = e.currentTarget.dataset.id

        if (!that.data.pageflag) {
            that.data.changeData.forEach(function(item) {
                if(item.change_id == change_id) {

                    that.setData({
                        temp: item,
                    })
                    var data = item
                }
            })
        }

        survey.changeStatus(change_id, function(res) {
            if(res.valid) {
                if (!that.data.pageflag) {

                    that.data.changeData.forEach(function (item, index) {
                        if (item.change_id == that.data.temp.change_id) {
                            that.data.changeData.splice(index, 1)
                        }
                    })
                    that.data.temp.status = 1

                    that.data.changeData.push(that.data.temp)


                    that.setData({
                        changeData: that.data.changeData
                    })
                    
                } else{
                    that.getChange()
                }
            }
        })
    },

    // tabar点击跳转
    tabbarsurveybtn: function() {
        app.tabbarsurveybtn();
    },
    tabbarclassbtn: function() {
        app.tabbarclassbtn();
    },
    tabbarstudentbtn: function() {
        app.tabbarstudentbtn();
    },
    tabbarsigninbtn: function() {
        app.tabbarsigninbtn();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})