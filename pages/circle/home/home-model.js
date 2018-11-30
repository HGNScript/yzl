import {
    Base
} from '../../../utils/base.js'

var app = getApp()

var infoType = 'circle'

class Home extends Base {
    constructor() {
        super()
    }

    // 获取动态数据
    getCircle(url, Callback) {
        var parmes = {
            url: url,
            eCallback: function(res) {
                res.forEach(function(index) {

                    //处理点赞数据&&收藏数据

                    var bytesCount = app.getBytesCount(index.circle_content)
                    

                    if (bytesCount > 60) {
                        index.checkedFlag = true 
                    } else {
                        index.checkedFlag = false 
                    }

                    index.checked = true
                    index.goodFlag = false


                    if (index.good) {
                        index.good.forEach(function(item) {
                            if (item.user_id == app.user['id'] && item.info_type == infoType) {
                                index.goodFlag = true
                                index.goodid = item.good_id
                            }
                        })
                    }

                    if (index.img) {
                        var arr = []

                        index.img.forEach(function(item, key) {
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

    // 点赞
    good(user_id, info_id, Callback) {
        var url = "good/setincgood"
        var parmes = {
            url: url,
            type: 'post',
            data: {
                data: {
                    info_id: info_id,
                    user_id: user_id,
                    info_type: infoType,
                }
            },
            eCallback: function(res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }

    //删除点赞数据
    delGood(id, Callback) {
        var url = "good/delgood"
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
    Home
}