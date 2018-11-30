import {
    Base
} from '../../utils/base.js'

var app = getApp()

var infoType = 'feedback'

class Feedback extends Base {
    constructor() {
        super()
    }

    submit(data, Callback) {
        var url = 'feedback/add'

        var parmes = {
            url: url,
            type: 'post',
            data: data,
            eCallback: function (res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }


    delImg(url, imgurl, Callback) {
        var parmes = {
            url: url,
            type: 'post',
            data: {
                url: imgurl
            },
            eCallback: function (res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }


}

export {
    Feedback
}