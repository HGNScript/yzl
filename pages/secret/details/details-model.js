import {
    Base
} from '../../../utils/base.js'

var app = getApp()

class Details extends Base {
    constructor() {
        super()
    }

    //获取动态信息
    getAudiio(date, Callback) {
        var url = "secret/getaudio/" + app.user.id + '?date=' + date
        var parmes = {
            url: url,
            eCallback: function (res) {
                var date = []
                res.forEach(function(item){
  
                    if (date.indexOf(item.create_time) == -1) {
                        date.push(item.create_time)
                    }
                })

                var data = {}

                date.forEach(function(dateitem){

                    res.forEach(function(item){

                        if (dateitem == item.create_time) {
                            if (data[dateitem]) {
                                data[dateitem].push(item)
                            } else {
                                data[dateitem] = []
                                data[dateitem].push(item)
                            }
                        }
                    })
                })

                Callback(data)
            }
        }
        this.request(parmes)
    }

    


}

export {
    Details
}