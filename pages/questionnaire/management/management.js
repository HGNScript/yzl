// pages/questionnaire/management/management.js

import {
    Management
} from 'management-model.js'

var mg = new Management()

var app = getApp();

Page({
    data: {
        roll: [
            {
                test: null
            }
        ]
    },

    onLoad: function() {
        this.getUserBook()
    },

    //获取个人发起的问卷信息
    getUserBook: function() {
        var that = this
        var user_id = app.user['id']
        var url = '/book/getbooks/' + user_id
        mg.getUserBooks(url, function(res) {
    
            that.setData({
                roll: res
            })
        })
    },

    //下载问卷
    download: function(e){

        var book_id = e.currentTarget.dataset['id']

        var that = this
        var user_id = app.user['id']
        var url = 'book/dlbook/' + book_id
        mg.download(url, function (res) {
            wx.navigateTo({
                url: '/pages/questionnaire/dowload/dowload?url=' + res['url'],
            })
        })
    },

    roll: function(e) {
        var id = e.currentTarget.dataset['id']
        wx.navigateTo({
            url: '/pages/questionnaire/answer/answer?id=' + id + '&flag=false',
        })
    },


    deleteBook: function(e) {
        var book_id = e.currentTarget.dataset['id']
        var index = e.currentTarget.dataset['index']
        var that = this

        wx.showModal({
            title: '提示',
            content: '是否要删除问卷？',
            success: function(res){
                var url = '/book/del'
                if(res.confirm) {
                    mg.deleteBook(book_id, url, function(res){
                            if(res['valid']) {
                                that.data.roll.splice(index, 1)

                                that.setData({
                                    roll: that.data.roll
                                })
                            }
                    })
                }
            }
        })
    }

})