import {
  Base
} from '../../../utils/base.js'

class Details extends Base {
  constructor() {
    super()
  }

  getShareData(id,callback){
    var params = {
      url: 'share/getShare?id='+id,
      eCallback:function(res){
        callback && callback(res)
      }
    }
    this.request(params);
  }

  //浏览量自增
  setIncFlow(id, Callback) {
    var url = 'share/setIncFlow?id=' + id
    var parmes = {
      url: url,
      eCallback: function (res) {
        Callback(res)
      }
    }
    this.request(parmes)
  }
}
export{
  Details
}