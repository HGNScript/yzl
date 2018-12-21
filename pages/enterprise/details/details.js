// pages/enterprise/details/details.js
import {
    Details
} from 'details-model.js';
var details = new Details();
var app = getApp();
Page({
    data: {
        reply: true,
        addComment: '',
        comment: {},
        textFlag: false,
        textValue: '请输入评论内容',
        commentData: {
            pid: null,
            uid: null,
            pname: null,
            user_name: null,
        },

    },

    onLoad: function(option) {
        var that = this
        app.getH(this)

        that.setData({
            id: option.recruit_id,
        })

        if (option.share) {
            this.setData({
                share: option.share
            })
            app.share(this, function(flag){
                if(flag){
                    that._loadData(option.recruit_id);
                }
            })
        } else {
            app.checkUser(function () {
                that._loadData(option.recruit_id);
            })
        }
    },
    _loadData: function(recruit_id, fn) {
        var that = this;
        //获取招聘信息
        details.getRecruitData(recruit_id, (res) => {
            that.setData({
                recruitData: res
            })
        })

        //获取数据评论
        details.getComment(recruit_id, function(res) {
            that.setData({
                comment: res,
            })
            fn && fn()
            
        })

        //浏览量增加
        that.setIncFlow(recruit_id)
    },


    // 预览图片
    img: function(e) {
        var url = e.currentTarget.dataset['imgurl'];
        var imgurls = e.currentTarget.dataset['imgurls'];

        var urls = [];

        imgurls.forEach(function(item) {
            urls.push(item.img_url)
        })

        wx.previewImage({
            current: url,
            urls: urls // 需要预览的图片http链接列表
        })
    },
    // 查看全部评论
    reply: function(e) {
        this.setData({
            reply: !this.data.reply
        })
    },
    //绑定填写评论数据
    comment: function(e) {
        var value = e.detail['value']

        this.setData({
            addComment: value,
        })
    },
    //提交评论
    submit: function(e) {
        var value = this.data.addComment
        var that = this
        var info_id = e.currentTarget.dataset.id
        var user_id = app.user.id



        if (this.data.commentData.pid) {
            var data = {
                user_id: user_id,
                info_id: info_id,
                pid: this.data.commentData.pid,
                uid: this.data.commentData.uid,
                value: value,
            }
        } else {
            var data = {
                user_id: user_id,
                info_id: info_id,
                value: value,
            }
        }

        if (!that.data.commentData.pid) {
            that.setData({
                buttomFlag: true
            })
        } else {
            that.setData({
                buttomFlag: false
            })
        }

        details.submit(data, function(res) {
            that.setData({
                addComment: null,
                commentData: {
                    pid: null,
                    uid: null,
                    pname: null,
                    user_name: null,
                },
            })

            if (res.comment_id) {
                that._loadData(that.data.id, function () {
                    if (that.data.buttomFlag) {
                        that.setData({
                            toViewRt: 't1'
                        })
                    }
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: res.msg,
                })
            }
        })

    },
    //回复评论
    replyComment: function(e) {
        var that = this
        setTimeout(function(){
            var pid = e.currentTarget.dataset['pid']
            var uid = e.currentTarget.dataset['uid']
            var pname = e.currentTarget.dataset['pname']

            var user_name = app.user['user_name']

            that.data.commentData['pid'] = pid
            that.data.commentData['uid'] = uid
            that.data.commentData['user_name'] = user_name


            if (uid) {
                that.data.commentData['pname'] = pname
            } else {
                that.data.commentData['pname'] = ''

            }

            that.setData({
                textValue: '回复:' + pname,
                textFlag: true,
                commentData: that.data.commentData,
            })
        },100)
    },
    //显示评论数据
    reply: function(e) {
        var index = e.currentTarget.dataset['index']

        if (this.data.comment[index]['son'].length > 0) {
            this.data.comment[index]['reply'] = !this.data.comment[index]['reply']

            this.setData({
                comment: this.data.comment
            })
        }

    },
    textFocus: function(e) {
        this.setData({
            textValue: '请输入评论内容',
        })
    },
    // 点赞
    good: function(e) {
        console.log(e)
        var that = this
        var info_id = this.data.recruitData['recruit_id']
        if (!this.data.recruitData['goodFlag']) {
            this.data.recruitData['goodFlag'] = !this.data.recruitData['goodFlag']

            this.data.recruitData['recruit_good'] = parseInt(this.data.recruitData['recruit_good']) + 1

            var user_id = app.user['id']
            details.good(user_id, info_id, function(res) {
                that.data.recruitData['goodid'] = res.msg['good_id']
                that.setData({
                    recruitData: that.data.recruitData
                })
            })
        } else {
            var id = this.data.recruitData['goodid']
            this.data.recruitData['goodFlag'] = !this.data.recruitData['goodFlag']
            this.data.recruitData['recruit_good'] = parseInt(this.data.recruitData['recruit_good']) - 1
            

            details.delGood(id, function(res) {
                that.setData({
                    recruitData: that.data.recruitData
                })
            })
        }
    },
    //浏览量增加
    setIncFlow: function(id) {
        var that = this
        details.setIncFlow(id, function(res) {
            details.getRecruitData(id, (res) => {
                that.setData({
                    recruitData: res
                })
            })
        })
    },
    // 收藏
    coller: function(e) {
        //收藏
        var that = this
        if (!this.data.recruitData['collectFlag']) {
            this.data.recruitData['collectFlag'] = !this.data.recruitData['collectFlag']

            var user_id = app.user['id']
            var info_id = this.data.recruitData['recruit_id']

            details.coller(user_id, info_id, function(res) {

                that.data.recruitData['collectid'] = res.msg['collect_id']


                that.setData({
                    recruitData: that.data.recruitData
                })

            })

        } else {

            //删除收藏数据
            var id = this.data.recruitData['collectid']
            this.data.recruitData['collectFlag'] = !this.data.recruitData['collectFlag']

            details.delColler(id, function(res) {
                that.setData({
                    recruitData: that.data.recruitData
                })

            })
        }
    },


    // 个人
    userimg: function (e) {
        app.jump(e)
    },

    onShareAppMessage: function () {
        return {
            path: '/pages/enterprise/details/details?recruit_id=' + this.data.id + '&share=' + true
        }
    },

    onUnload: function() {
        app.changeParentData(null, this.data.recruitData)
    },

    //登录
    getUserInfo: function (e) {
        var that = this

        app.shareLogin(this, e, function () {
            that._loadData(that.data.id);
        })

    },
    

    
})