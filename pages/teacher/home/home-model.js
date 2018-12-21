
import WxValidate from '../../../utils/WxValidate.js'

var app = new getApp()

class Home {
    //验证函数
    initValidate() {
        const rules = {
            name: {
                required: true,
            },
            numBer: {
                required: true,
            },
            psd: {
                required: true,
            },
            phone: {
                required: true,
            },
          
        }
        const messages = {
            name: {
                required: '请填写教师名称',
            },
            numBer: {
                required: '请填写教师工号',
            },
            psd: {
                required: '请填写教师密码',
            },
            phone: {
                required: '请填写教师电话',
            },
        }
        this.WxValidate = new WxValidate(rules, messages)
    }

    //添加企业认证数据
    validate(data, callback) {
        var params = {
            url: 'practice/tch/validate',
            data: data,
            type: 'POST',
            eCallback: function (res) {
                callback && callback(res);
            }


        }
        app.practiceRequest(params);
    }


}
export {
    Home
}