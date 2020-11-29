import Cookies from 'js-cookie'
import {savelog} from '@/api/user.js'
const state = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
    },
    device: 'desktop',
    appInfo: {
        name1: '药事服务执业药师端',
        name2: '陕西广济堂医药集团远程药事服务平台',
    },
    activeRouer:null,
    callFlage: false,
    waitTime: '',
    networkSuccess: true //是否断网
    // size: Cookies.get('size') || 'medium'
}

const mutations = {
    SET_NETWORKSUCCESS:(state, val)=>{
        state.networkSuccess = val
    },
    SET_WAITTIME:(state, val)=>{
        state.waitTime = val
    },
    SET_ROUTER:(state,routerNow)=>{
        state.activeRouer=routerNow
    },
    SET_CALLFLASE: (state, flage) => {
        state.callFlage = flage
    },
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            // Cookies.set('sidebarStatus', 1)
        } else {
            // Cookies.set('sidebarStatus', 0)
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        // Cookies.set('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device
    },
    SET_SIZE: (state, size) => {
        state.size = size
        // Cookies.set('size', size)
    }
}

const actions = {
    savelog({commit}, content) {
        const {userid, msg} = content
        return new Promise((resolve, reject) => {
            savelog({userid, msg}).then(response => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    toggleSideBar({commit}) {
        commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({commit}, {withoutAnimation}) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({commit}, device) {
        commit('TOGGLE_DEVICE', device)
    },
    setSize({commit}, size) {
        commit('SET_SIZE', size)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
