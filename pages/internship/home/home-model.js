import { Base } from '../../../utils/base.js';

class Home extends Base {
  constructor() {
    super();
  }

  // 获取首页学生信息
  getStudentInfo(num, callback) {
    var param = {
      url: 'internship/getStuInfo/' + num,
      eCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(param);
  }

  //获取签到状态
  siginType(num, callback) {
    var param = {
      url: 'internship/siginType/' + num,
      eCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(param);
  }

  //获取日志消息提示
  logsType(num, callback) {
    var param = {
      url: 'internship/logsType/' + num,
      eCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(param);
  }

  
}

export { Home }