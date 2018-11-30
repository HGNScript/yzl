// pages/apply/apply.js

var app = getApp()

Page({
    data: {
        apply: [{
                title: '学生应用',
                app: [{
                        url: '/pages/internship/home/home',
                        img: '/image/icon/apply/internship.png',
                        name: '实习系统'
                    },
                    // {
                    //     url: '',
                    //     img: '/image/icon/apply/student.png',
                    //     name: '学生系统'
                    // },
                    {
                        url: '/pages/questionnaire/home/home',
                        img: '/image/icon/apply/questionnaire.png',
                        name: '问卷'
                    }
                ]
            },
            {
                title: '市场',
                app: [{
                    url: '/pages/fleamarket/home/home',
                    img: '/image/icon/apply/flea.png',
                    name: '跳蚤市场'
                }, ]
            },
            {
                title: '社交',
                app: [{
                        url: '/pages/Confession/index/inde',
                        img: '/image/icon/apply/love.png',
                        name: '表白墙'
                    },
                    {
                        url: '/pages/secret/home/home',
                        img: '/image/icon/apply/sd.png',
                        name: '树洞'
                    }
                ]
            },
            {
                title: '找工作',
                app: [{
                        url: '/pages/enterprise/home/home',
                        img: '/image/icon/apply/enterprise.png',
                        name: '企业招聘'
                    },
                    {
                        url: '/pages/parttimejob/home/home',
                        img: '/image/icon/apply/parttime.png',
                        name: '兼职'
                    }
                ]
            },
            // {
            //     title: '学习',
            //     app: [{
            //         url: '',
            //         img: '/image/icon/apply/questions.png',
            //         name: '考题'
            //     }]
            // },
        ]
    },

    onLoad: function() {},

    onShareAppMessage: function () {
        return {
            title: '猿周率',
            path: '/pages/apply/apply'
        }
    }

})