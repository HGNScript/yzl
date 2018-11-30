import {
    Base
} from '../../../utils/base.js'

class Release extends Base {
    constructor() {
        super()
    }

    //提交数据
    submit(url, data, Callback) {
        var parmes = {
            url: url,
            type: 'post',
            data: {
                data: data
            },
            eCallback: function(res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }

    //删除图片
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

    //图片数据处理
    imgHandle(that) {
        that.data.imgurl.forEach(function(index) {
            index.info_type = 'circle'
            delete index.valid
            index.img_url = index.url
        })
        that.data.releaseData.imgurl = that.data.imgurl
        that.setData({
            releaseData: that.data.releaseData
        })
    }

}

export {
    Release
}