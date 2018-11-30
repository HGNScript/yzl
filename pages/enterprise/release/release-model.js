import { Base } from '../../../utils/base.js';
import WxValidate from '../../../utils/WxValidate.js'
class Release extends Base{
  constructor() {
    super();
  }

  //验证函数
  initValidate() {
    const rules = {
      recruit_post: {
        required: true,
      },
      recruit_demand: {
        required: true,
      },
      recruit_number: {
        required: true,
      },
      recruit_wages: {
        required: true,
      },
      contact_name: {
        required: true,
      },
      contact_number: {
        required: true,
      },
      recruit_detailed: {
        required: true,
      },
    }
    const messages = {
      recruit_post: {
        required: '请输入招聘岗位',
      },
      recruit_demand: {
        required: '请输入学历要求',
      },
      recruit_number: {
        required: '请输入招聘人数',
      },
      recruit_wages: {
        required: '请输入工资待遇',
      },
      contact_name: {
        required: '请输入联系人姓名',
      },
      contact_number: {
        required: '请输入联系人电话',
      },
      recruit_detailed: {
        required: '请输入招聘详情',
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  }

  //删除图片
  delImg(url, imgurl, Callback) {
    var parmes = {
      url: url,
      type: 'post',
      data: {
        url: imgurl
      },
      eCallback: function (res) {
        Callback(res)
      }
    }
    this.request(parmes)
  }
  //添加企业招聘数据
  addReleaseData(data, callback) {
    var params = {
      url: 'recruit/addRecruit',
      data: data,
      type: 'POST',
      eCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }
}
export {Release}