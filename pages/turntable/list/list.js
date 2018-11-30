// pages/list/list.js

import {
    Home
} from '../home/home-model.js'

var home = new Home()


var util = require('../../../utils/util.js')

var app = getApp()
Page({
    data: {
        xiaojueding: [],
        myxiaojueding: [],
        tab_index: 2,
    },

    //收藏
    officialQToKeep(e) {
        var that = this,
            index = e.currentTarget.dataset.index,
            xiaojueding = that.data.xiaojueding,
            flag = true;

        for (let x in xiaojueding) {

            if (x == index) {
                var data = xiaojueding[x]

                data['user_id'] = app.user.id

                home.add(data, function(res) {
                    that.getTop()
                    that.getUserData()
                })
                break;
            }
        }
        that.setData({
            xiaojueding: xiaojueding
        })
    },

    //删除
    personalQToDelete(e) {
        var that = this,
            index = e.currentTarget.dataset.index

        var id = this.data.myxiaojueding[index]['id']

        home.del(id, function(res) {
            that.getTop()
            that.getUserData()
            app.changeParentData(function () {
            })
        })

    },




    onLoad: function(options) {

        this.getTop()

        this.getUserData()



    },

    //获取热门数据
    getTop: function() {
        var that = this

        home.getTop(function(res) {
            that.setData({
                xiaojueding: res,
            })
        })
    },

    //获取自己的数据
    getUserData: function() {
        var that = this

        home.getUserData(app.user.id, function(res) {
            that.setData({
                myxiaojueding: res,
            })
        })
    },

    //热门、个人小决定
    tabSwitch(e) {
        var that = this,
            flg = e.currentTarget.dataset.flg

        that.setData({
            tab_index: flg == 1 ? '1' : '2'
        })
    },

    //添加个人小决定
    addPersonalQ(e) {
        wx.navigateTo({
            url: '/pages/turntable/edit/edit?flg=2',
        })
    },

    //个人编辑
    personalQToRevise(e) {
        var that = this,
            index = e.currentTarget.dataset.index;

        wx.navigateTo({
            url: '/pages/turntable/edit/edit?item=' + JSON.stringify(this.data.myxiaojueding[index])
        })
    },

    //热门编辑
    officialQToRevise(e) {
        var that = this,
            xiaojueding = that.data.xiaojueding,
            index = e.currentTarget.dataset.index;
        for (let i in xiaojueding) {
            if (i == index) {
                wx.redirectTo({
                    url: '/pages/turntable/edit/edit?flg=1&item=' + JSON.stringify(xiaojueding[i])
                })
                return;
            }
        }
    },

    //个人决定右边的图片
    personalQToControl(e) {
        var that = this,
            index = e.currentTarget.dataset.index,
            idx, myxiaojueding = that.data.myxiaojueding;
        for (let x in myxiaojueding) {
            if (x == index) {
                idx = myxiaojueding[x].num1 == undefined ? index : undefined;
                myxiaojueding[x].num1 = idx;
            } else {
                myxiaojueding[x].num1 = undefined;
            }
        }
        that.setData({
            myxiaojueding: myxiaojueding
        })
    },

    //热门决定右边的图片
    officialQToControl(e) {
        var xiaojueding = this.data.xiaojueding
        var that = this,
            index = e.currentTarget.dataset.index,
            idx;
        for (let x in xiaojueding) {
            if (x == index) {
                idx = xiaojueding[x].num == undefined ? index : undefined;
                xiaojueding[x].num = idx;
            } else {
                xiaojueding[x].num = undefined;
            }
        }
        that.setData({
            xiaojueding: xiaojueding
        })
    },


    //热门决定的标题
    officialQToRun(e) {
        var that = this,
        index = e.currentTarget.dataset.index;
        app.globalData.defaultJueding = true;

        wx.setStorageSync('redirectTo', this.data.xiaojueding[index]);
        wx.redirectTo({
            url: '/pages/turntable/home/home'
        })
    },



    //个人决定的标题
    personalQToRun(e) {
        var that = this,
            index = e.currentTarget.dataset.index;
        app.globalData.defaultJueding = true;

        wx.setStorageSync('redirectTo', this.data.myxiaojueding[index]);
        wx.redirectTo({
            url: '/pages/turntable/home/home'
        })
    },



    onShareAppMessage: function(e) {
        let that = this;
        
        home.flow(e.target.dataset.id, function () {
            that.onLoad()
        })

        // mta.Event.stat("share", {
        //     'time': '1'
        // });

        var picNum = Math.floor(Math.random() * 4 + 1); //获取1-4的随机数，用于随机展示分享图片

        return {
            title: util.isNull(app.globalData.shareTitle) ? ("一起来玩命运转盘吧") : app.globalData.shareTitle,
            path: '/pages/turntable/home/home?id=' + e.target.dataset.id,
        }
    },

    changeData: function(){
        this.getTop()
        this.getUserData()
    }
})