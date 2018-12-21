// pages/sx_teacher/class/class.js
var app = getApp();
var wxCharts = require("../../../utils/wxcharts.js");
var windowW = 0;
import {
    Classm
} from 'class_model.js'

var classmodel = new Classm()
Page({
    data: {

    },

    onLoad: function(options) {
        this.setData({
            tch_id: app.user.tch_id,
            tch_type: app.user.tch_type,
        })
        // 屏幕宽度
        this.setData({
            imageWidth: wx.getSystemInfoSync().windowWidth
        });
        //计算屏幕宽度比列
        windowW = this.data.imageWidth / 375;

        this.getClassData()
    },

    //获取班级数据
    getClassData: function() {
        var that = this
        classmodel.getClassData(this, function(res) {

            that.setData({
                classData: res,
            })

            that.data.classData.forEach(function(item, index) {
                that.wxCharts(item)
            })


        })
    },

    wxCharts: function(item) {
        new wxCharts({
            canvasId: item.class_id,
            type: 'column',
            categories: ['实习', '签到', '日志', '对口'],
            series: [{
                    name: '(已实习，已签到，已填写日志，专业对口)',
                    data: [
                        app.percentage(item.company.n, item.sum),
                        app.percentage(item.signIn.n, item.sum),
                        app.percentage(item.logs.n, item.sum),
                        app.percentage(item.identical.n, item.sum)
                    ],
                    format: function(val) {
                        return parseInt(val) + '%-' + Math.round(val / 100 * item.sum) + '人';
                    },
                },

                {
                    name: '(未实习，未签到，未填写日志，专业不对口)',
                    data: [
                        100 - app.percentage(item.company.n, item.sum),
                        100 - app.percentage(item.signIn.n, item.sum),
                        100 - app.percentage(item.logs.n, item.sum),
                        100 - app.percentage(item.identical.n, item.sum)
                    ],
                    format: function(val) {
                        return parseInt(val) + '%-' + Math.round(val / 100 * item.sum) + '人';
                    },

                }
            ],
            width: (375 * windowW),
            height: (200 * windowW),
        });
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