import { Base } from 'base.js'

class Login extends Base {
    constructor() {
        super()
        this.loginurl = 'user/login'
    }

    login(code, data, callback){
        var that = this
        var parmes = {
            url: this.loginurl,
            type: 'post',
            data: {
                code: code,
                user_name: data.user_name,
                imageUrl: data.imageUrl,
                gender: data.gender,
            },
            eCallback: function(res){
                callback(res)
            }
        }
        this.request(parmes)
    }
}

export {
    Login
}

