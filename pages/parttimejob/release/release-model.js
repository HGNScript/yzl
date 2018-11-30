import {
    Base
} from '../../../utils/base.js';
import WxValidate from '../../../utils/WxValidate.js'
class Release extends Base {
    constructor() {
        super();
    }

    //删除图片
    delImg(url, imgurl, Callback) {
        var parmes = {
            url: url,
            type: 'post',
            data: {
                url: imgurl
            },
            eCallback: function(res) {
                Callback(res)
            }
        }
        this.request(parmes)
    }

    //验证函数
    initValidate() {
        const rules = {
            job_post: {
                required: true,
            },
            job_adress: {
                required: true,
            },
            job_time: {
                required: true,
            },
            job_phone: {
                required: true,
            },

        }
        const messages = {
            job_post: {
                required: '请输入兼职意向',
            },
            job_adress: {
                required: '请输入意向地点',
            },
            job_time: {
                required: '请输入兼职时间',
            },
            job_phone: {
                required: '请输入联系电话',
            },
        }
        this.WxValidate = new WxValidate(rules, messages)
    }

    //添加兼职数据
    submitJobData(data, callback) {
        var params = {
            url: 'job/subJobData',
            data: data,
            type: 'POST',
            eCallback: function(res) {
                callback && callback(res);
            }
        }
        this.request(params);
    }

}

export {
    Release
}