import {
  Base
} from '../../../utils/base.js';
var app = getApp();
class Home extends Base {
  constructor() {
    super();
  }

  getShareData(callback) {
    var params = {
      url: 'share/getShare',
      eCallback: function(res) {
        callback && callback(res)
      }
    }
    this.request(params);
  }

  fuzzQueryData(keyword, callback) {
    var params = {
      url: 'share/fuzzyQuery',
      type: 'POST',
      data: {
        keyword: keyword
      },
      eCallback: function(res) {
        if(res){
          res.forEach(function (item) {

            var str = item['share_title'].split(keyword);
            item['share_title'] = str.join('<span style="color:red;">' + keyword + '</span>')


            var str = item['share_content'].split(keyword);
            item['share_content'] = str.join('<span style="color:red;">' + keyword + '</span>')


          })
        }
       
        callback && callback(res)
      }
    }
    this.request(params);
  }
}
export {
  Home
}