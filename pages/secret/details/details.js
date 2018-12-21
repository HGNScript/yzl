import {
    Details
} from 'details-model.js'

var details = new Details()

Page({
    data: {
        audio: null,
        clickimg: '/image/k.png',
        onimg: '/image/g.png',
        imgHoverIndex: null,
        pkey: null,
        date: '',
        icon: '/image/l.png' ,
        audioFlag: false,
        audio: {}
    },

    onLoad: function() {
        var that = this
        details.getAudiio(this.data.date, function(data) {
            if (Object.keys(data).length) {
                that.setData({
                    audio: data
                })
            } else {
                that.setData({
                    audio: null
                })
            }
        })
    },

    blur: function(){
        console.log(1)
    },

    chooseThis(e) {
        wx.showLoading({
            title: '请稍等',
        })
        var that = this
        this.setData({
            imgHoverIndex: e.currentTarget.dataset.index,
            pkey: e.currentTarget.dataset.pkey
        })

        var back = wx.getBackgroundAudioManager()
        back.src = e.currentTarget.dataset.url
        back.title = '猿周率树洞录音'

        this.setData({
            back: back
        })
        console.log(e.currentTarget.dataset.url)

        back.play();
        back.onPlay(() => {
            
            wx.hideLoading()
            that.setData({
                audioFlag: true,
            })
        })
        back.onEnded(() => {
            that.setData({
                imgHoverIndex: null,
                audioFlag: false,
                pkey: null,
            })

            
        })
        back.onError(() => {
            wx.hideLoading()
            that.setData({
                audioFlag: false,
            })
            wx.showModal({
                title: '提示',
                content: '音频播放出现异常',
                showCancel: false,//是否显示取消按钮
                success: function (res) {
                    if (res.cancel) {
                    } else {
                        that.setData({
                            imgHoverIndex: null,
                            audioFlag: false,
                            pkey: null,
                        })
                    }
                },
    
            })

            
        })
        
    },

    //获取时间
    bindDateChange: function(e){
        var that = this

        this.setData({
            date: e.detail.value,
        })

        details.getAudiio(this.data.date, function (data) {
            if (Object.keys(data).length) {
                that.setData({
                    audio: data
                })
            } else {
                that.setData({
                    audio: null
                })
            }
           
        })
    },


    mask: function() {
        this.data.back.stop()

        this.data.back.onStop(() =>{
            this.setData({
                imgHoverIndex: null,
                audioFlag: false,
                pkey: null,
            })
        })
        
    }
})