import {login, logout, getInfo, sign, changepassword, getconfig ,faceCompare, signPro}          from '@/api/user'
import {getToken, setToken, removeToken} from '@/common/cookie'
import {pharmInfo, getPharmacistInfo, getdayworkload, getInstructionCount, sxapprove,
    sxfinddoc, getkey, createRecord, stopRecord, startMixStream, queryStreamState,
    notifyShop, batchGetDictList}          from '@/api/info'
// import router, { resetRouter } from '@/router'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    userInfo: {},
    patientInfo: {},
    doctorInfo: {},
    pharmacistid: '',
    prescriptionPic: null,
    workLine: '',
    doorInfo: {},
    usedoorInfo: {},
    loginName: '',
    cfList: {},
    sdkKey: '',
    creadRecord: {},
    Mix: {},
    streamState: '', // 混流状态
    creadState: false, // 录制状态
    sheBeiNormal: true,// 设备是否正常
    realmName: {},
    camerasArr: [],
    idCardInfo:{},
    loginType:''
}

const mutations = {
    SET_CAMERASARR: (state, camerasArr)=>{
        state.camerasArr = camerasArr
    },
    SET_LOGINTYPE: (state, loginType)=>{
        state.loginType = loginType
    },
    SET_IDCARD: (state, idCardInfo)=>{
        state.idCardInfo = idCardInfo
    },
    SET_REALMNAME: (state, realmName) => {
        state.realmName = realmName
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_CREADRECORD: (state, creadRecord) => {
        state.creadRecord = creadRecord
    },
    SET_SGEBEI: (state, val) => {
        state.sheBeiNormal = val
    },
    SET_CREADSTATE: (state, val) => {
        state.creadState = val
    },
    SET_MIX: (state, val) => {
        state.Mix = val
    },
    SET_STREAMSTATE: (state, val) => {
        state.streamState = val
    },
    SET_SDKKEY: (state, sdkKey) => {
        state.sdkKey= sdkKey
    },
    SET_LOGINNAME: (state, loginName) => {
        state.loginName = loginName
    },
    SET_DOORINFO: (state, doorInfo) => {
        state.doorInfo = doorInfo
    },
    SET_USEDOORINFO: (state, usedoorInfo)=>{
      state.usedoorInfo = usedoorInfo
    },
    SET_CFLIST: (state, cfList) => {
        state.cfList = cfList
    },
    SET_PICTURE: (state, prescriptionPic) => {
        state.prescriptionPic = prescriptionPic
    },
    SET_USERINFO: (state, userInfo) => {
        state.userInfo = {...userInfo, isLogin: true}
    },
    SET_WORKSTATUS: (state, workstatus) => {
        state.userInfo.workstatus = workstatus
    },
    SET_POSTSTATUS: (state, poststatus) => {
        state.userInfo.poststatus = poststatus
    },
    SET_REMOVERINFO: (state, userInfo) => {
        state.userInfo = {
            isLogin: false,
            loginid: null,
            loginpwd: null,
        }
    },
    SET_PATIENTINFO: (state, patientInfo) => {
        state.patientInfo = patientInfo
    },
    SET_DOCTORINFO: (state, doctorInfo) => {
        state.doctorInfo = doctorInfo
    },
    SET_PHARMID: (state, pharmacistid) => {
        state.pharmacistid = pharmacistid
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_WORKLINE: (state,workLine) => {
        state.workLine = workLine
    }
}

const actions = {
    getconfig ({commit}, code) {
        return new Promise((resolve, reject) => {
            getconfig(code).then(response => {
                const {data} = response
                commit('SET_REALMNAME', data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // user login
    login({commit}, userInfo) {
        const {loginid, loginpwd} = userInfo
        return new Promise((resolve, reject) => {
            login({loginid: loginid, loginpwd: loginpwd}).then(response => {
                const {data} = response
                commit('SET_TOKEN', data.token)
                // commit('SET_USERINFO', data)
                commit('SET_PHARMID', data.pharmacistid)
                commit('SET_LOGINNAME', loginid)
                setToken(data.token)
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    sign ({commit}, userInfo) {
        console.log(userInfo);
        return new Promise((resolve, reject) => {
            sign(userInfo).then(response => {
                resolve()
            }).catch(error => {
                console.log(error);
                reject(error)
            })
        })
    },
    getkey ({commit}, userid) {
        console.log(userid);
        return new Promise((resolve, reject) => {
            getkey(userid).then(response => {
                const {data} = response
                commit('SET_SDKKEY', data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    createRecord ({commit}, params) {
        return new Promise((resolve, reject) => {
            createRecord(params).then(response => {
                const {data} = response
                commit('SET_CREADRECORD', data)
                commit('SET_CREADSTATE', true)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    startMixStream ({commit}, params){
        return new Promise((resolve, reject) => {
            startMixStream(params).then(response => {
                const {data} = response
                commit('SET_MIX', data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    notifyShop ({commit}, params){
        return new Promise((resolve, reject) => {
            notifyShop(params).then(response => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    stopRecord({commit}, params){
        return new Promise((resolve, reject) => {
            stopRecord(params).then(response => {
                const {data} = response
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    queryStreamState({commit}, params){
        return new Promise((resolve, reject) => {
            queryStreamState(params).then(response => {
                const {data} = response
                // commit('SET_STREAMSTATE', data.streamState)
                resolve()
            }).catch(error => {
                console.log(error);
                reject(error)
            })
        })
    },
    changepassword({commit}, params) {
        return new Promise((resolve, reject) => {
            changepassword(params).then(response => {
                resolve()
            }).catch(error => {
                console.log(error);
                reject(error)
            })
        })
    },
    // get user info
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const {data} = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const {roles, name, avatar, introduction} = data

                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                commit('SET_ROLES', roles)
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                commit('SET_INTRODUCTION', introduction)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({commit, state, dispatch}) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()


                // reset visited views and cached views
                // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                dispatch('tagsView/delAllViews', null, {root: true})

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({commit}) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    pharmInfo ({commit}, pharmacistid) {
      return new Promise((resolve, reject) => {
          pharmInfo({pharmacistid: pharmacistid}).then(response => {
              const {data} = response
              commit('SET_DOCTORINFO', data)
              resolve()
          }).catch(error => {
              reject(error)
          })
      })
    },
    getPharmacistInfo ({commit}, params) {
        return new Promise((resolve, reject) => {
            getPharmacistInfo(params).then(response => {
                const {data} = response
                commit('SET_DOCTORINFO', data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    getdayworkload ({commit}, doctorInfo) {
        return new Promise((resolve, reject) => {
            getdayworkload(doctorInfo).then(response => {
                const {data} = response
                commit('SET_WORKLINE', data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getInstructionCount ({commit}, doctorInfo) {
        return new Promise((resolve, reject) => {
            getInstructionCount(doctorInfo).then(response => {
                const {data} = response
                // commit('SET_WORKLINE', data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    sxapprove ({commit}, submitMsg) {
        return new Promise((resolve, reject) => {
            sxapprove(submitMsg).then(response => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    sxfinddoc ({commit}, params) {
        return new Promise((resolve, reject) => {
            sxfinddoc(params).then(response => {
                const {data} = response
                commit('SET_CFLIST', data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    signPro ({commit}, params) {
        return new Promise((resolve, reject) => {
            signPro(params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // dynamically modify permissions
    // changeRoles({ commit, dispatch }, role) {
    //     return new Promise(async resolve => {
    //         const token = role + '-token'
    //
    //         commit('SET_TOKEN', token)
    //         setToken(token)
    //
    //         const { roles } = await dispatch('getInfo')
    //
    //         resetRouter()
    //
    //         // generate accessible routes map based on roles
    //         const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    //
    //         // dynamically add accessible routes
    //         router.addRoutes(accessRoutes)
    //
    //         // reset visited views and cached views
    //         dispatch('tagsView/delAllViews', null, { root: true })
    //
    //         resolve()
    //     })
    // }
    faceCompare({commit}, parms) {
        const {liveImage,negativeImage,platform,companyid,userid}= parms
        return new Promise((resolve, reject) => {
            faceCompare({companyid: companyid, userid: userid,liveImage:liveImage,negativeImage:negativeImage,platform:platform}).then(response => {
                const {data} = response
                console.log(data)
                // commit('SET_TOKEN', data.token)
                // // commit('SET_USERINFO', data)
                // commit('SET_PHARMID', data.pharmacistid)
                // commit('SET_LOGINNAME', loginid)
                // setToken(data.token)
                resolve(data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    batchGetDictList ({commit}, params) {
        return new Promise((resolve, reject) => {
            batchGetDictList(params).then(response => {
                resolve(response)
            }).catch(error => {
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
