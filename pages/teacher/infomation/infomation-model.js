var app = new getApp()

class Infomation {

    getTchInfo(that, callback){
        var params = {
            url: 'practice/tch/gettchinfo?tch_id=' + that.data.tch_id + '&type=' + that.data.tch_type,
            eCallback: function (res) {
                callback && callback(res);
            }


        }
        app.practiceRequest(params);
    }

}
export {
    Infomation
}