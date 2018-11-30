import {
  Base
} from '../../../utils/base.js'

class Details extends Base {
  constructor() {
    super()
  }

  getNoticeData(id,Callback) {
    var parmes = {
      url: 'notice/getNoticeData?id='+id,
      eCallback: function (res) {
        Callback(res)
      }
    }
    this.request(parmes)
  }
}

export { Details}  