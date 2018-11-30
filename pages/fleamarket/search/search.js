// pages/enterprise/search/search.js

var app = getApp()

import {
    Search
} from 'search-model.js'

var search = new Search()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        search: null,
        searchcon: [],
        myrich: '<div style="color: red;" >hello,world</div >',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    //获取需要搜索的数据
    searchText: function(e){
        this.setData({
            search: e.detail.value
        })
    },

    getSeachData:function(){
        var that = this
        var data = {
            search: this.data.search,
            fleamarketCate_id: 0,
        }
        search.getSearchData(data, function(res){
            that.setData({
                searchcon: res
            })
        })
    }


})