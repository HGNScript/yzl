import {
    Base
} from '../../../utils/base.js';

var app = getApp()
var base = new Base()

Page({
    data: {
        navbar: ['企业信息'],
        currenttab: 0,
        conbox: [],
        information: [

        ]

    },

    onLoad: function(e) {
        var id = e.id
        this.getRecruit(id)
        this.getusercompany(app.user.id)
    },

    navbarbtn: function(e) {
        this.setData({
            currenttab: e.currentTarget.dataset.ind,
        })
    },


    // 内容
    conbox(e) {
        wx.navigateTo({
            url: '/pages/enterprise/details/details?recruit_id=' + e.currentTarget.dataset.id,
        })
    },

    getRecruit: function (id) {
        var that = this
        //获取类型数据
        var params = {
            url: 'recruit/getHomeData',
            data: {
                user_id: id
            },
            eCallback: function(res) {
                that.setData({
                    conbox: res,
                })
            }
        }
        base.request(params);

    },

    getusercompany: function (id) {
        var that = this
        //获取类型数据
        var params = {
            url: 'company/getusercompany/' + id,
            eCallback: function (res) {
                that.setData({
                    information: res,
                })
            }
        }
        base.request(params);

    },

})