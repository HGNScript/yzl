import {
    Base
} from '../../../utils/base.js'

var app = getApp()

class Search extends Base{

    constructor() {
        super()
    }

    getSearchData(data, Callback){

        var parmes = {
            url: 'fm/searchFms',
            type: 'post',
            data: {
                data: data
            },
            eCallback: function(res){
                res.forEach(function(item){

                    var str = item['fleamarket_title'].split(data.search);
                    item['fleamarket_title'] = str.join('<span style="color:red;">' + data.search + '</span>')


                    var str = item['fleamarket_content'].split(data.search);
                    item['fleamarket_content'] = str.join('<span style="color:red;">' + data.search + '</span>')


                })

                Callback && Callback(res)
            }
        }

        this.request(parmes)

    }

}

export {
    Search
}