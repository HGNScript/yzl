var app = new getApp()

class Survey {

    //获取教师数据
    getTchInfo(that, callback) {
        var params = {
            url: 'practice/tch/gettchinfo?tch_id=' + that.data.tch_id + '&type=' + that.data.tch_type,
            eCallback: function(res) {
                callback && callback(res);
            }


        }
        app.practiceRequest(params);
    }

    //获取实习数据
    getPracticeData(that, callback) {
        var params = {
            url: 'practice/data/getpracticedata?tch_id=' + that.data.tch_id,
            eCallback: function(res) {
                callback && callback(res);
            }


        }
        app.practiceRequest(params);
    }

    //获取变更数据
    getChange(that, callback) {
        var params = {
            url: 'practice/getchange?start=' + that.data.start + '&limit=' + that.data.limit + '&tch_id=' + that.data.tch_id,
            eCallback: function (res) {
                callback && callback(res);
            }


        }
        app.practiceRequest(params);
    }

    changeStatus(change_id, callback) {
        var params = {
            url: 'practice/changestatus',
            type: 'post',
            data: { "change_id": change_id },
            eCallback: function (res) {
                callback && callback(res);
            }


        }
        app.practiceRequest(params);
    }

}
export {
    Survey
}