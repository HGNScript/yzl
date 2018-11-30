import {
    Base
} from '../../utils/base.js'

var app = getApp()

class Index extends Base {
    constructor() {
        super()
    }


    getFm(Callback) {
        var parmes = {
            url: 'fm/getIndexData',
            eCallback: function (res) {
                res.forEach(function (index) {
                    if (index.img) {
                        var arr = []
                        index.img.forEach(function (item, key) {
                            if (item.info_type == 'fleamarket') {
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

    getrRecruit(Callback) {
        var parmes = {
            url: 'recruit/getindexdata',
            eCallback: function (res) {
                res.forEach(function(index){
                    if (index.img) {
                        var arr = []
                        index.img.forEach(function (item, key) {
                            if (item.info_type == 'recruit') {
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

    getJob(Callback, that) {
        var parmes = {
            url: 'Job/getindexdata?pStart=' + that.data.pStart + '&limit=' + that.data.limit,
            eCallback: function (res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }

    getBannerData(Callback) {
        var parmes = {
            url: 'banner/getbannerdata',
            eCallback: function (res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }

    getNoticeData(Callback) {
        var parmes = {
            url: 'notice/getNoticeData',
            eCallback: function (res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }

    getGG(Callback) {
        var parmes = {
            url: 'gg/getgg',
            eCallback: function (res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }
     

}

export {
    Index
}