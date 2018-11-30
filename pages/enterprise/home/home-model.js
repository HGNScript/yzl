import {
    Base
} from '../../../utils/base.js';
var app = getApp();
var infoType = 'recruit'
class Home extends Base {
    constructor() {
        super();
    }

    //获取类型数据
    getTypeData(callback) {
        var params = {
            url: 'company/getTypeData',
            eCallback: function(res) {
                callback && callback(res);
            }
        }
        this.request(params);
    }

    //获取首页数据
    getHomeData(url, callback) {
        var params = {
            url: url,
            eCallback: function(res) {

                res.forEach(function(index) {
                    //处理收藏&点赞数据
                    index.goodFlag = false
                    index.collectFlag = false
                    index.checked = true
                    if (index.good) {
                        index.good.forEach(function(item) {
                            if (item.user_id == app.user.id && item.info_type == 'recruit') {
                                index.goodFlag = true
                                index.goodid = item.good_id
                            }
                        })
                    }

                    if (index.collect) {
                        index.collect.forEach(function(item) {
                            if (item.user_id == app.user.id && item.info_type == 'recruit') {
                                index.collectFlag = true
                                index.collectid = item.collect_id
                            }
                        })
                    }

                    if (index.comment) {
                        var commentArr = []
                        index.comment.forEach(function(item, key) {
                            if (item.info_type == 'recruit') {
                                commentArr.push(item)
                            }
                        })

                        index.comment = commentArr
                    }
                    //处理图片
                    if (index.img) {
                        var arr = []
                        index.img.forEach(function(item, key) {
                            if (item.info_type == 'recruit') {
                                arr.push(item)
                            }
                        })

                        index.img = arr
                    }
                })
                callback && callback(res)
            }

        }
        this.request(params);
    }
    // 点赞
    good(user_id, info_id, Callback) {
        var url = "good/setIncGood"
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

    //收藏
    coller(user_id, info_id, Callback) {
        var url = "collect/addcollect"
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

    //删除收藏数据
    delColler(id, Callback) {
        var url = "collect/delcollect"
        var parmes = {
            url: url,
            type: 'post',
            data: {
                ids: id,
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