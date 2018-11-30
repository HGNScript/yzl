import { Base } from '../../../utils/base.js'

class Write extends Base{
    constructor() {
        super()
    }

    getBook(url, Callback) {
        var parmes = {
            url: url,
            eCallback : function(res){
                Callback(res)
            }
        }
        this.request(parmes)
    }

    search(url, Callback) {
        var parmes = {
            url: url,
            type: 'get',
            eCallback: function (res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }
}

export {
    Write
}