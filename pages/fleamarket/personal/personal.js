import {
    Personal
} from 'personal-model.js'

var per = new Personal()

Page({
    data: {
        navbar: ['小猿说', '跳蚤贴'],
        currentTab: 0,

    },
    navbarTap: function(e) {
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        })
    },

    fmdetailed: function(e) {
        var id = e.currentTarget.dataset['id']
        wx.navigateTo({
            url: '/pages/fleamarket/details/details?id=' + id
        })
    },

    detailed: function(e) {
        var id = e.currentTarget.dataset['id']


        wx.navigateTo({
            url: '/pages/circle/detailed/detailed?id=' + id
        })

    },

    conbox: function(e) {
        var id = e.currentTarget.dataset['id']
        wx.navigateTo({
            url: '/pages/enterprise/details/details?recruit_id=' + id
        })
    },

    onLoad: function(e) {
        var user_id = e.uid

       

        this.setData({
            uid: user_id,
        })
        this.getUserData(user_id)
    },

    getUserData: function(user_id) {
        var that = this
        var url = 'user/getuserdata/' + user_id
        per.getUserInfo(url, function(res) {
            that.setData({
                checkuser: res,
            })
            
            if ((res.student && res.student.stu_type == 1) || (res.student &&  res.student.stu_type == 2) ){
                that.setData({
                    school: res.student.school.school_name
                })
            }

            if (that.data.checkuser.company  && that.data.checkuser.company.company_state == 2) {
                that.setData({
                    navbar: ['小猿说', '跳蚤贴', '企业招聘', '企业信息'],
                })
            }
        })
    },

    //刷新
    changeData: function() {
        this.getUserData(this.data.uid)
    },

})