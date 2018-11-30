import { Base } from '../../../utils/base.js'


class Manual extends Base {
    constructor() {
        super()
    }

    submit(url, data, Callback) {
        var parmes = {
            url: url,
            data: data,
            type: 'post',
            eCallback: function (res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }

   
}

export {
    Manual
}