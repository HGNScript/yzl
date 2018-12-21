// pages/parttimejob/details/details.js
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
    userimg: function(e) {
        app.jump(e)
    },
    onLoad: function(option) {
        app.getH(this)
        
        var that = this

        that.setData({
            id: option.job_id,
        })

        if (option.share) {
            this.setData({
                share: option.share
            })
            app.share(this, function (flag) {
                if (flag) {
                    that._loadData(option.job_id);
                }
            })

        } else {
            app.checkUser(function () {
               
                that._loadData(option.job_id);
            })
        }
       
       
    },

    _loadData: function(job_id, fn) {
        var that = this;
        //获取兼职信息
        details.getJobData(job_id, (res) => {
            that.setData({
                jobData: res
            })
        })

        //获取数据评论
        details.getComment(job_id, function(res) {
            that.setData({
                comment: res,
            })

            fn && fn()
        })

        //浏览量增加
        that.setIncFlow(job_id)
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

    //浏览量增加
    setIncFlow: function(id) {
        var that = this
        details.setIncFlow(id, function(res) {
            details.getJobData(id, (res) => {
                that.setData({
                    jobData: res
                })
            })
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
        if (!value) {
            wx.showModal({
                title: '提示',
                content: '请输入评论内容',
            })

            return false
        }
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
            if (res.comment_id) {
                that.setData({
                    addComment: null,
                    commentData: {
                        pid: null,
                        uid: null,
                        pname: null,
                        user_name: null,
                    },
                })

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
        var that = this
        var info_id = this.data.jobData['job_id']
        if (!this.data.jobData['goodFlag']) {
            this.data.jobData['goodFlag'] = !this.data.jobData['goodFlag']
            this.data.jobData['job_good'] = parseInt(this.data.jobData['job_good']) + 1
            
            var user_id = app.user['id']
            details.good(user_id, info_id, function(res) {
                that.data.jobData['goodid'] = res.msg['good_id']
                that.setData({
                    jobData: that.data.jobData
                })

            })
        } else {
            var id = this.data.jobData['goodid']
            this.data.jobData['goodFlag'] = !this.data.jobData['goodFlag']
            this.data.jobData['job_good'] = parseInt(this.data.jobData['job_good']) - 1

            details.delGood(id, function(res) {
                that.setData({
                    jobData: that.data.jobData
                })
            })
        }
    },

    // 收藏
    coller: function(e) {
        //收藏
        var that = this
        if (!this.data.jobData['collectFlag']) {
            this.data.jobData['collectFlag'] = !this.data.jobData['collectFlag']

            var user_id = app.user['id']
            var info_id = this.data.jobData['job_id']

            details.coller(user_id, info_id, function(res) {

                console.log(res.msg)

                that.data.jobData['collectid'] = res.msg['collect_id']


                that.setData({
                    jobData: that.data.jobData
                })

            })

        } else {

            //删除收藏数据
            var id = this.data.jobData['collectid']
            this.data.jobData['collectFlag'] = !this.data.jobData['collectFlag']

            details.delColler(id, function(res) {
                that.setData({
                    jobData: that.data.jobData
                })
            })
        }
    },
    // 评论输入
    bindReply: function(e) {
        this.setData({
            releaseFocus: !this.data.releaseFocus
        })
    },
    combtn1: function(e) {
        this.setData({
            releaseFocus: !this.data.releaseFocus
        })
    },
    combtn2: function(e) {
        this.setData({
            releaseFocus: !this.data.releaseFocus
        })
    },


    onShareAppMessage: function(){
        return {
            path: '/pages/parttimejob/details/details?job_id=' + this.data.id + '&share=' + true,
        }
    },

    onUnload: function () {
        app.changeParentData(null, this.data.jobData)
    },

    //登录
    getUserInfo: function (e) {
        var that = this

        app.shareLogin(this, e, function () {
            that._loadData(that.data.id);
        })

    },
})