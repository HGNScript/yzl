var app = new getApp()

class Classm {
    //获取实习数据
    getClassData(that, callback) {
        var params = {
            url: 'practice/getClassdata?tch_id=' + that.data.tch_id,
            eCallback: function (res) {
                res.forEach(function (item, index) {

                    item.sum = item.company.length
                    var company = 0
                    var identical = 0

                    item.company.forEach(function (citem) {
                        if (citem.company) {
                            company++
                        }
                        if (citem.company && citem.company.company_identical == "是") {
                            identical++
                        }
                    })

                    item.identical = {
                        "y": identical,
                        "n": item.sum - identical
                    }

                    item.company = {
                        "y": company,
                        "n": item.sum - company
                    }

                    item.signIn = {
                        "y": item.signIn,
                        "n": item.sum - item.signIn
                    }

                    item.logs = {
                        "y": item.logs,
                        "n": item.sum - item.logs
                    }


                })
                
                callback && callback(res);
            }


        }
        app.practiceRequest(params);
    }

}
export {
    Classm
}