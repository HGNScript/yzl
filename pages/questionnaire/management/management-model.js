import { Base } from '../../../utils/base.js'

class Management extends Base{
    constructor(){
        super()
    }

    getUserBooks(url, Callback) {
        var parmes = {
            url: url,
            eCallback: function (res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }
    //下载问卷
    download(url, Callback){
        var parmes = {
            url: url,
            eCallback: function (res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }

    //删除
    deleteBook(book_id, url, Callback) {
        var parmes = {
            url: url,
            type: 'post',
            data: { id: [book_id]},
            eCallback: function (res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }


}

export {
    Management
}