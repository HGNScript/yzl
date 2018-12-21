import {
    Base
} from '../../../utils/base.js'
var infoType = 'confession'
const app = getApp()

class Inde extends Base {
    constructor() {
        super()
    }
    //获取表白墙中数据
    Confession(url, Callback) {
        var parmes = {
            url: url,
            eCallback: function(res) {
                res.forEach(function(index) {
                    index.goodFlag = false
                    if (index.good) {
                        index.good.forEach(function(item) {
                            if (item.user_id == app.user['id'] && item.info_type == infoType) {
                                index.goodFlag = true
                                index.goodid = item.good_id
                            }
                        })
                    }

                    if (index.img != null) {
                        var arr = []
                        
                        index.img.forEach(function(item) {
                            if (item.info_type == infoType) {
                                arr.push(item)
                            }
                        })

                        index.img = arr
                    }

                })
                Callback(res)
            }
        }
        this.request(parmes)
    }
    //添加点赞数据
    good(user_id, info_id, Callback) {
        var url = 'good/setIncGood'
        var parmes = {
            url: url,
            type: 'post',
            data: {
                data: {
                    info_id: info_id,
                    user_id: user_id,
                    info_type: infoType

                }
            },
            eCallback: function(res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }

    delGood(id, Callback) {
        var url = "good/delGood"
        var parmes = {
            url: url,
            type: 'post',
            data: {
                info_id: id,
                type: infoType
            },
            eCallback: function(res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }





}



export {
    Inde
}