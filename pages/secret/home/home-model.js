import {
    Base
} from '../../../utils/base.js'

var app = getApp()

class Home extends Base {
    constructor() {
        super()
    }

    //上传音频
    uploadFile(recodePath, time, fn) {
        var url = this.baseRequestUrl + "secret/upaudio"

        wx.uploadFile({
            url: url,
            filePath: recodePath,
            name: 'audio',
            formData: {
                user_id: app.user.id,
                time: time,
            },
            header: {
                'content-type': 'multipart/form-data'
            },
            success: function (res) {
                var data = JSON.parse(res.data);

                if (data.valid == 1) {
                    fn && fn(data)
                }
                else {
                    wx.showModal({
                        title: '提示',
                        content: data.msg,
                        showCancel: false,
                    });
                }
            },
            fail: function (res) {
                console.log(res);
                wx.showModal({
                    title: '提示',
                    content: "网络请求失败，请确保网络是否正常",
                    showCancel: false,
                    success: function (res) {
                    }
                });
                wx.hideLoading()
            }
        })
    }

    
}

export {
    Home
}