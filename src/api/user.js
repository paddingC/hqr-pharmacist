import request from '@/common/request'

export function login(data) {
    return request({
        url: '/user/loginph',
        method: 'post',
        data
    })
}
// 退出登录
export function sign(data) {
    return request({
        url: '/pharmacist/sign',
        method: 'post',
        data
    })
}
// 修改密码
export function changepassword(data) {
    return request({
        url: '/user/changepassword',
        method: 'post',
        data
    })
}
export function login2(data) {
    return request({
        url: '/roleqyweb/webuser/role/user/login',
        method: 'get',
        params:data
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: {token}
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
// 获取企业logo 识别标识
export function getconfig(data) {
    return request({
        url: '/config/interf/getconfig',
        method: 'post',
        data
    })
}
// 日志
export function savelog(data) {
    return request({
        url: 'inquiry/savelog',
        method: 'post',
        data
    })
}
export function faceCompare(data) {
    return request({
        url: 'face/compare',
        method: 'post',
        data
    })
}

/*签到、签退*/
export function signPro(data) {
    return request({
        url: 'pharmacist/signPro',
        method: 'post',
        data
    })
}
