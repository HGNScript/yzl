import {
    Registered
} from 'registered-model.js';

var registered = new Registered();
var app = new getApp();

Page({
    data: {
        stu_type: null,
        casArray: null,
        casIndex: 0,
        gradeArray: ['请选择年级', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
        gradeIndex: 0,
        card_img: null,

        stu_name: null,
        stu_major: null,
        stu_class: null,
        stu_number: null,
        stu_id: null,
    },

    onLoad: function() {

        var that = this
        that.setData({
            stu_type: app.user.student && app.user.student.stu_type,
        })

        if (that.data.stu_type == 0) {
            wx.showModal({
                title: '提示',
                content: '学生信息审核未通过，请检查信息，重新提交',
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
        that.data.gradeArray.forEach(function(item, index) {
            if (item == app.user.student.stu_grade) {
                that.setData({
                    gradeIndex: index
                })

            }
        })

        that.data.casArray.forEach(function(item, index) {
            if (item.school_name == app.user.student.school.school_name) {
                that.setData({
                    casIndex: index
                })

            }
        })

        that.setData({
            stu_type: null,
            card_img: app.user.student.card_img,
            stu_name: app.user.student.stu_name,
            stu_major: app.user.student.stu_major,
            stu_class: app.user.student.stu_class,
            stu_number: app.user.student.stu_number,
            stu_id: app.user.student.stu_id,
        })

        that.delImg = function() {
            that.setData({
                card_img: null,
            })
        }
    },

    onShow: function() {
        var that = this
        app.checkUser(function() {
            if (app.user.company_id != 0) {
                wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: '你已经进行了企业认证，不能在进行学生注册或认证',
                    success: function(res) {
                        if (res.confirm) {
                            wx: wx.navigateBack({})
                        }
                    }
                })
            } else {
                that._loadData();
                registered.initValidate();
            }
        })
    },

    // 产品分类选择器
    school: function(e) {
        this.setData({
            casIndex: e.detail.value
        })
    },
    // 年级
    grade: function(e) {
        this.setData({
            gradeIndex: e.detail.value
        })
    },

    // 上传学生证
    uploadcard: function() {
        var that = this

        app.choose(this, function(imgsrc) {
            that.setData({
                card_img: imgsrc
            })

            var data = {
                path: that.data.card_img,
                flag: 'logo',
                callback: function(data) {
                    if (data.valid == 1) {
                        that.setData({
                            card_img: data.url,
                        })
                    }
                }
            }
            app.uploadImg(data, that)
        })
    },



    _loadData: function() {
        registered.getSchoolData((res) => {

            res.unshift({
                school_name: '请选择学校'
            })

            this.setData({
                casArray: res
            });
        })
    },

    // 提交
    formSubmit: function(e) {
        var data = e.detail.value;
        var that = this;
        //校验表单
        if (!registered.WxValidate.checkForm(data)) {
            const error = registered.WxValidate.errorList[0]
            this.showModal(error)
        }

        var casindex = this.data.casIndex;
        data.school_id = this.data.casArray[casindex].school_id;

        if (casindex == 0) {
            wx.showModal({
                content: '请选择学校',
                showCancel: false,
            })
            return false
        }

        var gradeindex = this.data.gradeIndex
        data.stu_grade = this.data.gradeArray[gradeindex]

        if (gradeindex == 0) {
            wx.showModal({
                content: '请选择年级',
                showCancel: false,
            })
            return false
        }

        var user_id = app.user.id;
        data.user_id = user_id;

        if (!that.data.card_img) {
            wx.showModal({
                content: '请上传学生证',
                showCancel: false,
            })
            return false
        }

        data.card_img = that.data.card_img

        data.stu_id = that.data.stu_id

        registered.submitFrom(data, (res) => {

            if (res.valid == 1) {
                wx.showToast({
                    title: res.msg,
                    icon: 'success',
                    duration: 1000,
                    success: res => {
                        setTimeout(function() {
                            that.changeParentData()

                        }, 1000)


                    }
                })
            } else {
                wx.showModal({
                    content: res.msg,
                    showCancel: false,
                })
            }


        });
    },

    //删除图片
    delImg: function(e) {
        var that = this
        var imgUrl = e.currentTarget.dataset['url']
        var id = e.currentTarget.dataset['id']

        var url = "bc/delimg"

        registered.delImg(url, imgUrl, function(res) {
            if (res) {
                that.setData({
                    card_img: null,
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

        return false

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