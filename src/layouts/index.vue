<template>
    <div class="layout" style="height: 100vh">
        <el-container style="height: 100%;">
            <el-header class="el-header-box">
                <div class="left">
                    <a v-if="realmName!=null && realmName != ''">{{realmName.username}}</a>
                    药事服务执业药师端<b>|</b>
                    <span class="switch">
                        {{form.username}}
                       <el-switch v-model="form.workstatus" active-color="#179BFF" :active-text="form.workstatus"
                                  @change="switchEvent" :disabled="ispoststatus" active-value="工作" inactive-value="休息" :width="54">
                       </el-switch>
                    </span>
                    <span class="sign">
                        <img @click="signEvent(0)" src="@/assets/img/signin.png" alt="" v-show="userInfo.poststatus == 0">
                        <img @click="signEvent(1)" src="@/assets/img/signout.png" alt="" v-show="userInfo.poststatus == 1">
                    </span>
                    <div class="notice">
                        <img src="@/assets/img/notice.png"/>
                        <div class="marquee_box" ref="marquee_box">
                            <ul :class="{marquee_top:animate}">
                                <li  v-for="(item, index) in slidesList" :key="index">
                                    {{item.deptname}}{{item.attribute}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <ul class="center">
                    <li :class="{active:item.to===activeRouer}" v-for="(item ,index) in routerList1"
                        @click="setRoute(item.to)"
                        tag="li" :key="index">
                        <img :src="item.classimg">
                        <span style="position: relative">
                            {{item.name}}
                            <span v-if="index == 1" class="showi" style="">
                                <a v-if="infoNum<=99">{{infoNum}}</a>
                                <a v-if="infoNum>99">99+</a>
                                <a v-if="infoNum>999">999+</a>
                            </span>
                        </span>
                    </li>
                </ul>
            </el-header>
            <el-main class="login-main">
                <slot>
                    <router-view/>
                </slot>
            </el-main>
            <el-footer class="login-footer" v-if="realmName!=null && realmName != ''">
                {{realmName.companyname}}远程药事服务平台
            </el-footer>
            <el-footer class="login-footer" v-else>
                远程药事服务平台
            </el-footer>
        </el-container>
        <!--账号密码-->
        <el-dialog :title="loginTitle" :visible.sync="loginVisible" :close-on-click-modal="false">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item required label="账号" prop="loginid">
                    <el-input style="width: 260px" v-model.number="ruleForm.loginid"></el-input>
                </el-form-item>
                <el-form-item required label="密码" prop="loginpwd">
                    <el-input style="width: 260px" type="password" v-model="ruleForm.loginpwd"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="loginVisible = false">取 消</el-button>
                <el-button type="primary" @click="loginSure('ruleForm')" :disabled="isloginSure">确定</el-button>
            </div>
        </el-dialog>
        <!--指纹登录-->
        <el-dialog :title="fingerTitle" :visible.sync="dialogFinger" width="420px" class="dialogTit"
                   :close-on-click-modal="false" @close="closeFinger">
            <div class="fingerTit">请水平按压手指验证</div>
            <div class="fingerImg">
                <img :src="imgFingerSrc" v-show="hasFinger">
            </div>
        </el-dialog>
        <!--人脸-->
        <el-dialog :visible.sync="value8" :close-on-press-escape="false" :close-on-click-modal="false"
                   :show-close="false" :destroy-on-close="true" :title="faceTitle" width="1000px" height="600">
            <div class="idcard"
                 v-loading="loading2">
                <span v-show="resultFlag===false">  正在处理请稍后。。。</span>
                <div v-show="resultFlag===true" class="el-card-id-card">
                    <img :src="'data:image/jpeg;base64,' +idCardInfo.identityPic" class="image">
                    <span class="partyName">{{ idCardInfo.partyName }}</span>
                    <span class="certAddress">{{ idCardInfo.certAddress }}</span>
                    <span class="nation">{{ idCardInfo.nation }}</span>
                    <span class="year">{{idCardInfo.year}}</span>
                    <span class="month">{{idCardInfo.moth}}</span>
                    <span class="day">{{idCardInfo.day}}</span>
                    <span class="gender">{{ idCardInfo.gender===1?'男':'女' }}</span>
                    <span class="certNumber">{{ idCardInfo.certNumber }}</span>
                </div>
                <div v-show="idCardFlage===true"  class="el-card-id">
                    <p></p>
                    <div class="canvasImg">
                        <video id="video" width="300" height="460"></video>
                        <div class="radius"></div>
                    </div>
                    <canvas id="canvas" style="display:none;" width="300" height="400"></canvas>

                    <!--                    <img :src="idCardPhoto" alt="">-->
                    <p>请正视摄像头，以便进行人脸识别</p>
                </div>
            </div>
        </el-dialog>
        <!--用药指导-->
        <el-dialog
        :title="doorTip"
        :visible.sync="dialogVisible"
        width="30%">
            <span>是否加入?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="refuse">拒 绝</el-button>
                <el-button class="search" @click="videoCall">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import zhzl         from '@/assets/img/zhzl.png'
import cfgl         from '@/assets/img/cfgl.png'
import zhgl         from '@/assets/img/zhgl.png'
import tcdl         from '@/assets/img/tcdl.png'
import $            from "jquery"
export default {
    name: "Layout",
    data() {
        var checkLoginid = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入账号'))
            }
            setTimeout(() => {
                callback()
            }, 1000)
        }
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            }
            setTimeout(() => {
                callback()
            }, 1000)
        }
        return {
            idCardPhoto: null,//拍摄的照片
            resultFlag: false,//获取身份证信息失败
            idCardFlage: false, //验证身份证失败
            loading2: true,
            routerList1: [
                {
                    to: '/home/accountOverview/information',
                    className: 'el-icon-user-solid',
                    classimg: zhzl,
                    name: '账户总览'
                }, {
                    to: '/home/historyRecipel',
                    className: 'el-icon-user-solid',
                    classimg: cfgl,
                    name: '处方管理'
                }, {
                    to: '/home/userSeting',
                    className: 'el-icon-user-solid',
                    classimg: zhgl,
                    name: '账户管理'
                }, {
                    to: '/logout',
                    className: 'el-icon-user-solid',
                    classimg: tcdl,
                    name: '退出登录'
                }
            ],
            pars: {
                pharmacistid: '',
                poststatus: 0
            },
            loginVisible: false,
            ruleForm: {
                loginid: '',
                loginpwd: ''
            },
            rules: {
                loginid: [{validator: checkLoginid, trigger: 'blur'}],
                loginpwd: [{validator: validatePass, trigger: 'blur'}]
            },
            value8: false,
            addNum: 0,
            infoNum: 0,
            slidesList: [],
            animate: false,
            form: {
                workstatus: '1'
            },
            singType: 0,
            dialogFinger: false,
            imgFingerSrc: '',
            hasFinger: false,
            collCount: 0,
            loginTitle: '',
            fingerTitle: '',
            faceTitle: '',
            signParams: '',
            doorTip: '',
            dialogVisible: false,
            useMsg: {},
            placepointInfo: {},
            isloginSure: false,
            ispoststatus: true
        }
    },
    computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
            'doctorInfo',
            'appInfo',
            'userInfo',
            'activeRouer',
            'pharmacistid',
            'loginName',
            'callFlage',
            'realmName',
            'loginType',
            'idCardInfo',
        ]),
    },
    sockets: {
        connect: function () {
            console.log('链接成功')
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
        // 待审核
        newPrescriptionList: function (data) {
            console.log(data);
            if (data.status === 200) {
                this.slidesList = data.data.list
                this.infoNum = data.data.info
                this.slidesList.forEach(i => {
                    if (i.attribute == 1) {
                        i.attribute = '的普通处方待审'
                    } else if (i.attribute == 2) {
                        i.attribute = '的慢病处方待审'
                    } else if (i.attribute == 3) {
                        i.attribute = '的特药处方待审'
                    }
                })
            }
        },
        // 多人登录时退出
        otheruserlogin: function (data) {
            if (data.status === 400) {
                this.$message.warning(data.msg)
                this.$store.commit('user/SET_REMOVERINFO')
                this.$socket.disconnect()
                this.$router.push({
                    path: '/'
                })
            }
        },
        // 收到门店请求
        videoRequest: function (data) {
            this.placepointInfo = data
            this.$store.commit('user/SET_DOORINFO', data)
            // 获取签名
            let params = {
                userid: this.userInfo.userid,
                companyid: this.userInfo.companyid
            }
            this.$store.dispatch('user/getkey', params).then(() => {
                this.autoLink()
            }).catch((err) => {
                this.videoNocall()
                this.$message.error('网络异常')
                console.log(err);
            })
        },
        cancelvideoRequest: function (data) {
            this.dialogVisible = false
        },
        // 门店呼叫用药指导
        instructionRequest: function (data) {
            this.useMsg = data
            this.dialogVisible = true
            this.doorTip = '接收到来自' + data.pharmacistinfo.companyname + '店患者的用药咨询'
            this.$store.commit('user/SET_USEDOORINFO', data)

        },
        // 门店取消呼叫用药指导
        shopCancelCallPharmacist: function (data) {
            this.dialogVisible = false
        }
    },
    created () {
        setInterval (this.showMarquee, 2000)
    },
    mounted() {
        this.ruleForm.loginid = this.loginName
        this.getInfo()
        if (this.userInfo.poststatus == 1) {
            this.ispoststatus = false
        }
        this.$refs.marquee_box.style.height = this.showNum * 30 + 'px'
    },
    methods: {
        showMarquee: function () {
            if (this.slidesList.length != 0) {
                this.animate = true;
                this.slidesList.push(this.slidesList[0]);
                setTimeout (() => {
                    this.slidesList.shift();
                    this.animate = false;
                }, 1000);
            }
        },
        signEvent (type) {
            if (this.callFlage) {
                this.$message.warning('请在结束视频通话后进行本操作');
                return false
            }
            if (type === 0) { // 签退
                this.signParams = 1
                this.signType(0)
            } else if (type === 1) { // 签到
                this.$confirm('是否进行签退?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning'
                }).then(() => {
                    this.signParams = 2
                    this.signType(1)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消签退'
                    });
                });
            }
        },
        // 签到签退方式
        signType (type) {
            if (type === 0) {
                this.loginTitle = '账号密码签到'
                this.fingerTitle = '指纹识别签到'
                this.faceTitle = '人脸识别签到'
            } else if (type === 1) {
                this.loginTitle = '账号密码签退'
                this.fingerTitle = '指纹识别签退'
                this.faceTitle = '人脸识别签退'
            }
            if (this.userInfo.signMethod === '1') { // 指纹识别
                this.openFinger()
                this.imgFingerSrc = ''
                this.dialogFinger = true
            } else if (this.userInfo.signMethod === '2'){ // 账号密码
                this.loginVisible = true
                return false
            } else if (this.userInfo.signMethod === '3') { // 人脸识别
                this.loading2 = true
                this.value8 = true
                this.addNum = 0
                this.readCert()
                return false
            }
        },
        // 签到签退接口
        signPro () {
            let file = ''
            if (this.userInfo.signMethod === '1') {
                file = this.imgFingerSrc
            } else if (this.userInfo.signMethod === '2') {
                file = this.loginName
            } else if (this.userInfo.signMethod === '3') {
                file = 'data:image/jpeg;base64,' + this.idCardInfo.identityPic
            }
            this.$store.dispatch('user/signPro', {
                companyid: this.userInfo.companyid,
                pharmacistid: this.userInfo.pharmacistid,
                fileUrl: file,
                pharmacistname: this.userInfo.username,
                signMethod: this.userInfo.signMethod,
                signType: this.signParams
            }).then((res) => {
                if (res.status === 200) {
                    if (this.signParams == 1) { // 签到
                        this.ispoststatus = false
                        this.form.workstatus = '工作'
                        this.$store.commit('user/SET_WORKSTATUS', '工作')
                        this.$store.commit('user/SET_POSTSTATUS', '1')
                    } else if (this.signParams == 2){ // 签退
                        this.ispoststatus = true
                        this.form.workstatus = '休息'
                        this.$store.commit('user/SET_WORKSTATUS', '休息')
                        this.$store.commit('user/SET_POSTSTATUS', '0')
                    }
                }
            }).catch(err => {
                console.log(err);
            })
        },
        getInfo () {
            this.$store.dispatch('user/getPharmacistInfo', {
                companyId: this.userInfo.companyid,
                data: this.userInfo.pharmacistid
            }).then(() => {
                this.form = this.doctorInfo
                this.form.workstatus == 1 ? this.form.workstatus = '休息' : this.form.workstatus = '工作';
            }).catch(err => {
                console.log(err);
            })
        },
        switchEvent (e) {
            if (this.callFlage) {
                this.$message.warning('请在结束视频通话后进行本操作')
                return false
            }
            this.$store.commit('user/SET_WORKSTATUS', e)
            if (e === '休息') {
                e = 1
            } else {
                e = 0
            }
            this.$socket.emit('changeStatus', JSON.stringify({
                type: '1',
                userid: this.userInfo.userid,
                companyid: this.userInfo.companyid,
                pharmacistid: this.userInfo.pharmacistid,
                workstatus: e
            }))

        },
        loginSure (formName) {
            this.isloginSure = true
            this.$refs[ formName ].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('user/login', this.ruleForm).then(() => {
                        this.signPro()
                        this.loginVisible = false
                        this.isloginSure = false
                    }).catch((error) => {
                        console.log(error);
                    })
                }else {
                    this.isloginSure = false
                    return false
                }
            })

        },
        setRoute(path) {
            if (this.callFlage) {
                this.$message.warning('请在结束视频通话后进行本操作')
                return false
            }
            if (path === '/logout') {
                if (this.userInfo.poststatus == 1) {
                    this.$confirm('您还没有执行签退，如果退出，则无签退记录，是否继续退出？', '提示', {
                        confirmButtonText: '是',
                        cancelButtonText: '否',
                        type: 'warning'
                    }).then(() => {
                        this.$message.success('退出成功')
                        this.$store.commit('user/SET_REMOVERINFO')
                        this.$socket.disconnect()
                        this.$router.push({
                            path: '/'
                        })
                        return false
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消退出登录'
                        });
                    });
                } else {
                    this.$message.success('退出成功')
                    this.$store.commit('user/SET_REMOVERINFO')
                    this.$socket.disconnect()
                    this.$router.push({
                        path: '/'
                    })
                    return false
                }
            } else {
                this.$router.push({
                    path: path
                })
            }
        },
        refuse(){
            this.$socket.emit('pharmacistVideoRequestBack', JSON.stringify({
                type: 2,
                companyid: this.userInfo.companyid,
                mduserid:  this.useMsg.mduserid,
                userid: this.userInfo.userid
            }))
            this.dialogVisible = false
        },
        videoCall() {
            this.dialogVisible = false
            // 用药指导
            this.$socket.emit('pharmacistVideoRequestBack', JSON.stringify({
                type: 1,
                companyid: this.userInfo.companyid,
                mduserid: this.useMsg.mduserid,
                userid: this.userInfo.userid
            }))
            sessionStorage.setItem('noVideo', '1')
            this.$router.push({
                path: '/home/accountOverview/medicationGuidance'
            })
        },
        autoLink(){
            let mduserid = null
            if (this.placepointInfo.data){
                mduserid=this.placepointInfo.data.mduserid
            } else{
                mduserid= this.placepointInfo.mduserid
            }
            if (this.placepointInfo.prescriptioninfo.attribute === '1' || this.placepointInfo.prescriptioninfo.attribute === '3') {
                // 普通、特殊处方
                sessionStorage.setItem('noVideo', '2')
                this.$router.push({
                    path: '/home/accountOverview/ordinarySpecial'
                })
            } else if (this.placepointInfo.prescriptioninfo.attribute === '2') {
                // 慢病
                sessionStorage.setItem('noVideo', '2')
                this.$router.push({
                    path: '/home/accountOverview/chronicDisease'
                })
            }
        },
        videoNocall () {
            this.dialogVisible = false
            this.$socket.emit('videoRequestBack', JSON.stringify({
                type: 2,
                companyid: this.userInfo.companyid,
                mduserid: this.placepointInfo.mduserid,
                userid: this.userInfo.userid
            }))
            this.form.workstatus = false
        },
        getVideo() {
            this.$nextTick(()=>{
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
                    console.log(error);
                    if(error.code == 8) {
                        alert('电脑未识别到高拍仪')
                    }
                }

                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
                window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({
                        video: {
                            width: {min: 300},
                            height: {min: 460}
                        }
                    }, successCallback, errorCallback)
                } else {
                    alert('浏览器不支持getUserMedia.')
                }
            })
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
                    if (res.resultFlag === 0) {
                        that.resultFlag = true
                        that.loading2 = false
                        let info = {...res.resultContent}
                        let bornDay = info.bornDay
                        info.year = bornDay.slice(0, 4)
                        info.moth = bornDay.slice(4, 6)
                        info.day = bornDay.slice(6, 8)
                        that.$store.commit('user/SET_IDCARD', info)
                        if (info.certNumber === that.userInfo.idcardno) {
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
        takePhotos() {
            var that = this
            let context = canvas.getContext("2d")
            that.addNum++
            if (that.addNum > 10) {
                that.$confirm('人脸识别失败', '提示', {
                    confirmButtonText: '再试一次',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.addNum = 0
                    that.takePhotos()
                }).catch(() => {
                    that.value8 = false
                    that.addNum = 0
                })
            } else {
                context.drawImage(video, 0, 0, 300, 400)
                var canvans = document.getElementById("canvas")
                var imgData = canvans.toDataURL()
                //将图像转换为base64数据
                var base64Data = imgData.substr(22)
                // that.$message.info('校验中')
                that.faceCompare(base64Data)
            }
        },
        faceCompare(liveImage) {
            let parms = {
                // this.idCardInfo.identityPic
                // liveImage: this.idCardInfo.identityPic, //摄像头拍的照片base64
                liveImage: liveImage, //摄像头拍的照片base64
                negativeImage: this.idCardInfo.identityPic,
                platform: 'ALI',
                companyid: this.userInfo.companyid,
                userid: this.userInfo.userid
            }
            this.$store.dispatch('user/faceCompare', parms).then((res) => {
                this.$message.success('验证成功')
                // 调签到、签退接口
                this.signPro()
                this.value8 = false
            }).catch((err) => {
                this.takePhotos()
                console.log(err)
            })
        },
        // 指纹验证
        openFinger(){
            this.CollectionFiger()
        },
        closeFinger () {
            this.cancelCapture()
        },
        CollectionFiger () {
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
        checkColl () {
            // this.base64FPImg=""
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
                        // console.log('指纹码图片：', that.imgFingerSrc)

                    }
                    if (that.collCount==0){
                        that.timer = setTimeout(that.checkColl(), 200);//比对失败重新开始
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
        getFPTemplate () {
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
                        //console.log('指纹模版：' + that.fpTemplate)
                        that.whileVerify()
                    } else {
                        that.backErr(ret)
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            })
        },
        whileVerify(){
            let fp= this.userInfo.fingerlist
            fp.forEach((item, index) => {
                if (this.doVerifyFinger(item.fingerprint)){
                    return false
                    return false
                }
            })
        },
        doVerifyFinger(fpTemplate){
            let that = this
            let regTemplate = that.fpTemplate
            $.ajax( {
                type : "POST",
                url : "http://127.0.0.1:22001/ZKBIOOnline/fingerprint/verify",
                dataType : "json",
                data:JSON.stringify({'reg':regTemplate,
                    'ver':fpTemplate}),
                async: true,
                success : function(data){
                    //返回码
                    var ret = null;
                    ret = data.ret;
                    //接口调用成功返回时
                    if(ret == 0) {
                        if (data.score > 60){
                            that.$message.success('指纹验证成功')
                            // that.Getapprove()
                            that.signPro()
                            that.dialogFinger = false
                            return true
                        } else {
                            that.$message.warning('指纹相似度' + data.score + '指纹校验失败,请重新录入')
                            that.dialogFinger = false
                            that.hasFinger = false
                            return false
                        }
                    }else {
                        that.backErr(ret)
                        that.dialogFinger = false
                        that.hasFinger = false
                        return false
                    }
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("请安装指纹驱动或启动该服务!");
                    return false
                }
            });
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
        backErr (code) {
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
    },
    beforeDestroy(){
        window.location.reload()
    }
}
</script>
<style>

</style>
<style lang="scss" scoped>
    .canvasImg{
        position: relative;
        width: 300px;
        border-radius: 300px;
        background-color: #fff!important;
        z-index: 99;
    }
    .radius{
        position: absolute;
        top: -12px;
        width: 300px;
        height: 240px;
        background: url("./../assets/right.gif") no-repeat center;
    }
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
    /deep/ .el-switch {
        position: relative;
        height: 24px;
        line-height: 24px;
        &.is-checked {
            .el-switch__core {
                background: #179bff;
                &:after {
                    margin-left: -22px;
                }
            }
        }
        .el-switch__label,
        .el-switch__core {
            height: 24px;
        }
        .el-switch__core {
            border-radius: 12px;
            border: none;
            background: #f1f1f1;
            &:after {
                box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
                width: 22px;
                height: 22px;
            }
        }
        .el-switch__label.is-active {
            color: #333;
        }
        .el-switch__label--right {
            margin-left: 0px;
            &.is-active {
                color: #fff;
                right: 24px;
            }
            position: absolute;
            right: 5px;
            top: -1px;
            color: #999;
            > span {
                font-size: 12px;
            }
        }
    }
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .active {
        color: #36C2AA;
    }
    .el-main{
        padding: 0!important;
    }
    .layout {
        width: 100%;
        background-color: #FAFAFA;
        font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
        .el-header-box {
            height: 90px !important;
            background: #fff;
            border: none;
            border-radius: 0px;
            display: flex;
            justify-content: space-between;
            .left {
                font-size:24px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(51,51,51,1);
                b{
                    color: #BFBFBF;
                    height: 20px;
                    font-weight: normal;
                }
                .switch{
                    height: 90px;
                    color: #333;
                    font-size: 18px;
                    line-height: 90px;
                }
                .sign{
                    height: 90px;
                    margin-left: 24px;
                    margin-right: 24px;
                    line-height: 90px;
                    img{
                        width: 64px;
                        height: 22px;
                        vertical-align: middle;
                    }
                }
                .marquee_top {
                     transition: all 1s;
                     margin-top: -90px;
                }
                .notice{
                    display: inline;
                    height: 90px;
                    overflow: hidden;
                    img{
                        width: 24px;
                        height: 24px;
                        vertical-align: middle;
                    }
                    .marquee_box{
                        display: inline;
                        float: right;
                        width: auto;
                        line-height: 90px;
                        font-size: 14px;
                        overflow: hidden;
                        height: 90px;
                    }
                    /*div{*/
                    /*    width: auto;*/
                    /*    display: inline-block;*/
                    /*    !*display: inline;*!*/
                    /*    color: #1990FE!important;*/
                    /*    overflow: hidden;*/
                    /*    font-size: 14px;*/
                    /*}*/
                }
            }
            .center {
                text-align: right;
                padding-left: 125px;
                font-style: normal;
                font-size: 14px;
                color: #666666;
                display: flex;
                justify-content: flex-start;
                li {
                    height: 100%;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    flex-direction: column;
                    width: 100px;
                    img{
                        margin-top: 10px;
                        width: 32px;
                        height: 32px;
                    }
                    i {
                        font-size: 60px;
                        height: 70px;
                        width: 70px;
                        text-align: center;
                        line-height: 70px;
                    }
                    span {

                        font-size: 14px;
                        line-height: 30px;
                        .showi{
                            position: absolute;
                            display: inline-block;
                            text-align: center;
                            line-height: 24px;
                            border-radius: 24px;
                            font-size: 12px;
                            top: -16px;
                            right: -16px;
                            width: 24px;
                            height: 24px;
                            background: #f00;
                            color: #fff;
                            z-index: 9
                        }
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
            }

            .right {
                font-style: normal;
                font-size: 18px;
                color: #36C2AA;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                li {
                    text-align: right;
                    width: 150px;
                    height: 30px;
                    line-height: 30px;

                    i {
                        font-size: 18px;
                    }

                    span {
                        padding-left: 10px;
                        font-size: 16px;
                    }

                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
        .login-main {
            /*background: url("~@/assets/img/login-bg.jpg") no-repeat;*/
            /*-webkit-background-size: 100% 100%;*/
            /*background-size: 100% 100%;*/
            background-color: #FAFAFA;
            /*overflow: hidden;*/
            color: #454545;
        }

        .login-footer {
            text-align: center;
            height: 44px !important;
            background: inherit;
            background-color: #F0F8FA;
            border: none;
            border-radius: 0px;
            line-height: 44px;
            font-style: normal;
            font-size: 16px;
            color: #36C2AA;
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
        min-width: 900px;
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
            border-radius: 300px;
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
