import {
  Base
} from '../../utils/base.js'

var app = getApp()

class Mycollection extends Base {
  constructor() {
    super()
  }
  //获取动态数据
  allMycollection(url, infoType,Callback) {
    var parmes = {
      url: url,
      type: 'get',
      data: {
        info_type: infoType,
      },
      eCallback: function (res) {

          res.forEach(function(index){
              var carr = []
              index.collect.forEach(function (item, key) {
                  if (item.info_type == infoType) {
                      carr.push(item)
                  }
              })

              index.collect = carr

              if (index.img) {
                  var arr = []

                  index.img.forEach(function (item, key) {
                      if (item.info_type == infoType) {
                          arr.push(item)
                      }
                  })
                  index.img = arr
              }
          })

        Callback(res)
      }
    }
    this.request(parmes)

  }
  //删除收藏数据
  delMycollection(id, Callback) {
    var url = "collect/delcollect"
    var parmes = {
      url: url,
      type: 'post',
      data: {
        ids: id,
      },
      eCallback: function (res) {
        Callback(res)
      }
    }
    this.request(parmes)
  }

}
export {
  Mycollection
}