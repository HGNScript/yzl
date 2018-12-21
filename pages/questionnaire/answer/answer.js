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

        saveFrameFlag: false,

        //画布--------------------------------
        canvasWidth: 400,
        canvasHeight: 650,
        showCanvasFlag: false,

        eweimaUrl: '../../../image/erweima.png',


        colorArr: [
            '#EE534F',
            '#FF7F50',
            '#FFC928',
            '#66BB6A',
            '#42A5F6',
            '#5C6BC0',
            '#AA47BC',
            '#EC407A',
            '#FFB6C1',
            '#FFA827'
        ],

        colorArr: [
            '#EE534F',
            '#FF7F50',
            '#FFC928',
            '#66BB6A',
            '#42A5F6',
            '#5C6BC0',
            '#AA47BC',
            '#EC407A',
            '#FFB6C1',
            '#FFA827'
        ],
        fontArr: ['italic', 'oblique', 'normal'],
        sizeArr: [12, 14, 16, 18, 20, 22, 24, 26, 28],
    },



    onLoad: function(e) {

        var that = this

       

        if (e.share || e.scene) {
            if (e.share) {
                var id = e['id'];
                var flag = e['flag'];

                that.setData({
                    book_id: id,
                    flag: flag,
                    id: id,
                    share: e.share
                })
                app.share(this, function(flag) {
                    if (flag) {
                        that.setIncFlow(id)
                        that.getBook(id);
                    }
                })

            } else {

                var id = e.scene;
                
                that.setData({
                    book_id: id,
                    flag: 'true',
                    id: id,
                    share: true
                })
                app.share(this, function(flag) {
                    if (flag) {
                        that.setIncFlow(e.scene)
                        that.getBook(e.scene);
                    }
                })
            }


        } else {

            var id = e['id'];
            var flag = e['flag'];

            that.setData({
                book_id: id,
                flag: flag,
                id: id,
                scene: decodeURIComponent(e.scene)

            })

            app.checkUser(function() {
                that.setIncFlow(id)
                that.getBook(id);
            })
        }






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

                        setTimeout(function() {
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

                    that.data.userAnswer.forEach(function(v, i) {
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
            this.data.userAnswer.forEach(function(item, index) {

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


    onShareAppMessage: function() {
        return {
            path: '/pages/questionnaire/answer/answer?id=' + this.data.id + '&flag=true' + '&share=' + true,
        }
    },

    //登录
    getUserInfo: function(e) {
        var that = this

        app.shareLogin(this, e, function() {
            var fn = null
            that.setIncFlow(that.data.book_id)
            that.getBook(that.data.book_id);
        })


    },

    //分享图片
    makeImageCanvas: function(canvasName, title, textArr, colorArr, fontArr, sizeArr, num, rowNum, distance, spacing, canvasWidth, canvasHeight, midWidth, midHeight, imgUrl, fn) {
        var that = this


        var data = {
            "page": "pages/questionnaire/answer/answer",
            "id": that.data.id
        }
        app.getWXACodeUnlimit(data, function(res) {


            wx.getImageInfo({
                src: res,
                success: function(ret) {
                    var path = ret.path;

                    wx.showLoading({
                        title: '正在生成图片',
                        mask: 'true'
                    })

                    if (ret) {
                        imgUrl = path
                    }
                    var contentArr = [];
                    for (var a = 0; a < num; a++) {
                        var neirong = that.arrayRandomTakeOne(textArr); //内容
                        contentArr.push(neirong['subject_title']);
                    }

                    const ctx = wx.createCanvasContext(canvasName)
                    ctx.clearRect(0, 0, canvasWidth, canvasHeight) //清除画布区域内容
                    ctx.setFillStyle('white') //填充背景色--白色
                    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

                    var daxiaoArr = [];
                    for (var i = 0; i < contentArr.length; i++) {
                        var hang = parseInt(i / rowNum) + 1; //第几行
                        var hangDj = i % rowNum; //每行第几
                        var yanse = that.arrayRandomTakeOne(colorArr); //颜色
                        var ziti = that.arrayRandomTakeOne(fontArr); //字体
                        var daxiao = that.arrayRandomTakeOne(sizeArr); //大小
                        daxiaoArr.push(daxiao);
                        //console.log(yanse, ziti, daxiao);

                        var rowStart = 0; //水平起点
                        var columnStart = hang * spacing; //竖直起点

                        if (hangDj == 0) {
                            rowStart = 0;
                        } else if (hangDj > 0) {
                            for (var e = 1; e < hangDj + 1; e++) {
                                rowStart = rowStart + contentArr[i - e].length * daxiaoArr[i - e];
                            }
                            rowStart = rowStart + distance * hangDj;
                        }
                        //console.log('起点', rowStart);

                        ctx.fillStyle = yanse; //字体颜色
                        ctx.font = ziti + ' small-caps normal ' + daxiao + 'px Arial';
                        ctx.fillText(contentArr[i], rowStart, columnStart)
                    }

                    // 答案内容
                    ctx.setFillStyle('white'); //填充背景色--白色
                    ctx.setGlobalAlpha(1); //透明度

                    // 标题框位置
                    // ctx.fillRect((canvasWidth - midWidth) / 2, (canvasHeight - midHeight) / 2, midWidth , midHeight)
                    ctx.fillRect(canvasWidth - 380, (canvasHeight - midHeight - 50), canvasWidth - midWidth + 80, midHeight / 1.5)



                    var titleHeight = midHeight - 10 - midWidth; //=270

                    // ctx.font = 'normal small-caps normal ';
                    // 标题
                    var titleArr = title;
                    ctx.setTextAlign('center');
                    ctx.setFontSize(26);
                    ctx.fillStyle = '#000'; //字体颜色
                    ctx.fillText(titleArr, canvasWidth / 2, canvasHeight - 390)

                    ctx.drawImage(imgUrl, (canvasWidth - midWidth) / 2 + 5, canvasHeight - (midWidth + (canvasHeight - midHeight) / 1.1), midWidth - 10, midWidth - 10) //二维码

                    ctx.draw()

                    fn && fn()
                }
            })



        })
    },

    //关闭保存图片的框
    closeSaveFrame: function() {
        var that = this;
        that.setData({
            saveFrameFlag: false,
        });
    },

    //保存图片
    saveImage: function(res) {
        var that = this;
        var filePath = that.data.shengchengUrl;

        wx.showLoading({
            title: '请稍等',
            mask: 'true'
        })
        // 授权保存图片
        wx.getSetting({
            success(res) {
                wx.saveImageToPhotosAlbum({
                    filePath: filePath,
                    success: function(res) {
                        wx.hideLoading()
                        wx.showToast({
                            title: '保存图片成功！',
                            icon: 'success',
                            duration: 1500,
                            mask: true,
                        })
                    },
                    fail: function(res) {
                        wx.hideLoading()
                        wx.showToast({
                            title: '保存图片失败！',
                            icon: 'none',
                            duration: 1500,
                            mask: true,
                        })
                    }
                })
            }
        })
    },



    //数组随机取出一个数
    arrayRandomTakeOne: function(array) {
        var index = Math.floor((Math.random() * array.length + 1) - 1);
        return array[index];
    },

    share: function() {
        wx.showLoading({
            title: '正在生成图片',
            mask: 'true'
        })

        var that = this
        that.setData({
            showCanvasFlag: true,

        })

        setTimeout(function() {
            that.makeImageCanvas('shareCanvas', that.data.book_name, that.data.arr, that.data.colorArr, that.data.fontArr, that.data.sizeArr, 600, 20, 20, 40, that.data.canvasWidth, that.data.canvasHeight, 120, 400, that.data.eweimaUrl, function() {
                setTimeout(function() {
                    wx.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: that.data.canvasWidth,
                        height: that.data.canvasHeight,
                        canvasId: 'shareCanvas',
                        success: function(res) {
                            that.setData({
                                showCanvasFlag: false,
                                saveFrameFlag: true,
                                shengchengUrl: res.tempFilePath,
                            })

                            wx.hideLoading();
                        }
                    })
                }, 1200)

            });
        }, 800)

    }










})