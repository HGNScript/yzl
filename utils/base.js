import {
    Config
} from 'config.js'

class Base {
    constructor() {
        this.baseRequestUrl = Config.restUrl;
        this.imgUrl = Config.imgUrl;
        this.practiceUrl = Config.practiceUrl;
    }

    request(parmes) {
        var url = this.baseRequestUrl + parmes.url

        if (!parmes.type) {
            parmes.type = 'GET'
        }
        var that = this

        wx.showLoading({
            title: '请稍等',
            mask: true,
        })

        wx.request({
            url: url,
            data: parmes.data,
            method: parmes.type,
            header: {
                'content-type': 'application/json',
            },

            success: function(res) {
                wx.hideLoading();
                parmes.eCallback && parmes.eCallback(res.data)

            },
            fail: function(err) {
                wx.hideLoading();
                console.log(err)
            },
        })
    }

    
}

export {
    Base
}