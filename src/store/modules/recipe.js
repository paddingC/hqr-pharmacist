import {getDeptByKey, getByKey, batchApproval, finddtl}          from '@/api/recipe'

const state = {
}

const mutations = {

}

const actions = {
    getDeptByKey({commit}, form) {
        return new Promise((resolve, reject) => {
            getDeptByKey(form).then(res => {
                const data = res.data
                resolve(data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    getByKey({commit}, form) {
        return new Promise((resolve, reject) => {
            getByKey(form).then(res => {
                const data = res.data
                resolve(data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    batchApproval({commit}, form){
        return new Promise((resolve, reject) => {
            batchApproval(form).then(res => {
                resolve(res)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    finddtl ({commit}, param) {
        return new Promise((resolve, reject) => {
            finddtl(param).then(res => {
                resolve(res)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
