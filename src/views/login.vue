<template>
    <div class="login-container">
        <el-container style="height: 100vh">
            <el-header class="el-header-box" v-if="realmName!=null && realmName != ''">
                {{realmName.companysortname}}药事服务执业药师端
            </el-header>
            <el-header class="el-header-box" v-else>
                药事服务执业药师端
            </el-header>
            <el-main class="login-main login-input">
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
                         label-position="left">
                    <div class="title-container">
                        <div class="logo" v-if="realmName!=null && realmName != ''">
                            <img :src="realmName.logopath" alt="logo">
                        </div>
                        <div class="logo" v-else>
                            <img src="" alt="logo">
                        </div>
                        <h3 class="title">药事服务执业药师端</h3>
                    </div>
                    <el-form-item prop="username">
                        <span class="svg-container">
                            <i class="el-icon-user "></i>
                         </span>
                        <el-input
                            ref="username"
                            v-model="loginForm.loginid"
                            placeholder="请输入用户名"
                            name="loginid"
                            type="text"
                            tabindex="1"
                            autocomplete="off"/>
                    </el-form-item>
                    <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                        <el-form-item prop="password">
                              <span class="svg-container">
                              <i class="el-icon-lock  "></i>
                              </span>
                            <el-input
                                :key="passwordType"
                                ref="password"
                                v-model="loginForm.loginpwd"
                                :type="passwordType"
                                placeholder="请输入登录密码"
                                name="loginpwd"
                                tabindex="2"
                                autocomplete="off"
                                @keyup.native="checkCapslock"
                                @blur="capsTooltip = false"
                                @keyup.enter.native="handleLogin"
                            />
                            <span class="show-pwd" @click="showPwd">
                    <!--            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />-->
                              </span>
                        </el-form-item>
                    </el-tooltip>
                    <el-button :loading="loading" type="primary"
                               style="width:100%;margin:15px 0;background-color: #1abc9c;"
                               @click.native.prevent="handleLogin">
                        登录
                    </el-button>
                </el-form>
            </el-main>
            <el-footer class="login-footer" v-if="realmName!=null && realmName != ''">
                {{realmName.companyname}}远程药事服务平台
            </el-footer>
            <el-footer class="login-footer" v-else>
                远程药事服务平台
            </el-footer>
        </el-container>
        <!--指纹登录-->
        <el-dialog title="" :visible.sync="dialogFinger" width="420px" class="dialogTit"
                   :close-on-click-modal="false" @close="closeFinger">
            <div class="fingerTit">请水平按压手指验证</div>
            <div class="fingerImg">
                <img :src="imgFingerSrc" v-show="hasFinger">
            </div>
        </el-dialog>
        <el-dialog width="1000px" :visible.sync="value8" :close-on-press-escape="false" :close-on-click-modal="false"
                   :show-close="false" :destroy-on-close="true" title="身份验证" height="600">
            <div class="idcard"
                 v-loading="loading2">
                <span v-show="resultFlag===false">  正在处理请稍后。。。</span>
                <div v-show="resultFlag===true" class="el-card-id-card">
                    <img :src="identityPic" class="image">
                    <span class="partyName">{{ idCardInfo.partyName }}</span>
                    <span class="certAddress">{{ idCardInfo.certAddress }}</span>
                    <span class="nation">{{ idCardInfo.nation }}</span>
                    <span class="year">{{idCardInfo.year}}</span>
                    <span class="month">{{idCardInfo.moth}}</span>
                    <span class="day">{{idCardInfo.day}}</span>
                    <span class="gender">{{ idCardInfo.gender===1?'男':'女' }}</span>
                    <span class="certNumber">{{ certNumber }}</span>
                </div>
                <div v-show="idCardFlage===true" s class="el-card-id">
                    <p></p>
                    <video id="video" width="300" height="400"></video>
                    <canvas id="canvas" style="display:none" width="300" height="400"></canvas>
                    <!--                    <img :src="idCardPhoto" alt="">-->
                    <p>请正视摄像头，以便进行人脸识别</p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {validUsername} from '@/common/validate'
import {mapGetters}    from 'vuex'
import $               from "jquery"

export default {
    name: 'login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('请输入用户名'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码长度不能少于6位'))
            } else {
                callback()
            }
        }
        return {
            faceFlage: false,
            idCardPhoto: null,//拍摄的照片
            resultFlag: false,//获取身份证信息失败
            idCardFlage: false, //验证身份证失败
            loading2: true,
            loginForm: {
                loginid: '',// zzf111
                loginpwd: '',
            },
            loginRules: {
                loginid: [{required: true, trigger: 'blur', validator: validateUsername}],
                loginpwd: [{required: true, trigger: 'blur', validator: validatePassword}]
            },
            passwordType: 'password',
            capsTooltip: false,
            loading: false,
            showDialog: false,
            redirect: undefined,
            otherQuery: {},
            realmCount: 0,
            realIntv: null,
            dialogFinger: false,
            imgFingerSrc: '',
            hasFinger: false,
            value8: false,
            addNum: 0,
            identityPic: null,//身份证上的图片
            certNumber: null,//身份证上的号码
        }
    },
    watch: {
        $route: {
            handler: function (route) {
                console.log(route)
                const query = route.query
                if (query) {
                    this.redirect = query.redirect
                    this.otherQuery = this.getOtherQuery(query)
                }
            },
            immediate: true,
            useried: ''
        }
    },
    computed: {
        ...mapGetters([
            'appInfo',
            'userInfo',
            'realmName',
            'idCardInfo'
            // ...
        ]),
    },
    sockets: {
        connect: function () {
            console.log('socket 链接成功--------------------')
        },
        connecting: function () {
            console.log('正在连接')
        },
        connect_failed: function () {
            console.log('连接失败')
        },
        disconnect: function () {
            console.log('断开连接')
        },
        error: function () {
            console.log('错误发生，并且无法被其他事件类型所处理')
        },
        // 登录成功
        loginback: function (data) {
            if (data.status === 207) {
                this.$confirm(data.msg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$socket.emit('loginph', JSON.stringify({
                        loginid: this.loginForm.loginid,
                        loginpwd: this.loginForm.loginpwd,
                        again: 1
                    }))
                }).catch(err => {
                    this.$message.warning('已取消')
                })
            } else if (data.status === 200) {
                if (data.data) {
                    this.loading = false
                    this.$store.commit('user/SET_TOKEN', data.data.token)
                    this.$store.commit('user/SET_USERINFO', data.data)
                    this.$store.commit('user/SET_LOGINTYPE', data.data.approvaltype)
                    this.$store.commit('user/SET_PHARMID', data.data.pharmacistid)
                    this.$store.commit('user/SET_LOGINNAME', this.loginForm.loginid)
                    this.$store.commit('app/SET_WAITTIME', 'loginOk')

                    sessionStorage.setItem('isLogin', 1)
                    sessionStorage.setItem('companyUrl', 'yes')
                    this.$router.push({path: '/home/accountOverview/information'})

                    // if (data.data.approvaltype === '2') {
                    //     //   账号密码
                    //     sessionStorage.setItem('isLogin', 1)
                    //     sessionStorage.setItem('companyUrl', 'yes')
                    //     this.$router.push({path: '/home/accountOverview/information'})
                    // } else if (data.data.approvaltype === '1') {
                    //     //指纹识别
                    //     this.dialogFinger = true
                    //     this.openFinger()
                    // } else {
                    //     /*身份证，人脸*/
                    //     this.loading2 = true
                    //     this.value8 = true
                    //     this.addNum = 0
                    //     setTimeout(() => {
                    //         this.readCert()
                    //     }, 1000)
                    // }
                }
            } else {
                this.$message.error(data.msg)
                this.loading = false
                return false
            }
        }
    },
    mounted() {
        window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
        window.addEventListener('unload', e => this.unloadHandler(e))

        if (this.loginForm.username === '') {
            this.$refs.username.focus()
        } else if (this.loginForm.password === '') {
            this.$refs.password.focus()
        }
        this.getRealm()
    },
    methods: {
        getRealm() {
            let that = this
            that.realIntv = setInterval(() => {
                if (that.realmName) {
                    console.log(this.realmName)
                    console.log('域名获取的信息' + this.realmCount)
                    that.$nextTick(() => {

                        that.logopath = that.realmName.logopath
                        that.companyname = that.realmName.companyname
                    })
                    console.log(that.realmName.companyname)
                    clearInterval(that.realIntv)
                } else {
                    if (that.realmCount > 30) {
                        clearInterval(that.realIntv)
                    }
                }
                that.realmCount++
            }, 1000)
        },
        checkCapslock({shiftKey, key} = {}) {
            if (key && key.length === 1) {
                if (shiftKey && ( key >= 'a' && key <= 'z' ) || !shiftKey && ( key >= 'A' && key <= 'Z' )) {
                    this.capsTooltip = true
                } else {
                    this.capsTooltip = false
                }
            }
            if (key === 'CapsLock' && this.capsTooltip === true) {
                this.capsTooltip = false
            }
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$socket.emit('loginph', JSON.stringify({
                        loginid: this.loginForm.loginid,
                        loginpwd: this.loginForm.loginpwd
                    }))
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        openFinger() {
            this.CollectionFiger()
        },
        closeFinger() {
            this.cancelCapture()
        },
        CollectionFiger() {
            let that = this
            $.ajax({
                type: 'Get',
                url: 'http://127.0.0.1:22001/zkbioonline/fingerprint/beginCapture?type=2&FakeFunOn=0',
                dataType: 'json',
                async: true,
                success: function (result) {
                    // 返回码
                    var ret = null
                    ret = result.ret
                    // 接口调用成功返回时
                    if (ret == 0) {
                        // 显示指纹
                        that.checkColl()
                    } else {
                        that.backErr(ret)
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('请安装指纹驱动或启动该服务!')
                }
            })
        },
        checkColl() {
            let ret = null
            let that = this
            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:22001/zkbioonline/fingerprint/getImage',
                dataType: 'json',
                async: true,
                success: function (result) {
                    // alert(objToStr(data));
                    // 指纹采集次数
                    that.collCount = 0
                    ret = result.ret
                    if (ret === 0) {
                        that.collCount = result.data.enroll_index
                        that.hasFinger = true
                        that.imgFingerSrc = 'data:image/jpeg;base64,' + result.data.jpg_base64
                    }
                    if (that.collCount == 0) {
                        that.timer = setTimeout(that.checkColl(), 200)//比对失败重新开始
                    } else {
                        that.getFPTemplate()
                        //console.log('指纹码 ',ret)
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('请安装指纹驱动或启动该服务!')
                    // messageBox({messageType: "alert", title: "${common_prompt_title}", text: "${base_fp_connectPrompt}"});
                }
            })
        },
        getFPTemplate() {
            let that = this
            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:22001/zkbioonline/fingerprint/getTemplate',
                dataType: 'json',
                async: false,
                success: function (result) {
                    // 返回码
                    var ret = null
                    ret = result.ret
                    if (ret == 0) {
                        that.fpTemplate = result.data.template
                        console.log('指纹模版：' + that.fpTemplate)
                        that.whileVerify()
                    } else {
                        that.backErr(ret)
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            })
        },
        whileVerify() {
            let fp = this.userInfo.fingerlist
            fp.forEach((item, index) => {
                if (this.doVerifyFinger(item.fingerprint)) {
                    return false
                    return false
                }
            })
        },
        doVerifyFinger(fpTemplate) {
            let that = this
            let regTemplate = that.fpTemplate
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:22001/ZKBIOOnline/fingerprint/verify",
                dataType: "json",
                data: JSON.stringify({
                    'reg': regTemplate,
                    'ver': fpTemplate
                }),
                async: true,
                success: function (data) {
                    //返回码
                    var ret = null
                    ret = data.ret
                    //接口调用成功返回时
                    if (ret == 0) {
                        console.log(data.score)
                        if (data.score > 60) {
                            that.$nextTick(() => {
                                that.Jump()
                            })
                            return false
                        } else {
                            that.$message.warning('指纹相似度' + data.score + '指纹校验失败,请重新录入')
                            that.hasFinger = false
                            that.openFinger()
                            return false
                        }
                    } else {
                        that.backErr(ret)
                        that.openFinger()
                        that.hasFinger = false
                        return false
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("请安装指纹驱动或启动该服务!")
                    return false
                }
            })
        },
        Jump() {
            sessionStorage.setItem('companyUrl', 'yes')
            sessionStorage.setItem('isLogin', 1)
            this.$router.push({
                path: '/home/accountOverview/information'
            })
            this.$socket.emit('pharmacistfingerlogin', JSON.stringify({
                userid: this.userInfo.userid,
                companyid: this.userInfo.companyid,
                pharmacistid: this.userInfo.pharmacistid,
                username: this.userInfo.username
            }))
        },
        cancelCapture() {
            let that = this
            clearTimeout(that.timer)
            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:22001/zkbioonline/fingerprint/cancelCapture',
                dataType: 'json',
                async: true,
                success: function (result) {
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('请安装指纹驱动或启动该服务!')
                }
            })
        },
        backErr(code) {
            if (code === 4) {
                this.$message.error('正在操作，请稍后再试')
            } else if (code === -1) {
                this.$message.error('操作失败')
            } else if (code === -2) {
                this.$message.error('不支持操作，请确认是否URL错误')
            } else if (code === -3) {
                this.$message.error('参数错误(暂未使用)')
            } else if (code === -5) {
                this.$message.error('无效数据格式')
            } else if (code === -6) {
                this.$message.error('无效模版')
            } else if (code === -7) {
                this.$message.error('对比异常')
            } else if (code === -2000) {
                this.$message.error('调用错误，目前仅支持HTTP Get')
            } else if (code === -2001) {
                this.$message.error('连接采集器失败')
            } else if (code === -2002) {
                this.$message.error('加载算法库失败')
            } else if (code === -2003) {
                this.$message.error('提取模板失败')
            } else if (code === -2004) {
                this.$message.error('采集图像失败')
            } else if (code === -2005) {
                this.$message.error('正在采集，请按手指或者取消采集')
            } else if (code === -2006) {
                this.$message.error('请按手指')
            } else if (code === -2007) {
                this.$message.error('分配内存失败（暂未使用）')
            } else if (code === -2008) {
                this.$message.error('取消失败（暂未使用')
            } else if (code === -2009) {
                this.$message.error('疑似假指纹或者手指按太快')
            }
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                    acc[ cur ] = query[ cur ]
                }
                return acc
            }, {})
        },
        beforeunloadHandler() {
            this._beforeUnload_time = new Date().getTime()
        },
        unloadHandler(e) {
            this._gap_time = new Date().getTime() - this._beforeUnload_time
            //判断是窗口关闭还是刷新
            if (this._gap_time <= 5) {
                debugger
                //如果是登录状态，关闭窗口前，移除用户
                // if (!this.showLoginButton) {
                //     $.ajax({
                //         url: '/pictureweb/user/remove',
                //         type: 'get',
                //         async: false, //或false,是否异步
                //
                //     })
                // }
                localStorage.removeItem('token')
            }
        },
        readCert() {
            //读取身份证信息
            let that = this
            $.ajax({
                type: 'GET',
                "url": "http://localhost:8099/?cmd=readCard&charset=gbk",
                "cache": false,
                "dataType": "jsonp",
                "jsonp": "callback",
                "jsonpCallback": "fnCallback",
                success: function (res) {
                    console.log(res)
                    if (res.resultFlag === 0) {
                        that.resultFlag = true
                        that.loading2 = false
                        that.identityPic = "data:image/jpg;base64," + res.resultContent.identityPic
                        that.certNumber = res.resultContent.certNumber
                        let info = {...res.resultContent}
                        let bornDay = info.bornDay
                        info.year = bornDay.slice(0, 4)
                        info.moth = bornDay.slice(4, 6)
                        info.day = bornDay.slice(6, 8)
                        that.$store.commit('user/SET_IDCARD', info)
                        if (that.certNumber === that.userInfo.idcardno) {
                            //保存身份证信息用后面对比验证
                            //登录账号的身份证和读取的相匹配
                            that.idCardFlage = true
                            //开启摄像头
                            that.getVideo()
                        } else {
                            that.$confirm('登陆账号的身份证与扫描的身份证不符，请检查后重试', '提示', {
                                confirmButtonText: '再试一次',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                that.readCert()
                            }).catch(() => {
                                that.value8 = false
                            })
                        }
                        // identityPic
                    } else {
                        that.resultFlag = false
                        that.$confirm('读取身份证信息失败', '提示', {
                            confirmButtonText: '再试一次',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            that.readCert()
                        }).catch(() => {
                            that.value8 = false
                        })
                    }
                },
                error: function () {

                }
            })
        },
        getVideo() {
            let that = this
            var canvas = document.getElementById("canvas"),
                context = canvas.getContext("2d"),
                video = document.getElementById("video")

            function successCallback(stream) {
                // Set the source of the video element with the stream from the camera
                if (video.mozSrcObject !== undefined) {
                    video.mozSrcObject = stream
                } else {
                    video.srcObject = stream
                }
                video.play()
                that.$message.info('3秒后进行拍照校验')
                setTimeout(() => {
                    that.takePhotos(context)
                }, 3000)
            }

            function errorCallback(error) {
                alert('错误代码: [CODE ' + error.code + ']')
                // Display a friendly "sorry" message to the user
            }

            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
            window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL
            if (navigator.getUserMedia) {
                navigator.getUserMedia({
                    video: {
                        width: {min: 400},
                        height: {min: 300}
                    }
                }, successCallback, errorCallback)
            } else {
                alert('浏览器不支持getUserMedia.')
            }
        },
        takePhotos() {
            var that = this
            let canvas = document.getElementById("canvas")
            let context = canvas.getContext("2d")
            that.addNum++
            console.log(that.addNum)
            if (that.addNum > 3) {
                that.$confirm('人脸识别失败', '提示', {
                    confirmButtonText: '再试一次',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.addNum = 0
                    that.takePhotos()
                }).catch(() => {
                    that.value8 = false
                    that.idCardFlage = false
                    that.resultFlag = false
                })
            } else {
                context.drawImage(video, 0, 0, 300, 400)
                var canvans = document.getElementById("canvas")
                var imgData = canvans.toDataURL()
                //将图像转换为base64数据
                var base64Data = imgData.substr(22)
                that.idCardPhoto = "data:image/png;base64," + base64Data
                that.$message.info('校验中')
                that.faceCompare(base64Data)
            }
        },
        faceCompare(liveImage) {
            let parms = {
                // this.idCardInfo.identityPic
                // liveImage: this.idCardInfo.identityPic, //摄像头拍的照片base64
                liveImage: liveImage,
                negativeImage: this.idCardInfo.identityPic,
                platform: 'TC',
                companyid: this.userInfo.companyid,
                userid: this.userInfo.userid
            }
            this.$store.dispatch('user/faceCompare', parms).then((res) => {
                this.$message.success('验证成功')
                this.Jump()
            }).catch((err) => {
                this.takePhotos()
                console.log(err)
            })
        }
    },
    destroyed() {
        // window.removeEventListener('storage', this.afterQRScan)
        window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
        window.removeEventListener('unload', e => this.unloadHandler(e))
    },
    created() {
        this.$store.commit('app/SET_ROUTER', '')
    }
}
</script>

<style lang="scss" scoped>
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
    .fingerImg {
        background: url("./../assets/img/fingerKang.png") no-repeat;
        width: 130px;
        height: 166px;
        margin-left: 10px;
        text-align: center;
        margin-left: 130px;
        margin-top: 60px;
        margin-bottom: 60px;
    }

    .fingerImg img {
        vertical-align: middle;
        width: 110px;
        height: 146px;
        margin: 10px;
    }

    .fingerTit {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        line-height: 32px;
        color: #36c2aa;
    }

    $bg: #fff;
    $light_gray: black;
    $cursor: black;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
        }
    }

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid #dbdbdb;
            background: #ffffff;
            border-radius: 5px;
            color: #454545;
        }
    }

    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .login-container {
        height: 100%;
        width: 100%;
        background-color: $bg;
        overflow: hidden;
        font-family: 'Arial Negreta', 'Arial Normal', 'Arial';

        .login-input {
            & /deep/ .el-input input {
                background: transparent;
                border: 0;
                -webkit-appearance: none;
                border-radius: 0;
                padding: 12px 5px 12px 15px;
                color: black;
                height: 47px;
                caret-color: black;
            }
        }

        .el-header-box {
            height: 100px !important;
            background: inherit;
            background-color: rgba(240, 248, 250, 1);
            border: none;
            border-radius: 0px;
            line-height: 100px;
            font-weight: 700;
            font-style: normal;
            font-size: 28px;
            color: #36C2AA;
        }

        .login-footer {
            height: 70px !important;
            background: inherit;
            background-color: rgba(240, 248, 250, 1);
            border: none;
            border-radius: 0px;
            line-height: 70px;
            font-weight: 700;
            font-style: normal;
            font-size: 28px;
            color: #36C2AA;
        }

        .login-main {
            background: url("~@/assets/img/login-bg.jpg") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .login-footer {
            text-align: center;
        }

        .login-form {
            background-color: #fff;
            position: relative;
            width: 450px;
            height: 420px;
            padding: 20px 25px 70px 25px;
            margin: 0 auto;
            overflow: hidden;

            .logo {

                padding-bottom: 10px;
                height: 80px;
                text-align: center;

                img {
                    height: 100%;
                }
            }
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            font-size: 30px;
            padding: 6px 5px 6px 10px;
            color: $dark_gray;
            vertical-align: middle;
            width: 41px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-family: '微软雅黑 Bold', '微软雅黑';
                font-weight: 700;
                font-style: normal;
                font-size: 24px;
                color: #1ABC9C;
                line-height: 28px;
                text-align: center;
                margin-bottom: 22px;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }

        .thirdparty-button {
            position: absolute;
            right: 0;
            bottom: 6px;
        }

        @media only screen and (max-width: 470px) {
            .thirdparty-button {
                display: none;
            }
        }
    }

    .el-input {
        background-color: #fff !important;
    }

    .idcard {
        min-width: 850px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .el-card-id {
        width: 300px;
        height: 500px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        border: 1px solid #EBEEF5;
        background-color: #FFF;
        color: #303133;
        -webkit-transition: .3s;
        transition: .3s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        margin: 0 5px;

        img {
            width: 300px;
            height: 400px;
        }
    }

    .el-card-id-card {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        border: 1px solid #EBEEF5;
        background: url("../assets/img/shenfenzheng_1.png");
        color: #303133;
        -webkit-transition: .3s;
        transition: .3s;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        margin: 0 5px;
        width: 400px;
        height: 246px;
        background-size: cover;
        position: relative;

        .image {
            position: absolute;
            top: 46px;
            right: 20px;
            width: 100px;
            height: 100px;
        }

        .certNumber {
            position: absolute;
            bottom: 24px;
            left: 130px;
        }

        .certAddress {
            position: absolute;
            bottom: 74px;
            left: 101px;
        }

        .partyName {
            position: absolute;
            top: 41px;
            left: 109px;
        }

        .gender {
            position: absolute;
            top: 78px;
            left: 109px;
        }

        .nation {
            position: absolute;
            top: 78px;
            left: 200px;
        }

        .year {
            position: absolute;
            top: 114px;
            left: 103px;
        }

        .month {
            position: absolute;
            top: 114px;
            left: 165px;
        }

        .day {
            position: absolute;
            top: 114px;
            left: 209px;
        }
    }

</style>

