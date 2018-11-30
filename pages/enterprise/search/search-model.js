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
            url: 'recruit/getHomeData',
            data: {
              search:data
            },
            eCallback: function(res){
                res.forEach(function (item) {

                    var str = item['company_name'].split(data);
                    item['company_name'] = str.join('<span style="color:red;">' + data + '</span>')


                    var str = item['recruit_detailed'].split(data);
                    item['recruit_detailed'] = str.join('<span style="color:red;">' + data + '</span>')


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