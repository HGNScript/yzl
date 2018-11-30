import {
    Base
} from '../../../utils/base.js';

import WxValidate from '../../../utils/WxValidate.js'

class Certification extends Base {
    constructor() {
        super();
    }

    //获取类型数据
    getTypeData(callback) {
        var params = {
            url: 'company/getTypeData',
            eCallback: function(res) {
                callback && callback(res);
            }
        }
        this.request(params);
    }

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
            company_name: {
                required: true,
            },
            corporation_name: {
                required: true,
            },
            company_phone: {
                required: true,
            },
            id_card: {
                required: true,
            },
            company_address: {
                required: true,
            },
            company_synopsis: {
                required: true,
            },
            company_logo: {
                required: true,
            },
            business_licence: {
                required: true,
            },
        }
        const messages = {
            company_name: {
                required: '请填写企业名称',
            },
            corporation_name: {
                required: '请填写法人姓名',
            },
            company_phone: {
                required: '请填写企业联系方式',
            },
            id_card: {
                required: '请填写身份证',
            },
            company_address: {
                required: '请填写企业地址',
            },
            company_synopsis: {
                required: '请填写企业简介',
            },
            company_logo: {
                required: '请上传企业Logo',
            },
            business_licence: {
                required: '请上传营业执照',
            },
        }
        this.WxValidate = new WxValidate(rules, messages)
    }

    //添加企业认证数据
    addCompanyData(data, callback) {
        var params = {
            url: 'company/attestation',
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
    Certification
}