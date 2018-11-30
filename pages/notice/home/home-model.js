import {
  Base
} from '../../../utils/base.js';
var app = getApp();
class Home extends Base {
  constructor() {
    super();
  }

  getNoticeData(Callback) {
    var parmes = {
      url: 'notice/getNoticeData',
      eCallback: function (res) {
        Callback(res)
      }
    }
    this.request(parmes)
  }

  fuzzQueryData(keyword, callback) {
    var params = {
      url: 'notice/fuzzyQuery',
      type: 'POST',
      data: {
        keyword: keyword
      },
      eCallback: function (res) {
        if (res) {
          res.forEach(function (item) {

            var str = item['notice_title'].split(keyword);
            item['notice_title'] = str.join('<span style="color:red;">' + keyword + '</span>')


            var str = item['notice_text'].split(keyword);
            item['notice_text'] = str.join('<span style="color:red;">' + keyword + '</span>')


          })
        }

        callback && callback(res)
      }
    }
    this.request(params);
  }
}
export{
  Home
}  