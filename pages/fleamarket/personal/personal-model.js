import {
    Base
} from '../../../utils/base.js'

var app = getApp()

class Personal extends Base {
    constructor() {
        super()
    }

    // 获取用户数据
    getUserInfo(url, Callback) {
        var parmes = {
            url: url,
            eCallback: function (res) {
                
                res.circle.sort(function (a, b) {
                    return b.circle_id - a.circle_id;
                })

                res.fm.sort(function (a, b) {
                    return b.fleamarket_id - a.fleamarket_id;
                })

                res.recruit.sort(function (a, b) {
                    return b.recruit_id - a.recruit_id;
                })

                Callback(res)

                
            }
        }
        this.request(parmes)
    }


}

export {
    Personal
}