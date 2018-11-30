import {
    Base
} from '../../../utils/base.js'

import WxValidate from '../../../utils/WxValidate.js'

class Release extends Base {
    constructor() {
        super()
    }

    //提交数据
    submit(that, Callback) {
        var url = 'fm/addfm'
        
        var parmes = {
            url: url,
            type: 'post',
            data: {
                data: {
                    fm: that.data.fleamarket,
                    imgurl: that.data.imgurl
                }
            },
            eCallback: function (res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }

    //获取分类数据
    getCate(Callback) {
        var url = 'fmcate/getacate'
        var parmes = {
            url: url,
            eCallback: function (res) {
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
        that.data.imgurl.forEach(function (index) {
            index.info_type = 'fleamarket'
            delete index.valid
            index.img_url = index.url
        })
        that.setData({
            imgurl: that.data.imgurl
        })
    }

    //验证函数
    initValidate() {
        const rules = {
            fleamarket_title: {
                required: true,
            },
            fleamarket_number: {
                required: true,
            },
            fleamarket_content: {
                required: true,
            },
            fleamarket_price: {
                required: true,
            },
            fleamarket_phone: {
                required: true,
            },
           
           
        }
        const messages = {
            fleamarket_title: {
                required: '请填写物品名称',
            },
            fleamarket_number: {
                required: '请填写物品数量',
            },
            fleamarket_content: {
                required: '请填写物品简介',
            },
            fleamarket_price: {
                required: '请填售价',
            },
            fleamarket_phone: {
                required: '请填写联系方式',
            },
        }

        this.WxValidate = new WxValidate(rules, messages)
    }
}

export {
    Release
}