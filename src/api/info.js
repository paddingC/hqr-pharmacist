import request from '@/common/request'

// 获取药师信息
export function pharmInfo(data) {
    return request({
        url: '/pharmacist/select',
        method: 'post',
        data
    })
}
export function getPharmacistInfo(data) {
    return request({
        url: '/pharmacist/getPharmacistInfo',
        method: 'post',
        data
    })
}
/*审方统计*/
export function getdayworkload(data) {
    return request({
        url: '/prescription/getdayworkload',
        method: 'post',
        data
    })
}
/*咨询统计*/
export function getInstructionCount(data) {
    return request({
        url: '/pharmacist/getInstructionCount',
        method: 'post',
        data
    })
}
// 提交
export function sxapprove(data) {
    return request({
        url: '/prescription/sxapprove',
        method: 'post',
        data
    })
}
// 处方管理
export function sxfinddoc(data) {
    return request({
        url: '/prescription/sxfinddoc',
        method: 'post',
        data
    })
}
// 用户注册接口
export function getkey(data) {
    return request({
        url: '/config/getkey',
        method: 'post',
        data
    })
}
// 创建录制任务
export function createRecord(data) {
    return request({
        url: '/tencentcloud/createRecord',
        method: 'post',
        data
    })
}
// 终止录制任务
export function stopRecord(data) {
    return request({
        url: '/tencentcloud/stopRecord',
        method: 'post',
        data
    })
}
// 混流
export function startMixStream(data) {
    return request({
        url: '/tencentcloud/startMixStream',
        method: 'post',
        data
    })
}
// 流状态
export function queryStreamState(data) {
    return request({
        url: '/tencentcloud/queryStreamState',
        method: 'post',
        data
    })
}
// 门店端断流提醒
export function notifyShop(data) {
    return request({
        url: '/prescription/notifyShop',
        method: 'post',
        data
    })
}
// 字典值
export function batchGetDictList (data) {
    return request({
        url: '/dictionary/batchGetDictList',
        method: 'post',
        data
    })
}
