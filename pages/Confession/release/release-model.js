import {
    Base
} from '../../../utils/base.js'

class Release extends Base {
    constructor() {
        super()
    }
    //调用base model 中的request 执行上传
    add(url, data, thar) {
        var parmes = {
            url: url,
            type: 'post',
            data: {
                data: data
            },
            eCallback: function(res) {

                if (res.valid) {
                    wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 2000,
                        success() {}
                    })
                    setTimeout(function() {
                        var pages = getCurrentPages();
                        var currPage = pages[pages.length - 1]; //当前页面

                    }, 3000)
                    thar.changeParentData()

                    
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.msg,
                    })
                }
            }



        }
        this.request(parmes)
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




}




export {
    Release
}