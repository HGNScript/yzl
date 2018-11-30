import {
    Base
} from '../../../utils/base.js'
import WxValidate from '../../../utils/WxValidate.js'
class Certification extends Base {
    constructor() {
        super()
    }

    getSchoolData(callback) {
        var param = {
            url: 'school/getschooldata',
            eCallback: function(data) {
                callback && callback(data);
            }
        }
        this.request(param);
    }
    submitFrom(data, callback) {
        var param = {
            url: 'student/checkstudent',
            data: data,
            type: 'POST',
            eCallback: function(data) {
                callback && callback(data);
            }
        }
        this.request(param);
    }
    //验证函数
    initValidate() {
        const rules = {
            stu_name: {
                required: true,
            },
            stu_major: {
                required: true,
            },
            stu_class: {
                required: true,
            },
            stu_number: {
                required: true,
            },
            psd: {
                required: true,
            },
        }
        const messages = {
            stu_name: {
                required: '请填写姓名',
            },
            stu_major: {
                required: '请填写专业',
            },
            stu_class: {
                required: '请填写班级',
            },
            stu_number: {
                required: '请填写学号',
            },
            psd: {
                required: '请填写实习系统登录密码',
            }
        }
        this.WxValidate = new WxValidate(rules, messages)
    }
}

export {
    Certification
}