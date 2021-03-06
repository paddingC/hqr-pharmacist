const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    appInfo: state => state.app.appInfo,
    userInfo: state => state.user.userInfo,
    activeRouer: state => state.app.activeRouer,
    patientInfo: state => state.auditing.patientInfo,
    prescriptionPic: state => state.auditing.prescriptionPic,
    ncdpicture: state => state.ncd.picture,
    doctorInfo: state => state.user.doctorInfo,
    usedoorInfo: state => state.user.usedoorInfo,
    pharmacistid: state => state.user.pharmacistid,
    workLine: state => state.user.workLine,
    doorInfo: state => state.user.doorInfo,
    loginName: state => state.user.loginName,
    cfList: state => state.user.cfList,
    sdkKey: state => state.user.sdkKey,
    creadRecord: state => state.user.creadRecord,
    callFlage: state => state.app.callFlage,
    networkSuccess: state => state.app.networkSuccess,
    waitTime: state => state.app.waitTime,
    Mix: state => state.user.Mix,
    streamState: state => state.user.streamState,
    creadState: state => state.user.creadState,
    sheBeiNormal: state => state.user.sheBeiNormal,
    realmName: state => state.user.realmName,
    idCardInfo: state => state.user.idCardInfo,
    loginType: state => state.user.loginType,
    camerasArr: state => state.user.camerasArr,
    workstatus: state => state.user.workstatus,
    poststatus: state => state.user.poststatus
}
export default getters
