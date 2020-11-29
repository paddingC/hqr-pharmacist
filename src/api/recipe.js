import request from '@/common/request'

export function getDeptByKey(data) {
    return request({
        url: '/config/getDeptByKey',
        method: 'post',
        data
    })
}
export function getByKey(data) {
    return request({
        url: '/pharmacist/getByKey',
        method: 'post',
        data
    })
}

export function batchApproval(data) {
    return request({
        url: '/prescription/batchApproval',
        method: 'post',
        data
    })
}

export function finddtl (data) {
    return request({
        url: '/prescription/finddtl',
        method: 'post',
        data
    })
}
