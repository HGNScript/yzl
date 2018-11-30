// pages/questionnaire/write/write.js

import { Write } from 'write-model.js'

var write = new Write()

Page({
    data: {
        search: '',
        navbar: [
            {
                name: '最新',
                col: 'create_time',
            },
            {
                name: '热门',
                col: 'book_flow',
            }
        ],
        currentTab: 0,
        roll: [],
    },

    onLoad: function() {
        this.getBook()
    },

    //获取问卷数据
    getBook:  function(){
        var that = this
        var url = '/book/getallbook'
        write.getBook(url, function(res){
            that.setData({
                roll : res
            })
        })
    },

    // 选项
    navbarTap: function(e) {


        var col = e.currentTarget.dataset['col']

        var that = this
        var url = '/book/getallbook?where=' + col
        var idx = e.currentTarget.dataset['idx']

        
        write.getBook(url, function (res) {
            that.setData({
                roll: res,
                currentTab: idx,
            })
        })
    },

    //获取input框中的值
    inputap: function(e){
        this.setData({
            search: e.detail['value']
        })
    },

    search: function(e) {
        var that = this
        
        var search = this.data.search

        var url = '/book/searchbook?search=' + search

        write.search(url, function(res){
            that.setData({
                roll: res,
            })
        })

    },


    roll: function(e) {
        var id = e.currentTarget.dataset['id']
        wx.navigateTo({
            url: '/pages/questionnaire/answer/answer?id=' + id + '&flag=true',
        })
    }
})