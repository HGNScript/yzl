// pages/questionnaire/answer/answer.js
import {
    Answer
} from 'answer-model.js'

var answer = new Answer()

var app = getApp()

Page({
    data: {
        // 单选题目数据
        radio: [],
        // 多选题目数据
        checkbox: [],
        // 问答题
        answer: [],

        book_name: null,
        book_summary: null,
        create_time: null,
        launch_name: null,

        //用户填写的答案
        userAnswer: [],
        //必填的题目id
        notNullID: [],
        //提交按钮状态
        flag: true,
    },



    onLoad: function(e) {
        var that = this

        app.checkUser(function(){
            var id = e['id'];
            var flag = e['flag'];

            that.setIncFlow(id)

            that.setData({
                book_id: id,
                flag: flag,
                id: id,
            })
            that.getBook(id);
        })

       


    },

    //提交填写的问卷信息
    submit: function() {

        var user_id = app.user['id']


        var that = this

        var useranswer = []
        that.data.userAnswer.forEach(function(item) {
            useranswer.push(item['subject_id'])
        })
        var flag = true;

        that.data.notNullID.forEach(function(item) {
            if (useranswer.indexOf(item) == -1) {
                
                flag = false
            }
        })

        console.log(flag)

        if (!flag) {
            wx.showModal({
                title: '提示',
                content: '请填写必填的选项',
            })

            return
        }

        that.data.userAnswer.forEach(function(item) {
            item['user_id'] = user_id
        })

        var url = '/answer/addanswer?user_id=' + user_id + '&book_id=' + this.data.book_id
        var data = this.data.userAnswer

        answer.submit(url, data, function(res) {

            if (res['valid']) {
                wx.showToast({
                    title: '提交成功',
                    duration: 1000,
                    success: function(res) {
                        
                        setTimeout(function () {
                            wx.navigateBack({})
                        }, 1000)
                    
                    }
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: res['msg'],
                })
            }
        })


    },

    //获取问卷信息
    getBook: function(id) {
        var that = this
        var url = '/book/getbook/' + id
        answer.getBook(url, function(res) {
            that.setData({
                arr: res.subject,
            })
            var radio = []
            var checkbox = []
            var answer = []

            res['subject'].forEach(function(item) {
                if (item['notnull'] == '是') {

                    that.data.notNullID.push(item['subject_id'])

                }
            })


            res['subject'].forEach(function(item) {

                if (item['subject_type'] == "单选题") {
                    var str = item['subject_option']

                    var option = new Array(); //定义一数组 
                    var strs = str.split("❄"); //字符分割 
                    for (var i = 0; i < strs.length; i++) {
                        option.push(strs[i])
                    }

                    var radiovalue = []

                    option.forEach(function(i) {
                        var obj = {
                            value: i
                        }

                        radiovalue.push(obj)
                    })

                    var radioItem = {
                        id: item['subject_id'],
                        title: item['subject_title'],
                        notnull: item['notnull'],
                        radiovalue: radiovalue,
                    }



                    radio.push(radioItem)

                }
            })

            res['subject'].forEach(function(item) {

                if (item['subject_type'] == "多选题") {
                    var str = item['subject_option']

                    var option = new Array(); //定义一数组 
                    var strs = str.split("❄"); //字符分割 
                    for (var i = 0; i < strs.length; i++) {
                        option.push(strs[i])
                    }

                    var checkboxvalue = []

                    option.forEach(function(i) {
                        var obj = {
                            value: i
                        }

                        checkboxvalue.push(obj)
                    })

                    var checkboxItem = {
                        id: item['subject_id'],
                        title: item['subject_title'],
                        notnull: item['notnull'],
                        checkboxvalue: checkboxvalue,
                    }



                    checkbox.push(checkboxItem)

                }
            })

            res['subject'].forEach(function(item) {

                if (item['subject_type'] == "问答题") {
                    var answerItem = {
                        id: item['subject_id'],
                        title: item['subject_title'],
                        notnull: item['notnull'],

                    }
                    answer.push(answerItem)

                }
            })

            that.setData({
                book_name: res['book_name'],
                book_summary: res['book_summary'],
                create_time: res['create_time'],
                launch_name: res['launch_name'],
                radio: radio,
                checkbox: checkbox,
                answer: answer,
            })
        })
    },


    //获取单选框
    raioM: function(e) {
        var arr = {
            answer: e.detail.value,
            subject_id: e.target.dataset['id']
        }

        var that = this

        if (this.data.userAnswer.length == 0) {
            this.data.userAnswer.push(arr)

        } else {
            var flag = false
            this.data.userAnswer.forEach(function(item, index) {

                if (item['subject_id'] == arr['subject_id']) {
                    item['answer'] = arr['answer']
                    flag = true
                }
            })
            if (!flag) {
                that.data.userAnswer.push(arr)

            }

        }

        that.setData({
            userAnswer: that.data.userAnswer
        })

    },

    //获取复选框
    checkboxM: function(e) {



        var str = ''
        e.detail.value.forEach(function(item, index) {
            if (index > 0) {
                str += '❄' + item
            } else {
                str += item
            }
        })

        var arr = {
            answer: str,
            subject_id: e.target.dataset['id']
        }

        var that = this

        if (this.data.userAnswer.length == 0) {

            if (e.detail.value.length != 0) {
                this.data.userAnswer.push(arr)

            }

        } else {
            var flag = false
            this.data.userAnswer.forEach(function(item, index) {
                if (e.detail.value.length != 0) {
                    if (item['subject_id'] == arr['subject_id']) {
                        item['answer'] = arr['answer']
                        flag = true
                    }
                } else {

                    that.data.userAnswer.forEach(function (v, i) {
                        if (v['subject_id'] == arr['subject_id']) {
                            that.data.userAnswer.splice(i, 1);
                            
                        }
                    })
                }
            })
            if (!flag) {
                if (e.detail.value.length != 0) {
                    that.data.userAnswer.push(arr)
                }
            }
        }

        that.setData({
            userAnswer: that.data.userAnswer
        })


    },

    //获取问答题
    bindTextAreaBlur: function(e) {
        var that = this
        var value = e.detail.value

        var arr = {
            answer: e.detail.value,
            subject_id: e.target.dataset['id']
        }

        if (value) {
            var that = this

            if (this.data.userAnswer.length == 0) {
                this.data.userAnswer.push(arr)

            } else {
                var flag = false
                this.data.userAnswer.forEach(function(item, index) {

                    if (item['subject_id'] == arr['subject_id']) {
                        item['answer'] = arr['answer']
                        flag = true
                    }
                })
                if (!flag) {
                    that.data.userAnswer.push(arr)

                }

            }

           

        } else {
            this.data.userAnswer.forEach(function (item, index) {

                if (item['subject_id'] == arr['subject_id']) {
                    that.data.userAnswer.splice(index, 1);
                    
                }
            })
        }

        that.setData({
            userAnswer: that.data.userAnswer
        })

    },

    setIncFlow: function(id) {
        var parmes = {
            url: '/book/setincflow/' + id,
        }
        answer.request(parmes)
    },


    onShareAppMessage: function () {
        return {
            path: '/pages/questionnaire/answer/answer?id=' + this.data.id + '&flag=true',
        }
    }










})