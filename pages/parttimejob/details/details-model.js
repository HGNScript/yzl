import {
  Base
} from '../../../utils/base.js';

var app = getApp()
var infoType = 'job'
class Details extends Base {
  constructor() {
    super();
  }
  getJobData(job_id, callback) {
    var params = {
      url: 'job/getJobData?job_id=' + job_id,
      eCallback: function (res) {

        //处理点赞数据&&收藏数据

        res.goodFlag = false
        res.collectFlag = false
        if (res.good) {
          res.good.forEach(function (item) {
            if (item.user_id == app.user.id && item.info_type == 'job') {
              res.goodFlag = true
              res.goodid = item.good_id
            }
          })
        }

        if (res.collect) {
          res.collect.forEach(function (item) {
            if (item.user_id == app.user.id && item.info_type == 'job') {
              res.collectFlag = true
              res.collectid = item.collect_id
            }
          })
        }
        callback && callback(res)
      }
    }
    this.request(params)
  }

  //发布动态
  submit(data, Callback) {
    var url = 'comment/addcomment'
    if (data['pid']) {
      var post = {
        user_id: data['user_id'],
        info_id: data['info_id'],
        comment_content: data['value'],
        info_type: infoType,
        comment_pid: data['pid'],
        comment_uid: data['uid']
      }
    } else {
      var post = {
        user_id: data['user_id'],
        info_id: data['info_id'],
        comment_content: data['value'],
        info_type: infoType,
      }
    }
    var parmes = {
      url: url,
      type: 'post',
      data: {
        data: post
      },
      eCallback: function (res) {

        Callback(res)
      }
    }
    this.request(parmes)
  }

  //获取评论信息
  getComment(id, Callback) {
    var url = 'comment/getcoment?id=' + id + '&type=' + infoType
    var parmes = {
      url: url,
      eCallback: function (res) {



        var pid = []

        res.forEach(function (item) {

          if (item.comment_pid == 0) {
            item['son'] = []

            item['reply'] = true
            pid.push(item)
          }

        })
        pid.forEach(function (item) {
          res.forEach(function (value, index) {
            if (value.comment_pid == item.comment_id) {
              item['son'].push(value)

            }
          })

        })

        Callback(pid)
      }
    }
    this.request(parmes)
  }
  //浏览量自增
  setIncFlow(id, Callback) {
    var url = 'job/setincflow/' + id
    var parmes = {
      url: url,
      eCallback: function (res) {
        Callback(res)
      }
    }
    this.request(parmes)
  }

  // 点赞
  good(user_id, info_id, Callback) {
    var url = "good/setIncGood"
    var parmes = {
      url: url,
      type: 'post',
      data: {
        data: {
          info_id: info_id,
          user_id: user_id,
          info_type: infoType
        }
      },
      eCallback: function (res) {
        Callback(res)
      }
    }
    this.request(parmes)
  }

  //删除点赞数据
  delGood(id, Callback) {
    var url = "good/delGood"
    var parmes = {
      url: url,
      type: 'post',
      data: {
        info_id: id,
        type: infoType
      },
      eCallback: function (res) {
        Callback(res)
      }
    }
    this.request(parmes)
  }

  //收藏
  coller(user_id, info_id, Callback) {
    var url = "collect/addcollect"
    var parmes = {
      url: url,
      type: 'post',
      data: {
        data: {
          info_id: info_id,
          user_id: user_id,
          info_type: infoType
        }
      },
      eCallback: function (res) {
        Callback(res)
      }
    }
    this.request(parmes)
  }

  //删除收藏数据
  delColler(id, Callback) {
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
  Details
}  