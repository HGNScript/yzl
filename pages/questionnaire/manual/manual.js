// pages/questionnaire/manual/manual.js

import {
    Manual
} from 'manual-model.js'

var manual = new Manual()


var app = new getApp()


Page({
    data: {
        // 题目分类下拉
        objectArray: [],
        title: null,
        launch_name: null,
        book_summary: null,
        answerData: [],
        radio: [{
                name: '必填',
                value: '是',
                checked: 'true'
            },
            {
                name: '选填',
                value: '否'
            },
        ],
        successUrl: '/pages/questionnaire/success/success',
        failureUrl: '/pages/questionnaire/success/failure',


    },
    // 题目分类下拉
    selectTap(e) {
        var that = this

        this.data.objectArray.forEach(function(item, index) {
            if (item.addida == e.currentTarget.dataset['caseid']) {

                that.data.objectArray[index]['show'] = !that.data.objectArray[index]['show']

                var data = that.data.objectArray

                that.setData({
                    objectArray: data
                })
            }
        })

    },

    //选择下拉菜单中的数据
    optionTap(e) {
        var value = e.currentTarget.dataset['value']
        var id = e.currentTarget.dataset['caseid']

        var that = this

        this.data.objectArray.forEach(function(item, index) {

            if (item.addida == id) {

                that.data.objectArray[index]['index1'] = e.currentTarget.dataset['index1']
                that.data.objectArray[index]['show'] = !that.data.objectArray[index]['show']

                var data = that.data.objectArray

                that.setData({
                    objectArray: data
                })

            }
        })

        this.data.answerData.forEach(function(item, index) {
            if (index == id) {

                that.data.answerData[index]['subject_type'] = value

                that.setData({
                    answerData: that.data.answerData,
                })
            }
        })
    },

    // 创建题目
    addToFront: function(e) {
        const length = this.data.objectArray.length
        var obj = {
            addida: length,
            show: false,
            selectData: ['单选题', '多选题', '问答题'],
            index1: 0,
        }

        var item = {
            addida: length,
            subject_title: null,
            subject_option: null,
            subject_type: '单选题',
            notnull: '是',

        }

        var flag = this.checkAnswer()
        if (!flag) {
            wx.showModal({
                title: '提示',
                content: '请填写题目信息',
            })

            return

        }


        this.data.answerData.push(item)
        this.data.objectArray.push(obj)

        this.setData({
            objectArray: this.data.objectArray,
            answerData: this.data.answerData,
        })
    },

    // 添加答案
    addbtn: function(e) {
        var that = this

        this.data.objectArray.forEach(function(item, index) {

            if (e.target.dataset['ind'] == item['addida']) {

                var answer = []

                var arr = that.data.objectArray[index]['answer']

                if (arr) {
                    that.data.objectArray[index]['answer'] = []
                    arr.forEach(function(i) {
                        that.data.objectArray[index]['answer'].push(i)

                    })
                    that.data.objectArray[index]['answer'].push(answer)

                    var data = that.data.objectArray

                    that.setData({
                        objectArray: data
                    })

                } else {
                    that.data.objectArray[index]['answer'] = []
                    that.data.objectArray[index]['answer'].push(answer)
                    var data = that.data.objectArray
                    that.setData({
                        objectArray: data,
                    })
                }

            }
        })
    },


    //获取问卷基础数据, 提交问卷
    getAnswer: function(e) {

        var that = this

        this.data.answerData.forEach(function(item, index) {

            delete that.data.answerData[index]['addida']

            var str = ''

            if (item['subject_type'] == '问答题') {
                that.data.answerData[index]['subject_option'] = ''
            } else {
                if (item['subject_option']) {
                    item['subject_option'].forEach(function(v, i) {

                        if (i == 0) {
                            str += v
                        } else {
                            str += '❄' + v
                        }
                        that.data.answerData[index]['subject_option'] = str
                    })
                }

            }

        })


        this.setData({
            title: e.detail.value.title,
            launch_name: e.detail.value.launch_name,
            book_summary: e.detail.value.book_summary,
            answerData: this.data.answerData,

        })

        if (!this.data.title || !this.data.launch_name || !this.data.book_summary || this.data.objectArray.length == 0) {
            if (!flag) {
                wx.showModal({
                    title: '提示',
                    content: '请填写问卷信息',
                })

                return

            }
        }

        var flag = this.checkAnswer()


        if (!flag) {
            wx.showModal({
                title: '提示',
                content: '请填写题目信息',
            })

            return

        }

        var url = '/book/setbooks'
        var data = {
            subjectData: this.data.answerData,
            bookData: {
                book_name: that.data.title,
                launch_name: that.data.launch_name,
                book_summary: that.data.book_summary,
                user_id: app.user['id']
            }

        }
        manual.submit(url, data, function(res) {
            if (res['valid']) {
                wx.redirectTo({
                    url: that.data.successUrl,
                })
            } else {
                wx.navigateTo({
                    url: that.data.failureUrl,
                })
            }
        })

    },

    //获取题目的数据
    getTitleValue: function(e) {
        var id = e.target.dataset['id']
        var value = e.detail['value']

        var that = this
        this.data.answerData.forEach(function(item, index) {
            if (index == id) {

                that.data.answerData[index]['subject_title'] = id + 1 + '.' + value

                that.setData({
                    answerData: that.data.answerData,
                })
            }
        })
    },

    //获取单选框的值
    radioChange: function(e) {
        var id = e.target.dataset['id']
        var value = e.detail['value']

        var that = this
        this.data.answerData.forEach(function(item, index) {
            if (index == id) {

                that.data.answerData[index]['notnull'] = value

                that.setData({
                    answerData: that.data.answerData,
                })
            }
        })
    },

    //获取选项的值
    getAnswerValue: function(e) {

        var id = e.currentTarget.dataset['id']
        var top = e.currentTarget.offsetTop
        var option = e.currentTarget.dataset['option']
        var value = e.detail['value']


        var that = this

        var item = []

        this.data.answerData.forEach(function(item, index) {
            if (index == id) {

                if (that.data.answerData[index]['subject_option']) {

                    that.data.answerData[index]['subject_option'].forEach(function(v, i) {
                        if (i == option) {
                            that.data.answerData[index]['subject_option'][i] = value
                        } else {
                            that.data.answerData[index]['subject_option'][option] = value
                        }
                    })

                } else {
                    that.data.answerData[index]['subject_option'] = []

                    that.data.answerData[index]['subject_option'][option] = value
                }

            }
        })

    },

    //长按删除题目
    longTap: function(e) {
        var id = e.currentTarget.dataset['id']

        var that = this

        wx.showModal({
            title: '提示',
            content: '您确定要删除该题目吗？',
            success: function(res) {
                if (res.confirm) {

                    that.data.objectArray.forEach(function(item, index) {
                        if (item.addida == id) {
                            that.data.objectArray.splice(id, 1)
                        }
                    })

                    that.data.answerData.forEach(function(item, index) {
                        if (item.addida == id) {
                            that.data.answerData.splice(id, 1)
                        }
                    })

                    that.setData({
                        objectArray: that.data.objectArray,
                        answerData: that.data.answerData,
                    })

                }
            }
        })
    },

    //点击删除选项
    clickTap: function(e) {
        var id = e.currentTarget.dataset['id']
        var clickindex = e.currentTarget.dataset['index']
        var that = this

        this.data.objectArray.forEach(function(item, index) {
            if (item.addida == id) {
                item.answer.forEach(function(v, i) {
                    if (i == clickindex) {
                        console.log(i)
                        that.data.objectArray[index]['answer'].splice(i, 1)

                    }
                })
            }
        })

        that.setData({
            objectArray: this.data.objectArray,
        })



    },

    //检查题目信息是否填写
    checkAnswer: function() {
        if (this.data.answerData.length != 0) {
            var flag = false

            this.data.answerData.forEach(function(item, index) {
                if (item['subject_type'] == '单选题' || item['subject_type'] == '多选题') {
                    if (item['subject_title'] && item['subject_option']) {
                        flag = true
                    } else {
                        flag = false
                    }
                } else {
                    if (item['subject_title']) {
                        flag = true
                    } else {
                        flag = false

                    }
                }
            })

            return flag

        } else {
            return true
        }

    }


})