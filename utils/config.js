
class Config {
    constructor() {

    }
}
var flag = false

if(flag) {
    Config.restUrl = 'http://yzl.top/api/v1/'
    //图片标签地址
    Config.imgUrl = 'http://yzl.top/'

} else {
    Config.restUrl = 'https://gzysr.cn/api/v1/'
    Config.imgUrl = 'https://gzysr.cn/'
}

// 实习系统地址
// Config.practiceUrl = 'http://practice.top'
Config.practiceUrl = 'https://gzcjsx.cn'





export { Config }