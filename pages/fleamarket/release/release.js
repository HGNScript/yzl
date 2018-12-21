// pages/fleamarket/release/release.js

import {
    Release
} from 'release-model.js'

var release = new Release()

var app = getApp();

Page({
    addressFlag: false,
    data: {
        theDelivery1: true,
        theDelivery2: false,
        isCate: 0,
        temp: [],
        navbar: ['货物详情'],
        cate: null,
        imgurl: [],
        imgpath: [],
        delivery: [{
                value: '当面交易',
                checked: 'true'
            },
            {
                value: '快递'
            },

        ],
        collection: [{
                value: '现金',
                checked: 'true'
            },
            {
                value: '支付宝(微信)'
            },

        ],
        fleamarket: {
            fleamarket_title: null, //名称
            fleamarket_content: null, //内容
            fleamarketCate_id: null, //所属分类
            fleamarket_number: 1, //数量
            fleamarket_costprice: null, //原价
            fleamarket_price: null, //售价
            fleamarket_theDelivery: '当面交易', //交易方式
            fleamarket_collection: '现金',
            fleamarket_phone: null,

        },
        authority: false,
        
    },




    //绑定商品名称
    setTitle: function(e) {
        var value = e.detail.value

        this.data.fleamarket.fleamarket_title = value

        this.setData({
            fleamarket: this.data.fleamarket,
        })
    },

    //绑定商品数量
    setNumber: function(e) {
        var value = e.detail.value

        this.data.fleamarket.fleamarket_number = value

        this.setData({
            fleamarket: this.data.fleamarket,
        })
    },

    // 绑定商品描述
    setContent: function(e) {
        var value = e.detail.value

        this.data.fleamarket.fleamarket_content = value

        this.setData({
            fleamarket: this.data.fleamarket,
        })
    },

    // 绑定商品售价
    setPrice: function(e) {
        var value = e.detail.value

        this.data.fleamarket.fleamarket_price = value

        this.setData({
            fleamarket: this.data.fleamarket,
        })
    },

    // 绑定商品原价[选填]
    setCostprice: function(e) {
        var value = e.detail.value

        this.data.fleamarket.fleamarket_costprice = value

        this.setData({
            fleamarket: this.data.fleamarket,
        })
    },

    // 绑定联系方式
    setPhone: function(e) {
        var value = e.detail.value

        this.data.fleamarket.fleamarket_phone = value

        this.setData({
            fleamarket: this.data.fleamarket,
        })
    },

    //获取选中的分类 
    bindPickerChange: function(e) {
        var cate_id = this.data.cate[e.detail.value].fleamarketCate_id

        this.data.fleamarket.fleamarketCate_id = cate_id

        this.setData({
            isCate: e.detail.value,
            fleamarket: this.data.fleamarket,
        })

    },


    //选择发货方式
    theDelivery: function(e) {
        var delivery = e.detail.value;

        if (delivery.length == 0) {
            wx.showModal({
                title: '提示',
                content: '发货方式不能为空',
            })
            this.setData({
                delivery: this.data.delivery
            })
        }

        this.data.fleamarket.fleamarket_theDelivery = delivery.join(",")

        this.setData({
            fleamarket: this.data.fleamarket,
        })

    },

    //选择收款方式
    collection: function(e) {
        var collection = e.detail.value;

        this.data.fleamarket.fleamarket_collection = collection

        this.setData({
            fleamarket: this.data.fleamarket,
        })
    },

    onLoad: function() {
        this.getCate()
        
        release.initValidate();
        
    },

    // 获取分类
    getCate: function() {
        var that = this

        release.getCate(function(res) {
            that.data.fleamarket.fleamarketCate_id = res[0]['fleamarketCate_id']

            that.setData({
                cate: res,
                fleamarket: that.data.fleamarket,
            })
        })
    },

    // 上传图片
    uploadImg: function() {
        var that = this
        if (this.data.imgurl.length > 3) {
            wx.showModal({
                title: '提示',
                content: '只能上传三张图片',
            })
        } else {
            app.choose(this, 3,function(imgsrc) {

                that.setData({
                    imgpath: imgsrc
                })

                if ((that.data.imgpath.length + that.data.imgurl.length) > 3) {
                    wx.showModal({
                        title: '提示',
                        content: '只能上传三张图片',
                    })
                } else {
                    var data = {
                        path: that.data.imgpath,
                        flag: 'upimg',
                        callback: function(data) {
                            if (data.valid == 1) {
                                that.data.imgurl.push(data)
                                that.setData({
                                    imgurl: that.data.imgurl,
                                })
                            }

                        }
                    }
                    app.uploadImg(data, that)
                }
            })
        }
    },

    // 删除图片
    delImg: function(e) {
        var that = this
        var imgUrl = e.currentTarget.dataset['url']
        var index = e.currentTarget.dataset['index']

        var url = "bc/delimg"

        release.delImg(url, imgUrl, function(res) {
            if (res) {
                that.data.imgurl.splice(index, 1)

                that.setData({
                    imgurl: that.data.imgurl
                })
            }
        })

    },

    //发布内容
    // btn
    submit: function() {
        var that = this
        this.data.fleamarket.user_id = app.user['id']

        this.setData({
            fleamarket: this.data.fleamarket
        })

        release.imgHandle(this)

        //校验表单
        if (!release.WxValidate.checkForm(this.data.fleamarket)) {
            const error = release.WxValidate.errorList[0]
            wx.showModal({
                content: error.msg,
                showCancel: false,
            })
            return false
        } else {

            if (this.data.imgurl.length >= 1) {
                release.submit(that, function (res) {
                    if (res['valid']) {
                        wx.showToast({
                            title: res['msg'],
                            icon: 'succes',     
                            duration: 1500,
                            mask: true,
                            success: function (res) {
                                setTimeout(function () {
                                    app.changeParentData(function(){
                                        wx.navigateBack({})
                                    })
                                }, 1500);
                            },
                        })
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: res['msg'],
                        })
                    }
                })
            } else {
                wx.showModal({
                    content: '最少需要上传一张物品图片',
                    showCancel: false,
                })
            }
            
        }


    },

    //监听是否获取地址
    getAddress: function(e) {

        var that = this

        this.setData({
            addressFlag: !this.data.addressFlag
        })

        if (this.data.addressFlag) {
            app.getAddress(this, false,function(res) {
                wx.hideLoading()
                
                if(!res){
                    that.setData({
                        authority: true,
                        addressFlag: false
                    })
                } else {
                    that.data.fleamarket.fleamarket_address = res
                    that.setData({
                        fleamarket: that.data.fleamarket
                    })
                }
                
            })
        } else {
            that.data.fleamarket.fleamarket_address = null
            that.setData({
                fleamarket: that.data.fleamarket
            })
        }
    },

    csole: function () {
        this.setData({
            authority: false
        })
    }


})