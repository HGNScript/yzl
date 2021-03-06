// pages/edit/edit.js
var util = require('../../../utils/util.js')
var app = getApp()


import {
    Home
} from '../home/home-model.js'

var home = new Home()


Page({
    data: {
        input_answer_list: [],
        default_input_answer_list: {},
        name: '',
        flg: 0,
        colorArr: [ //增加选项的默认颜色排序
            '#EE534F',
            '#FF7F50',
            '#FFC928',
            '#66BB6A',
            '#42A5F6',
            '#FF7F50',
            '#AA47BC',
            '#EC407A',
            '#DA70D6',
            '#FFA827',
            '#AA47BC',
            '#EE534F',
            '#42A5F6',
            '#66BB6A',
            '#FFC928',
            '#42A5F6',
            '#5C6BC0',
        ]
    },

    onLoad: function(options) {

        
        if (options.item) {
            var obj = JSON.parse(options.item);


            this.setData({
                input_answer_list: obj.awards,
                default_input_answer_list: obj,
                name: obj.option
            })
        }
            
    },

    //小决定的名称
    checkQuestion(e) {
        var that = this,
            val = e.detail.value,
            default_input_answer_list = that.data.default_input_answer_list;
        default_input_answer_list.option = val
        that.setData({
            name: val,
            default_input_answer_list: default_input_answer_list
        })
    },

    //小决定选项
    checkAnswer(e) {
        var that = this,
            val = e.detail.value,
            index = e.currentTarget.dataset.index,
            input_answer_list = that.data.input_answer_list,
            default_input_answer_list = that.data.default_input_answer_list;
        for (let i in input_answer_list) {
            if (index == i) {
                input_answer_list[i].name = val
            }
        }
        default_input_answer_list.awards = input_answer_list;
        that.setData({
            input_answer_list: input_answer_list,
            default_input_answer_list: default_input_answer_list
        })
    },

    //增加
    addAnswer() {
        var that = this,
            input_answer_list = that.data.input_answer_list,
            colorArr = that.data.colorArr,
            obj = {};
        if (input_answer_list.length == 17) {
            wx.showToast({
                title: '选项长度最多17项',
                icon: 'none',
                mask: false
            })
            return;
        }
        obj = {
            name: '',
            color: colorArr[input_answer_list.length]
        };
        input_answer_list.push(obj);
        that.setData({
            input_answer_list: input_answer_list
        })
    },

    //删除
    subAnswer(e) {
        var that = this,
            index = e.currentTarget.dataset.index,
            input_answer_list = that.data.input_answer_list,
            default_input_answer_list = that.data.default_input_answer_list,
            colorArr = that.data.colorArr;
        for (let i in input_answer_list) {
            if (i == index) {
                input_answer_list.splice(i, 1);
                break;
            }
        }

        for (let x in input_answer_list) {
            input_answer_list[x].color = colorArr[x];
        }

        default_input_answer_list.awards = input_answer_list;
        that.setData({
            input_answer_list: input_answer_list,
            default_input_answer_list: default_input_answer_list
        })
    },

    //保存
    saveQA() {
        var that = this,
            default_input_answer_list = that.data.default_input_answer_list,
            input_answer_list = that.data.input_answer_list

        if (that.data.name == '') {
            wx.showToast({
                title: '名称不能为空',
                icon: 'none',
                mask: false
            })
        } else {
            for (let y in input_answer_list) {
                if (input_answer_list[y].name == '') {
                    wx.showToast({
                        title: '选项不能为空',
                        icon: 'none',
                        mask: false
                    })
                    return;
                }
            }

            if (input_answer_list.length < 2) {
                wx.showToast({
                    title: '选项最少填2个',
                    icon: 'none',
                    mask: false
                })
                return;
            }

            this.data.input_answer_list.forEach(function(item){
                delete item.id
                delete item.turntable_id
            })

            var data = {
                awards: this.data.input_answer_list,
                flow: 0,
                option: this.data.name,
                user_id: app.user.id,
                delid: [this.data.default_input_answer_list['id']]
            }

            home.edit(data, function(res){
                app.changeParentData(function(){
                    wx.navigateBack({
                    })
                })
            }) 
            
            

           
        }
    },

    onUnload: function() {
        var that = this,
            flg = that.data.flg,
            myJuedin = wx.getStorageSync('myJuedin'),
            all = wx.getStorageSync('all');

        if (flg == 1) {
            myJuedin.splice(myJuedin.length - 1, 1);
            wx.setStorageSync('myJuedin', myJuedin);
        }

        function rep(arr) {
            var result = [];
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                if (!obj[arr[i].id]) {
                    result.push(arr[i]);
                    obj[arr[i].id] = true;
                }
            }
            return result;
        }
        var a = rep(myJuedin),
            b = rep(all);
        wx.setStorageSync('myJuedin', a);
        wx.setStorageSync('all', b);
    },

    onShareAppMessage: function() {
        let that = this;
        mta.Event.stat("share", {
            'time': '1'
        });
        var picNum = Math.floor(Math.random() * 4 + 1); //获取1-4的随机数，用于随机展示分享图片
        return {
            title: util.isNull(app.globalData.shareTitle) ? ("一起来玩'" + app.globalData.title + "'吧") : app.globalData.shareTitle,
            path: '/pages/turntable/home/home',
            success: function(res) {
                console.log('成功进入分享==========', res);

            },
            fail: function(res) {
                console.log('进入分享失败==========', res);
            }
        }
    }
})