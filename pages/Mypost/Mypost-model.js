import {
    Base
} from '../../utils/base.js'
const app = getApp()

var infoType = 'circle'
class Mypost extends Base {
    constructor() {
        super()
    }

    //获取小圆圈动态数据
    allMypost(url, id, Callback) {
        var parmes = {
            url: url,
            type: 'post',
            data: {
                user_id: id,
            },
            eCallback: function(res) {
                if (res.valid != 0) {
                    res.forEach(function(index) {
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
                } else {
                    res = null
                    Callback(res)
                }
            }
        }
        this.request(parmes)
    }


    //删除数据
    delMypost(url, id, Callback) {
        var parmes = {
            url: url,
            type: 'post',
            data: {
                id: [id],
            },
            eCallback: function(res) {
                Callback(res)
            }

        }
        this.request(parmes)
    }


}



export {
    Mypost
}