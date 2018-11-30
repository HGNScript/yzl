import { Base } from '../../../utils/base.js'

class Answer extends Base {
    constructor() {
        super()
    }

    //获取指定的问卷数据
    getBook(url, Callback) {
        var parmes = {
            url: url,
            eCallback: function (res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }

    submit(url, data, Callback) {
        var parmes = {
            url: url,
            type: 'post',
            data: {
                data:data
            },
            eCallback: function (res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }
}

export {
    Answer
}