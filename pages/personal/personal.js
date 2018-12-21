// pages/personal/personal.js
const app = getApp()
Page({
    data: {
        userInfo: {
            imageUrl: '',
            user_name: '',
            gender: '',
        },


        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        common1: [{
                url: '/pages/Mypost/Mypost',
                imgurl: '/image/icon/personal/teizi.png',
                list: '我的帖子',
            },
            {
                url: '/pages/Mycollection/Mycollection',
                imgurl: '/image/icon/personal/x2.png',
                list: '我的收藏',
            },
            {
                url: '/pages/resources/home/home',
                imgurl: '/image/icon/personal/na.png',
                list: '爱拿不拿',
            },
            {
              url: '/pages/teacher/home/home',
              imgurl: '/image/icon/personal/js.png',
              list: '教师认证',
            },
            {
                url: '/pages/student/certification/certification',
                imgurl: '/image/icon/personal/student.png',
                list: '学生认证',
            },
            {
                url: '/pages/student/registered/registered',
                imgurl: '/image/icon/personal/zc.png',
                list: '学生注册',
            },
            {
                url: '/pages/enterprise/certification/certification',
                imgurl: '/image/icon/personal/qy.png',
                list: '企业认证',
            }
        ],
        common2: [{
                url: '/pages/instructions/instructions',
                imgurl: '/image/icon/personal/czzn.png',
                list: '操作指南',
            },
            {
                url: '/pages/gzysr/gzysr',
                imgurl: '/image/icon/personal/rxzn.png',
                list: '商务合作',
            },
            {
                url: '/pages/schoolmap/schoolmap',
                imgurl: '/image/icon/personal/gxdt.png',
                list: '各校地图',
            },
            // {
            //     url: '',
            //     imgurl: '/image/icon/personal/zb.png',
            //     list: '从化周边',
            // },
            {
                url: '/pages/feedback/feedback',
                imgurl: '/image/icon/personal/yjfk.png',
                list: '意见反馈',
            },
        ]
    },
    // 立即登录
    onLoad: function() {


        this.personal()

        if (app.user) {
            this.setData({
                hasUserInfo: true,
                user: app.user

            })
        } else {
            this.setData({
                hasUserInfo: false,
                userInfo: {
                    imageUrl: '',
                    user_name: '',
                    gender: '',
                }
            })
        }

    },

    //企业信息 学生信息初始化
    personal: function() {
        if (app.user) {

            if (app.user.company && app.user.company.company_state == 2) {
                this.data.common1[6].list = '企业信息'
                this.data.common1[6].url = '/pages/enterprise/personal/personal'

                this.setData({
                    common1: this.data.common1
                })
            }

            if (app.user.student && (app.user.student.stu_type == 1 || app.user.student.stu_type == 2)) {
                this.data.common1[4].url = '/pages/student/information/information'
                this.data.common1[5].url = '/pages/student/information/information'

                this.setData({
                    common1: this.data.common1
                })
            }


            if (app.user.tch_id) {
                this.data.common1[3].url = '/pages/teacher/infomation/infomation'

                this.setData({
                    common1: this.data.common1
                })
            }

        }
    },



    //登录
    getUserInfo: function(e) {
        var that = this

        wx.showLoading({
            title: '请稍等',
        })

        if (e.detail.userInfo != null) {
            that.setData({
                userInfo: {
                    imageUrl: e.detail.userInfo.avatarUrl,
                    user_name: e.detail.userInfo.nickName,
                    gender: e.detail.userInfo.gender,
                }
            })
            app.login(this, function() {

                if (that.data.user) {
                    that.setData({
                        hasUserInfo: true,
                    })
                } else {
                    wx.showModal({
                        content: '登录失败，请检查网络是否连接',
                        showCancel: false,
                    })
                }
            })
        }
    },

    //刷新
    changeData: function() {
        var that = this

        app.login(this, function() {
            that.onLoad()
        })

    },

    //客服
    handleContact: function(e) {

    },

    onShareAppMessage: function () {
        return {
            title: '猿周率',
            path: '/pages/personal/personal'
        }
    }
})