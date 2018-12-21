import {
    Base
} from '../../utils/base.js'

var base = new Base()


var app = getApp();

var socketOpen = false;
var frameBuffer_Data, session, SocketTask;
var url = 'wss://gzysr.cn/wss';
var upload_url = base.baseRequestUrl + 'bc/upimg'
Page({
    data: {
        user_input_text: '', //用户输入文字
        inputValue: '',
        returnValue: '',
        //格式示例数据，可为空
        allContentList: [],
        people: 0,
        user_name: [],
        user_id: null,
        imgurl: [],
        addImg: false,
        outFlag: false,
    },
    onLoad: function() {
        app.getH(this)
        this.refreshView = this.selectComponent("#refreshView")

    },

    onReady: function(e) {
        var that = this;

        app.checkUser(function() {
            that.setData({
                user_id: app.user['id']
            })
            if (!socketOpen) {
                that.webSocket()
            }

            SocketTask.onOpen(res => {
                socketOpen = true;
                var data = {
                    user_name: app.user['user_name']
                }
                sendSocketMessage(data)
                console.log('监听 WebSocket 连接打开事件。', res)


            })
            SocketTask.onClose(onClose => {
                that.setData({
                    allContentList: [],
                    outFlag: true
                })
                console.log('监听 WebSocket 连接关闭事件。', onClose)
                socketOpen = false;
            })
            SocketTask.onError(onError => {
                socketOpen = false
                wx.showModal({
                    title: '提示',
                    content: '连接失败,是否重新连接',
                    success: function(res) {
                        if (res.confirm) {
                            SocketTask.close(function(close) {
                                console.log('关闭 WebSocket 连接。', close)
                            })
                            that.onReady()
                        }
                    }
                })

            })
            SocketTask.onMessage(onMessage => {
                if (JSON.parse(onMessage['data']).constructor == Object) {
                    that.data.allContentList.push(JSON.parse(onMessage['data']))
                    that.setData({
                        allContentList: that.data.allContentList
                    })
                    // that.bottom()
                } else {
                    that.setData({
                        people: JSON.parse(onMessage['data'])
                    })
                }


                that.setData({
                    toViewRt: 't1'
                })


            })
        })

    },

    webSocket: function() {
        var that = this
        // 创建Socket
        SocketTask = wx.connectSocket({
            url: url,
            header: {
                'content-type': 'application/json'
            },
            method: 'post',
            success: function(res) {
                that.setData({
                    outFlag: false
                })
                console.log('WebSocket连接创建', res)
            },
            fail: function(err) {
                wx.showToast({
                    title: '网络异常！',
                })
                console.log(err)
            },
        })
    },

    // 提交文字
    submitTo: function(e) {
        this.setData({
            toViewRt: null,
        })
        let that = this;
        var data = {
            text: that.data.inputValue,
            user_name: app.user['user_name'],
            user_id: app.user['id'],
            imageUrl: app.user['imageUrl'],
        }


        if (socketOpen) {
            // 如果打开了socket就发送数据给服务器

            if (that.data.inputValue) {
                var parmes = {
                    url: 'bc/enation',
                    type: 'post',
                    data: {
                        str: that.data.inputValue
                    },
                    eCallback: function(res) {
                        if (res['valid']) {
                            sendSocketMessage(data)
                            that.setData({
                                inputValue: '',
                                toViewRt: 't1'
                            })

                            that.setData({
                                toViewRt: ''
                            })
                          
                        } else {
                            wx.showModal({
                                title: '警告',
                                content: res['msg'],
                            })
                        }
                    }


                }
                base.request(parmes)

            } else {
                wx.showModal({
                    title: '提示',
                    content: '请输入内容',
                    showCancel: false,
                })
            }




        } else {
            wx.showModal({
                title: '提示',
                content: '你已退出聊天室，请在顶部下拉页面，重新进入聊天室',
                showCancel: false, //是否显示取消按钮
                success: function(res) {

                },

            })
        }
    },
    bindKeyInput: function(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },

    // onUnload: function() {
    //     SocketTask.close(function(close) {
    //         console.log('关闭 WebSocket 连接。', close)
    //     })
    // },

    upimg: function() {
        var that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            success: function(res) {
                that.setData({
                    img: res.tempFilePaths
                })
                that.upimgFile(res.tempFilePaths)

            }
        })
    },

    upimgFile: function(data) {
        var that = this,
            i = data.i ? data.i : 0, //当前上传的哪张图片
            success = data.success ? data.success : 0, //上传成功的个数
            fail = data.fail ? data.fail : 0; //上传失败的个数

        if (i == 0) {
            that.setData({
                imgurl: [],
            })
        }

        wx.uploadFile({
            url: upload_url,
            filePath: data[i],
            name: 'images', //这里根据自己的实际情况改
            formData: {
                id: app.user['id'],
                flag: 'chat'
            },
            success: (res) => {
                success++; //图片上传成功，图片上传成功的变量+1
                that.data.imgurl.push(JSON.parse(res.data))

                that.setData({
                    imgurl: that.data.imgurl,
                })
            },
            fail: (res) => {
                fail++; //图片上传失败，图片上传失败的变量+1
                console.log(res)

            },
            complete: (res) => {

                i++; //这个图片执行完上传后，开始上传下一张


                if (i == data.length) { //当图片传完时，停止调用      
                    var parmes = {
                        url: 'bc/pa',
                        type: 'post',
                        data: {
                            data: that.data.imgurl
                        },
                        eCallback: function(res) {

                            if (res['valid']) {
                                sendSocketMessage({
                                    img: that.data.imgurl,
                                    user_name: app.user['user_name'],
                                    user_id: app.user['id'],
                                    imageUrl: app.user['imageUrl'],
                                })

                                that.setData({
                                    toViewRt: 't1'
                                })

                            } else {
                                wx.showModal({
                                    title: '警告',
                                    content: '图片含有敏感内容',
                                })
                            }
                        }
                    }
                    base.request(parmes)

                } else { //若图片还没有传完，则继续调用函数
                    data.i = i;
                    data.success = success;
                    data.fail = fail;
                    that.upimgFile(data);
                }

            }

        });
    },

    img: function(e) {
        wx.previewImage({
            current: e.currentTarget.dataset['imgurl'], // 当前显示图片的http链接
            urls: [e.currentTarget.dataset['imgurl']] // 需要预览的图片http链接列表
        })
    },

    //触摸开始
    handletouchstart: function(event) {
        this.refreshView.handletouchstart(event)
    },
    //触摸移动
    handletouchmove: function(event) {
        this.refreshView.handletouchmove(event)
    },
    //触摸结束
    handletouchend: function(event) {
        this.refreshView.handletouchend(event)
    },
    //触摸取消
    handletouchcancel: function(event) {
        this.refreshView.handletouchcancel(event)
    },
    //页面滚动
    onPageScroll: function(event) {
        this.refreshView.onPageScroll(event)
    },
    _pullState: function(event) {

    },

    //下拉重新加载聊天室
    onPullDownRefresh: function() {
        if (!socketOpen) {
            this.onReady()
            wx.stopPullDownRefresh()
        } else {
            wx.stopPullDownRefresh()
        }

        this.refreshView.stopPullRefresh()

    },

    onShareAppMessage: function() {
        return {
            title: '猿周率',
            path: '/pages/chat/chat'
        }
    }

})

//通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
function sendSocketMessage(msg) {
    var that = this;

    SocketTask.send({
        data: JSON.stringify(msg)
    })
}