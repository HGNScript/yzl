import {
    Base
} from '../../../utils/base.js'

var app = getApp()

class Home extends Base {
    constructor() {
        super()
    }

    // 获取热门数据
    getTop(Callback) {
        var url = 'turntable/gettop'
        var parmes = {
            url: url,
            eCallback: function (res) {

                Callback(res)
            }
        }
        this.request(parmes)
    }

    //获取指定的数据
    getIdData(id, Callback) {
        var url = 'turntable/getiddata/' + id
        var parmes = {
            url: url,
            eCallback: function (res) {

                Callback(res)
            }
        }
        this.request(parmes)
    }

    //获取用户自己的数据
    getUserData(id, Callback) {
        var url = 'turntable/getuserdata/' + id
        var parmes = {
            url: url,
            eCallback: function (res) {

                Callback(res)
            }
        }
        this.request(parmes)
    }

    //添加或收藏数据
    add(data, Callback){
        var url = 'turntable/add'
        var parmes = {
            url: url,
            type: 'post',
            data: data, 
            eCallback: function (res) {

                Callback(res)
            }
        }

        this.request(parmes)
    }

    //删除自己的数据
    del(id, Callback) {
        var url = 'turntable/del'
        var parmes = {
            url: url,
            type: 'post',
            data: {
                id: [id]
                },
            eCallback: function (res) {

                Callback(res)
            }
        }

        this.request(parmes)
    }

    //编辑数据
    edit(data, Callback) {
        var url = 'turntable/edit'
        var parmes = {
            url: url,
            type: 'post',
            data: data,
            eCallback: function (res) {

                Callback(res)
            }
        }

        this.request(parmes)
    }

    //转发量添加
    flow(id, Callback) {
        var url = 'turntable/flow/' + id
        var parmes = {
            url: url,
            eCallback: function (res) {

                Callback(res)
            }
        }

        this.request(parmes)
    }
    

}

export {
    Home
}