import {
    Certification
} from 'certification-model.js';

var certification = new Certification();
var app = getApp();

Page({
    data: {
        company_state: null,
        casArray: [],
        casIndex: 0,
        logourl: [],
        logopath: null,
        permiturl: [],
        permitpath: null
    },

    onLoad: function() {

        var that = this

        if (app.user.company_id != 0) {
            that.setData({
                company_state: app.user.company.company_state,
            })
        }

        if (that.data.company_state == 3) {
            wx.showModal({
                title: '提示',
                content: '企业信息审核未通过，请检查信息，重新提交',
                showCancel: false,
                success: function(res) {
                    that.exnot()
                },
            })
        }

    },

    //审核失败
    exnot: function() {
        var that = this

        that.data.casArray.forEach(function(item, index) {
            if (item.type_name == app.user.company.companytype.type_name) {
                that.setData({
                    casIndex: index
                })

            }
        })

        that.data.logourl[0] = app.user.company.company_logo
        that.data.permiturl[0] = app.user.company.business_licence

        that.setData({
            company_state: null,
            company_name: app.user.company.company_name,
            company_phone: app.user.company.company_phone,
            corporation_name: app.user.company.corporation_name,
            id_card: app.user.company.id_card,
            company_address: app.user.company.company_address,
            company_synopsis: app.user.company.company_synopsis,
            logourl: that.data.logourl,
            logopath: that.data.logourl,
            permiturl: that.data.permiturl,
            permitpath: that.data.permiturl,
            company_id: app.user.company.company_id
        })

        that.delImg = function(e) {
            var id = e.currentTarget.dataset['id']

            if (id == 1) {
                that.setData({
                    logourl: [],
                    logopath: null
                })
            }
            if (id == 2) {
                that.setData({
                    permiturl: [],
                    permitpath: null
                })
            }

        }
    },

    onShow: function() {
        var that = this
        app.checkUser(function() {
            if (app.user.stu_id != 0) {
                wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: '你已经进行了学生注册或认证，不能在进行企业认证',
                    success: function(res) {
                        if (res.confirm) {
                            wx: wx.navigateBack({})
                        }
                    }
                })
            } else {


                that._loadData();
                certification.initValidate();
            }
        })



    },

    //加载数据
    _loadData: function() {
        //获取分类数据
        certification.getTypeData((data) => {
            this.setData({
                casArray: data
            })
        });
    },

    // 分类选择器
    bindCasPickerChange: function(e) {
        this.setData({
            casIndex: e.detail.value
        })
    },

    // 上传企业Logo
    uploadLogo: function() {
        var that = this
        if (this.data.logourl.length > 1) {
            wx.showModal({
                title: '提示',
                content: '只能上传一张图片',
            })
        } else {
            app.choose(this, function(imgsrc) {
                that.setData({
                    logopath: imgsrc
                })
                if ((that.data.logopath.length + that.data.logourl.length) > 1) {
                    wx.showModal({
                        title: '提示',
                        content: '只能上传一张图片',
                    })
                } else {
                    var data = {
                        path: that.data.logopath,
                        flag: 'logo',
                        callback: function(data) {
                            if (data.valid == 1) {
                                that.data.logourl.push(data.url)
                                that.setData({
                                    logourl: that.data.logourl,
                                })
                            }

                        }
                    }
                    app.uploadImg(data, that)
                }
            })
        }
    },

    // 上传营业执照
    uploadlicense: function() {
        var that = this
        if (this.data.permiturl.length > 1) {
            wx.showModal({
                title: '提示',
                content: '只能上传一张图片',
            })
        } else {
            app.choose(this, function(imgsrc) {
                that.setData({
                    permitpath: imgsrc
                })
                if ((that.data.permitpath.length + that.data.permiturl.length) > 1) {
                    wx.showModal({
                        title: '提示',
                        content: '只能上传一张图片',
                    })
                } else {
                    var data = {
                        path: that.data.permitpath,
                        flag: 'license',
                        callback: function(data) {
                            if (data.valid == 1) {
                                that.data.permiturl.push(data.url)
                                that.setData({
                                    permiturl: that.data.permiturl,
                                })
                            }

                        }
                    }
                    app.uploadImg(data, that)
                }
            })
        }
    },

    //删除图片
    delImg: function(e) {
        var that = this
        var imgUrl = e.currentTarget.dataset['url']
        var id = e.currentTarget.dataset['id']

        var url = "bc/delimg"

        certification.delImg(url, imgUrl, function(res) {
            if (res) {
                if (id == 1) {
                    that.data.logourl.splice(0, 1)
                    that.setData({
                        logourl: that.data.logourl,
                        logopath: null
                    })
                }
                if (id == 2) {
                    that.data.permiturl.splice(0, 1)
                    that.setData({
                        permiturl: that.data.permiturl,
                        permitpath: null
                    })
                }

            }
        })

    },

    // 提交
    formCompanyData: function(e) {
        var that = this;
        var data = e.detail.value;
        data.company_logo = this.data.logourl[0];
        data.business_licence = this.data.permiturl[0];
        var i = this.data.casIndex;
        data.classify_id = this.data.casArray[i].type_id;
        data.user_id = app.user.id

        data.company_id = this.data.company_id


        //校验表单
        if (!certification.WxValidate.checkForm(data)) {
            const error = certification.WxValidate.errorList[0]
            this.showModal(error)
            return false
        }
        certification.addCompanyData(data, (res) => {
            if (res.valid == 1) {
                wx.showToast({
                    title: res.msg,
                    icon: 'success',
                    duration: 1000,
                    success: function() {
                        setTimeout(function() {
                            that.changeParentData()
                        }, 1000)
                    }
                })
            }

        })

    },
    //报错
    showModal: function(error) {
        wx.showModal({
            content: error.msg,
            showCancel: false,
        })
    },

    //刷新上一级页面数据
    changeParentData: function() {

        var pages = getCurrentPages(); //当前页面栈

        if (pages.length > 1) {

            var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象

            beforePage.changeData(); //触发父页面中的方法

            wx.navigateBack({

            })

        }

    }
})