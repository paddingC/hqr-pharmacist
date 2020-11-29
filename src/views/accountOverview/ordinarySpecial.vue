<template>
    <div>
<!--<div class="chronicDisease">-->
        <!--<div class="div1">-->
            <!--<div class="video" id="remote_stream">-->
                <!--&lt;!&ndash; 远端&ndash;&gt;-->
                <!--<section class="video_local" id="local_stream">-->
                    <!--&lt;!&ndash; 本地 &ndash;&gt;-->
                <!--</section>-->
            <!--</div>-->
            <!--<div style="margin-top: 20px">-->
                <!--<label>切换摄像头&nbsp;&nbsp;</label>-->
                <!--<el-select v-model="chooseValue" @change="changeCamera" placeholder="请选择" >-->
                    <!--<el-option-->
                        <!--v-for="(item, index) in options"-->
                        <!--:key="item.deviceId"-->
                        <!--:label="item.label"-->
                        <!--:value="index">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</div>-->

            <!--<div class="patient-info">-->
                <!--<h3 class="border-left"> 患者信息</h3>-->
                <!--<p><span>门店</span>: <span>{{doorInfo.prescriptioninfo.deptname}}</span></p>-->
                <!--<p><span>患者姓名</span>: <span>{{doorInfo.prescriptioninfo.patient}}</span></p>-->
                <!--<p><span>联系电话</span>: <span>{{doorInfo.prescriptioninfo.insiderphone}}</span></p>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="div2">-->
            <!--<div class="recipel-info">-->
                <!--<h3 class="border-left"> 处方基本信息</h3>-->
                <!--<p v-if="doorInfo.prescriptioninfo.prescriptiontype == 1"><span>处方类型</span>: <span>西药</span></p>-->
                <!--<p v-if="doorInfo.prescriptioninfo.prescriptiontype == 2"><span>处方类型</span>: <span>中药</span></p>-->
                <!--<p><span>处方单号</span>: <span>{{doorInfo.prescriptioninfo.prescriptionno}}</span></p>-->
            <!--</div>-->
            <!--<div class="recipel-picture">-->
                <!--<h3 class="border-left"> 处方信息</h3>-->
                <!--<el-image-->
                    <!--class="img"-->
                    <!--style="width: 100%; height:100%"-->
                    <!--:src="doorInfo.prescriptioninfo.imageurl[0]"-->
                    <!--:preview-src-list="doorInfo.prescriptioninfo.imageurl">-->
                <!--</el-image>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="div3">-->
            <!--<h3 class="border-left">审方信息</h3>-->
            <!--<p><span>处方单</span>: <span>普通处方 || 特药处方</span></p>-->
            <!--<p><span>是否有过敏史</span>: <span>  <el-radio v-model="form.allergy" label="1">有</el-radio>-->
  <!--<el-radio v-model="form.allergy" label="2">无</el-radio></span></p>-->
            <!--<p><span>审核意见</span>: <span>  <el-radio v-model="form.approvalstatus" label="1">审核通过</el-radio>-->
  <!--<el-radio v-model="form.approvalstatus" label="2">审核不通过</el-radio></span></p>-->
            <!--<div>-->
                <!--<h3 style="line-height: 40px;">审核不通过原因 :</h3>-->
                <!--<br>-->
                <!--<el-input-->
                    <!--type="textarea"-->
                    <!--:disabled="disabled"-->
                    <!--:autosize="{ minRows: 2, maxRows: 4}"-->
                    <!--placeholder="审核不通过原因"-->
                    <!--v-model="form.reason">-->
                <!--</el-input>-->
            <!--</div>-->
            <!--<p style="margin: 50px 0 0 20px">-->
                <!--<el-button class="search" @click="submit">提 交</el-button>-->
                <!--<el-button  @click="goBack" style="color: #fff; background: #F04134; border:solid 1px #F04134; margin-left: 60px" class="search">驳 回</el-button>-->
            <!--</p>-->
        <!--</div>-->
        <!--登录-->
        <el-dialog title="提交审核" :visible.sync="loginVisible" :close-on-click-modal="false">
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
                <el-button type="primary" @click="loginSure('ruleForm')" v-if="linksure">确定</el-button>
                <el-button type="primary" v-else>确定</el-button>
            </div>
        </el-dialog>
        <!--指纹登录-->
        <el-dialog title="提交审核" :visible.sync="dialogFinger" width="420px" class="dialogTit"
                   :close-on-click-modal="false" @close="closeFinger">
            <div class="fingerTit">请水平按压手指验证</div>
            <div class="fingerImg">
                <img :src="imgFingerSrc" v-show="hasFinger">
            </div>
        </el-dialog>
        <!--人脸-->
        <el-dialog :visible.sync="value8" :close-on-press-escape="false" :close-on-click-modal="false"
                   :show-close="false" :destroy-on-close="true" title="人脸识别" width="1000px" height="600">
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
                        <video id="video" width="300" height="400"></video>
                        <div class="radius"></div>
                    </div>
                    <canvas id="canvas" style="display:none" width="300" height="400"></canvas>
                    <!--                    <img :src="idCardPhoto" alt="">-->
                    <p>请正视摄像头，以便进行人脸识别</p>
                </div>
            </div>
        </el-dialog>
        <div class="tipMenu">
            <audio id="sound-bgm">
                <source src="@/assets/defsound.wav">
            </audio>
        </div>
    <!--</div>-->
    <!--新界面-->
        <div style="height: 32px;margin-top: 12px;margin-bottom: 12px;">
            <el-button @click="videoChange" size="small">切换摄像头</el-button>
        </div>
        <div class="divNeed_No" v-if="doorInfo.beforeApproval == 0">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="divNeedL">
                        <div class="divNeedL_top">
                            <div class="right-Box" id="remote_stream">
                                <div class="local" id="local_stream" style=""></div>
                            </div>
                        </div>
                        <div class="divNeedL_bottom">
                            <h4><span></span>处方信息</h4>
                            <div v-if="doorInfo.prescriptioninfo.source == 2" style="text-align: center">
                                <el-button @click="openNew">查看附件</el-button>
                            </div>
                            <div v-else class="divNeedL_bottom_pic">
                                <el-image
                                    class="img"
                                    style="width: 100%; height:100%"
                                    :src="doorInfo.prescriptioninfo.imageurl[0]"
                                    :preview-src-list="doorInfo.prescriptioninfo.imageurl">
                                </el-image>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="divNeedR">
                        <div class="divNeedR_top">
                            <h4><span></span>患者信息</h4>
                            <p><span>门店</span>{{doorInfo.prescriptioninfo.deptname}}</p>
                            <p><span>患者姓名</span>{{doorInfo.prescriptioninfo.patient}}</p>
                            <p><span>患者电话</span>{{doorInfo.prescriptioninfo.insiderphone}}</p>
                        </div>
                        <div class="divNeedR_center">
                            <h4><span></span>审方信息</h4>
                            <p>
                                <span>审方单</span>
<!--                                <a>西药处方</a><a>普通处方</a>-->
                                <a v-if="doorInfo.prescriptioninfo.prescriptiontype == 1" class="acur">西药处方</a>
                                <a v-if="doorInfo.prescriptioninfo.prescriptiontype == 2" class="acur">中药处方</a>
                                <a v-if="doorInfo.prescriptioninfo.attribute == 1" class="uncur">普通处方</a>
                                <a v-if="doorInfo.prescriptioninfo.attribute == 2" class="uncur">慢病处方</a>
                                <a v-if="doorInfo.prescriptioninfo.attribute == 3" class="uncur">特药处方</a>
                            </p>
                            <p>
                                <span>是否有过敏史</span>
                                <label>
                                    <el-radio v-model="form.allergy" label="1">有</el-radio>
                                </label>
                                <label>
                                    <el-radio v-model="form.allergy" label="2">无</el-radio>
                                </label>
                            </p>
                            <p>
                                <span>审核意见</span>
                                <el-radio v-model="form.approvalstatus" label="1">审核通过</el-radio>
                                <el-radio v-model="form.approvalstatus" label="2">审核不通过</el-radio>
                            </p>
                            <div>
                                <div style="line-height: 40px;color: #999;float: left;margin-right: 16px;text-indent: 42px">审核不通过原因</div>
                                <el-input
                                type="textarea" class="textarea" style="width: calc(100% - 180px); margin-top: 12px;"
                                :disabled="disabled"
                                v-model="form.reason">
                                </el-input>
                                <div style="margin-left: 158px;margin-top: 12px">
                                    <el-button @click="submit" style="background: #36c2aa;color: #fff" class="search" size="small">提 交</el-button>
                                    <el-tooltip placement="top">
                                        <div slot="content">由于硬件故障、网络延迟等原因导<br/>致无法审核时，可以驳回到门店，<br/>由门店再次发起远程审方请求。</div>
                                        <el-button @click="goBack" size="small" class="search">驳 回</el-button>
                                    </el-tooltip>
                                </div>
                            </div>
                        </div>
                        <div class="divNeedR_bottom">
                            <h4><span></span>处方基本信息</h4>
                            <p v-if="doorInfo.prescriptioninfo.prescriptiontype == 1"><span>处方类型</span>西药处方</p>
                            <p v-if="doorInfo.prescriptioninfo.prescriptiontype == 2"><span>处方类型</span>中药处方</p>
                            <p><span>处方单号</span>{{doorInfo.prescriptioninfo.prescriptionno}}</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="divNeed_Yes" v-if="doorInfo.beforeApproval == 1">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="divNeedL">
                        <div class="divNeedL_top">
                            <div class="right-Box" id="remote_stream">
                                <div class="local" id="local_stream"></div>
                            </div>
                        </div>
                        <div class="divNeedL_bottom" v-if="doorInfo.prescriptioninfo.source == 2" style="text-align: center">
                            <el-button @click="openNew">查看附件</el-button>
                        </div>
                        <div v-else class="divNeedL_bottom">
                            <el-image
                                class="img"
                                style="width: 100%; height:100%"
                                :src="doorInfo.prescriptioninfo.imageurl[0]"
                                :preview-src-list="doorInfo.prescriptioninfo.imageurl">
                            </el-image>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="divNeedR">
                        <div class="divNeedR_top">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <div class="divNeedR_top_l">
                                        <h4><span></span>患者信息</h4>
                                        <p><span>门店</span>{{doorInfo.prescriptioninfo.deptname}}</p>
                                        <p><span>患者姓名</span>{{doorInfo.prescriptioninfo.patient}}</p>
                                        <p><span>患者电话</span>{{doorInfo.prescriptioninfo.insiderphone}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="divNeedR_top_r">
                                        <h4><span></span>处方基本信息</h4>
                                        <p v-if="doorInfo.prescriptioninfo.prescriptiontype == 1"><span>处方类型</span>西药处方</p>
                                        <p v-if="doorInfo.prescriptioninfo.prescriptiontype == 2"><span>处方类型</span>中药处方</p>
                                        <p><span>处方单号</span>{{doorInfo.prescriptioninfo.prescriptionno}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="divNeedR_center">
                            <h4><span></span>审方信息</h4>
                            <p>
                                <span>审方单</span>
                                <a v-if="doorInfo.prescriptioninfo.prescriptiontype == 1" class="acur">西药处方</a>
                                <a v-if="doorInfo.prescriptioninfo.prescriptiontype == 2" class="acur">中药处方</a>
                                <a v-if="doorInfo.prescriptioninfo.attribute == 1" class="uncur">普通处方</a>
                                <a v-if="doorInfo.prescriptioninfo.attribute == 2" class="uncur">慢病处方</a>
                                <a v-if="doorInfo.prescriptioninfo.attribute == 3" class="uncur">特药处方</a>
                            </p>
                            <p>
                                <span>是否有过敏史</span>
                                <label>
                                    <el-radio v-model="form.allergy" label="1">有</el-radio>
                                </label>
                                <label>
                                    <el-radio v-model="form.allergy" label="2">无</el-radio>
                                </label>
                            </p>
                            <p>
                                <span>审核意见</span>
                                <el-radio v-model="form.approvalstatus" label="1">审核通过</el-radio>
                                <el-radio v-model="form.approvalstatus" label="2">审核不通过</el-radio>
                            </p>
                            <div>
                                <div style="line-height: 40px;color: #999;float: left;margin-right: 16px;text-indent: 42px">审核不通过原因</div>
                                <el-input
                                    type="textarea" class="textarea" style="width: calc(100% - 180px); margin-top: 12px;"
                                    :disabled="disabled"
                                    v-model="form.reason">
                                </el-input>
                                <div style="margin-left: 158px; margin-top: 12px">
                                    <el-button @click="submit" style="background: #36c2aa;color: #fff" class="search" size="small">提 交</el-button>
                                    <el-tooltip placement="top">
                                        <div slot="content">由于硬件故障、网络延迟等原因导<br/>致无法审核时，可以驳回到门店，<br/>由门店再次发起远程审方请求。</div>
                                        <el-button @click="goBack" size="small" class="search">驳 回</el-button>
                                    </el-tooltip>
                                </div>
                            </div>
                        </div>
                        <div class="divNeedR_bottom">
                            <vxe-table
                                height="327"
                                border
                                ref="table"
                                :header-cell-style="headClass"
                                :data="tableData">
                                <vxe-table-column field="goodsid" title="药品ID"></vxe-table-column>
                                <vxe-table-column field="goodsname" title="药品名称"></vxe-table-column>
                                <vxe-table-column field="goodstype" title="商品规格"></vxe-table-column>
                                <vxe-table-column field="goodsunit" title="基本单位"></vxe-table-column>
                                <vxe-table-column field="prodarea" title="产地"></vxe-table-column>
                                <vxe-table-column field="goodsqty" title="数量"></vxe-table-column>
                                <vxe-table-column field="yfyl" title="用法用量"></vxe-table-column>
                            </vxe-table>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    require('../../common/lib-generate-test-usersig.min')
    import RtcClient from '../../common/RtcClient'
    import {mapGetters}    from 'vuex'
    export default {
        name: "ordinarySpecial",
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
                addNum:0,
                value8: false,
                disabled: true,
                form: {
                    prescriptiondate: '',
                    reason: '',
                    approvalstatus: '1',
                    allergy: '2',
                },
                outerVisible: false,
                innerVisible: false,
                client_: null,
                localStream_: null,
                localStream: null,
                userId: 'a998',
                isPublished_: false,
                loading: false,
                loginVisible: false,
                ruleForm: {
                    loginid: '',
                    loginpwd: ''
                },
                rules: {
                    loginid: [ {validator: checkLoginid, trigger: 'blur'} ],
                    loginpwd: [ {validator: validatePass, trigger: 'blur'} ]
                },
                rtc: null,
                linksure: true,
                dialogFinger: false,
                imgFingerSrc: '',
                fpTemplate: '',
                collCount: 0,
                timer: null,
                hasFinger: false,
                chooseValue: '',
                options: [],
                active: '2',
                tableData: []
            }
        },
        computed: {
            ...mapGetters([
                'doorInfo',
                'userInfo',
                'sdkKey',
                'creadRecord',
                'Mix',
                'loginName',
                'streamState',
                'creadState',
                'sheBeiNormal',
                'realmName',
                'camerasArr',
                'idCardInfo'
            ])
        },
        created(){
            let path = this.$route.path
            if (path !== '/home/accountOverview/ordinarySpecial') { return }
            this.$store.commit('app/SET_ROUTER', path)
        },
        mounted () {
            this.$nextTick(() => {
                this.joins()
            })
            $('#sound-bgm')[0].play()
            this.ruleForm.loginid = this.loginName
            if (this.doorInfo.beforeApproval === 1) {
                this.tableData = this.doorInfo.prescriptioninfo.dtllist
            }
        },
        sockets: {
            connect: function () {
                console.log('socket 链接成功--------------------')
                this.$socket.emit('login', JSON.stringify({
                    userid: this.userInfo.userid,
                    companyid: this.userInfo.companyid,
                    pharmacistid: this.userInfo.pharmacistid
                }));
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
        },
        methods: {
            openNew () {
                window.open(
                    this.doorInfo.prescriptioninfo.imageurl,
                    "_blank",
                    "width=375px,height=667px,top=100px,left=0px"
                )
            },
            changeCamera (e) {
                this.rtc.switchCamera(e)
            },
            open() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？').then(_ => {
                    done()
                }).catch(_ => {})
            },
            goBack(){
                let backForm = {
                    userid: this.userInfo.userid,
                    companyid: this.userInfo.companyid,
                    mduserid: this.doorInfo.mduserid,
                    approvalstatus: '4',
                    pharmacistid: this.userInfo.pharmacistid,
                    prescriptionid: this.doorInfo.prescriptioninfo.prescriptionid,
                    reason: '处方已驳回，请重新申请',
                    attribute: this.doorInfo.prescriptioninfo.attribute
                }
                this.$store.dispatch('user/sxapprove', backForm).then(() => {
                    this.rtc.leave()
                    this.$store.commit('app/SET_CALLFLASE', false)
                    this.$store.commit('app/SET_WAITTIME', 'saveOk')
                    this.$router.replace({
                        path: '/home/accountOverview/information'
                    })
                }).catch(err => {
                    console.log(err);
                })
            },
            videoChange () {
                this.rtc.switchCameraClick()
            },
            // 提交
            submit() {
                console.log(this.userInfo);
                if (this.form.approvalstatus === '') {
                    this.$message.warning("请在选择审核状态后提交")
                    return false
                }
                if (this.form.approvalstatus === '2'){
                    if ( this.form.reason != ''){
                        if (this.userInfo.approvaltype === '2') {
                            this.loginVisible = true
                        } else if (this.userInfo.approvaltype === '1'){
                            this.dialogFinger = true
                            this.openFinger()
                        } else {
                            this.loading2 = true
                            this.value8 = true
                            this.addNum = 0
                            // this.getVideo()
                            this.readCert()
                        }
                    } else {
                        this.$message.warning('请输入审批不通过原因')
                        return false
                    }
                } else {
                    if (this.userInfo.approvaltype === '2') {
                        this.loginVisible = true
                    } else if (this.userInfo.approvaltype === '1'){
                        this.dialogFinger = true
                        this.openFinger()
                    } else {
                        this.loading2 = true
                        this.value8 = true
                        this.addNum = 0
                        // this.getVideo()
                        this.readCert()
                    }
                }
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
                            that.collCount=result.data.enroll_index
                            that.hasFinger = true
                            that.imgFingerSrc = 'data:image/jpeg;base64,' + result.data.jpg_base64
                            console.log('指纹码图片：', that.imgFingerSrc)

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
                                that.Getapprove()
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
            cancelCapture () {
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
            Getapprove () {
                this.form.userid = this.userInfo.userid
                this.form.companyid = this.userInfo.companyid
                this.form.mduserid = this.doorInfo.mduserid
                this.form.prescriptionid = this.doorInfo.prescriptioninfo.prescriptionid
                this.form.attribute = this.doorInfo.prescriptioninfo.attribute
                this.form.pharmacistid = this.userInfo.pharmacistid
                this.$store.dispatch('user/sxapprove', this.form).then(() => {
                    this.dialogFinger = false
                    this.rtc.leave()
                    this.$store.commit('app/SET_CALLFLASE', false)
                    this.$store.commit('app/SET_WAITTIME', 'saveOk')
                    this.$router.replace({
                        path: '/home/accountOverview/information'
                    })
                }).catch(err => {
                    console.log(err);
                    this.dialogFinger = false
                    this.$message.warning('请重新提交审核')
                })
            },
            loginSure (formName) {
                this.linksure = false
                this.$refs[ formName ].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('user/login', this.ruleForm).then(() => {
                            this.form.userid = this.userInfo.userid
                            this.form.companyid = this.userInfo.companyid
                            this.form.mduserid = this.doorInfo.mduserid
                            this.form.prescriptionid = this.doorInfo.prescriptioninfo.prescriptionid
                            this.form.attribute = this.doorInfo.prescriptioninfo.attribute
                            this.loginVisible = false
                            this.form.pharmacistid = this.userInfo.pharmacistid
                            this.$store.dispatch('user/sxapprove', this.form).then(() => {
                                // 退出房间
                                console.log('执业药师回到总看时');
                                this.rtc.leave()
                                // 跳转首页
                                this.$store.commit('app/SET_CALLFLASE', false)
                                this.$store.commit('app/SET_WAITTIME', 'saveOk')
                                this.$router.replace({
                                    path: '/home/accountOverview/information'
                                })
                            }).catch(err => {
                                console.log(err);
                                this.linksure = true
                            })
                        }).catch((error) => {
                            console.log(error);
                            this.linksure = true
                        })
                    }else {
                        this.linksure = true
                        return false
                    }
                })

            },
            joins() {
                this.rtc = null
                if (this.rtc) return
                this.rtc = new RtcClient({
                    userId: this.userInfo.userid,
                    roomId: this.doorInfo.roomid,
                    sdkAppId: this.sdkKey.sdkAppId,
                    userSig: this.sdkKey.userSig,
                    record: {
                        userid1: this.doorInfo.mduserid,
                        companyid: this.userInfo.companyid,
                        userid2: this.userInfo.userid,
                        roomid: this.doorInfo.roomid,
                        billtype: 1,//this.doorInfo.prescriptioninfo.attribute,
                        billid: this.doorInfo.prescriptioninfo.prescriptionid
                    }
                })

                this.$store.commit('app/SET_CALLFLASE', true)
                this.rtc.join()
                this.rtc.saveCameras()
                // this.videoRefult(1)
                setTimeout (()=>{
                    if (!this.sheBeiNormal) {
                        this.$store.commit('user/SET_SGEBEI', true)
                        this.videoRefult(2)
                        /*this.$router.push({
                            path: '/home/accountOverview/information'
                        })*/
                    } else {
                        this.videoRefult(1)
                    }

                }, 1000)
                setTimeout(()=>{
                    this.options = this.camerasArr
                },1500)
            },
            videoRefult (val) {
                this.$socket.emit('videoRequestBack', JSON.stringify({
                    type: val,
                    companyid: this.userInfo.companyid,
                    mduserid: this.doorInfo.mduserid,
                    userid: this.userInfo.userid
                }))
            },
            videoRefult(val) {
                this.$socket.emit('videoRequestBack', JSON.stringify({
                    type: val,
                    companyid: this.userInfo.companyid,
                    mduserid: this.doorInfo.mduserid,
                    userid: this.userInfo.userid
                }))
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
                        if(error.code == 8) {
                            alert('电脑未识别到高拍仪')
                        }
                        // alert('错误代码: [CODE ' + error.code + ']')
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
                })
            },
            takePhotos() {
                var that = this
                let canvas = document.getElementById("canvas")
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
                    liveImage: liveImage, //摄像头拍的照片base64
                    negativeImage: this.idCardInfo.identityPic,
                    platform: 'ALI',
                    companyid: this.userInfo.companyid,
                    userid: this.userInfo.userid
                }
                this.$store.dispatch('user/faceCompare', parms).then((res) => {
                    this.$message.success('验证成功')
                    // 掉审核
                    this.Getapprove()
                }).catch((err) => {
                    this.takePhotos()
                    console.log(err)
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
                        console.log(res)
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
            headClass({row, column, rowIndex, columnIndex}) {
                return 'background:#FAFAFA;'
            }
        },
        watch: {
            "form.approvalstatus": {
                deep: true,
                handler(val) {
                    if (val === '2') {
                        this.disabled = false
                    } else {
                        this.disabled = true
                        this.form.reason = ''
                    }
                }
            }
        },
        beforeDestroy () {
            window.location.reload()
        }
    }
</script>
<style>
    .img /deep/ .el-image-viewer__close{
        color: #f00!important;
    }

    .textarea .el-textarea__inner{
        height: 88px!important;
        resize: none!important;
    }
</style>
<style scoped lang="scss">
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
        background: url("./../../assets/right.gif") no-repeat center;
    }
    .divNeed_No{
        .divNeedL{
            height: 100%;
            .divNeedL_top{
                position: relative;
                height: 474px;
                border:solid 1px #E6E6E6;
                border-radius: 5px;
                background-color: #FFFFFF!important;
                background: url("../../assets/img/video_default.png") no-repeat;
                background-size: 64px 64px;
                background-position:center;
                .right-Box{
                    width: 100%;
                    height: 100%;
                }
                .local{
                    position: absolute;
                    right: 0;
                    bottom: 0px;
                    width: 280px;
                    height: 224px;
                    z-index: 9;
                    background-color: #FAFAFA;
                }
            }
            .divNeedL_bottom{
                margin-top: 16px;
                height: 434px;
                border:solid 1px #E6E6E6;
                border-radius: 5px;
                background-color: #FAFAFA!important;
                background: url("../../assets/img/pic_default.png") no-repeat;
                background-size: 64px 64px;
                background-position:center;
                h4{
                    color: #333;
                    font-size: 16px;
                    font-weight: normal;
                    height: 56px;
                    line-height: 56px;
                    text-indent: 24px;
                    span{
                        margin-right: 16px;
                        display: inline-block;
                        width: 4px;
                        height: 18px;
                        background: #36c2aa;
                    }
                }
                .divNeedL_bottom_pic{
                    width: 100%;
                    height: calc(434px - 56px);
                }
            }
        }
        .divNeedR{
            .divNeedR_top{
                height: 324px;
                border:solid 1px #E6E6E6;
                border-radius: 5px;
                background-color: #FFFFFF!important;
                h4{
                    color: #333;
                    font-size: 16px;
                    font-weight: normal;
                    height: 56px;
                    line-height: 56px;
                    text-indent: 24px;
                    span{
                        margin-right: 16px;
                        display: inline-block;
                        width: 4px;
                        height: 18px;
                        background: #36c2aa;
                    }
                }
                p{
                    text-indent: 24px;
                    line-height: 32px;
                    span{
                        color: #999;
                        width: 86px;
                        margin-right: 16px;
                        display: inline-block;
                    }
                }
            }
            .divNeedR_center{
                height: 348px;
                margin-top: 16px;
                margin-bottom: 16px;
                border:solid 1px #E6E6E6;
                border-radius: 5px;
                background-color: #FFFFFF!important;
                h4{
                    color: #333;
                    font-size: 16px;
                    font-weight: normal;
                    height: 56px;
                    line-height: 56px;
                    text-indent: 24px;
                    span{
                        margin-right: 16px;
                        display: inline-block;
                        width: 4px;
                        height: 18px;
                        background: #36c2aa;
                    }
                }
                p{
                    text-indent: 24px;
                    line-height: 32px;
                    span{
                        color: #999;
                        width: 116px;
                        text-align: right;
                        margin-right: 16px;
                        display: inline-block;
                    }
                    a{
                        padding: 4px 6px;
                    }
                    a:nth-child(2){
                        /*color: #00A383;*/
                        /*background: #E1F5ED;*/
                        margin-right: 16px;
                    }
                    .acur{
                        color: #00A383;
                        background: #E1F5ED;
                        margin-right: 16px;
                    }
                    .uncur{
                        color: #728AA1;
                        background: #E0EDFD;
                    }
                    label{
                        text-indent: 0;
                        width: 82px;
                    }
                }
                .textarea{
                    resize: none!important;
                }
            }
            .divNeedR_bottom{
                height: 218px;
                border:solid 1px #E6E6E6;
                border-radius: 5px;
                background-color: #FFFFFF!important;
                h4{
                    color: #333;
                    font-size: 16px;
                    font-weight: normal;
                    height: 56px;
                    line-height: 56px;
                    text-indent: 24px;
                    span{
                        margin-right: 16px;
                        display: inline-block;
                        width: 4px;
                        height: 18px;
                        background: #36c2aa;
                    }
                }
                p{
                    text-indent: 24px;
                    line-height: 32px;
                    span{
                        color: #999;
                        width: 86px;
                        margin-right: 16px;
                        display: inline-block;
                    }
                }
            }
        }
    }
    .divNeed_Yes{
        .divNeedL{
            height: 100%;
            .divNeedL_top{
                position: relative;
                height: 504px;
                border:solid 1px #E6E6E6;
                border-radius: 5px;
                background-color: #FFFFFF!important;
                background: url("../../assets/img/video_default.png") no-repeat;
                background-size: 64px 64px;
                background-position:center;
                .right-Box{
                    width: 100%;
                    height: 100%;
                }
                .local{
                    position: absolute;
                    right: 0;
                    bottom: 0px;
                    width: 280px;
                    height: 224px;
                    z-index: 9;
                    background-color: #FAFAFA;
                }
            }
            .divNeedL_bottom{
                margin-top: 16px;
                height: 329px;
                border:solid 1px #E6E6E6;
                border-radius: 5px;
                background-color: #FFFFFF!important;
                background: url("../../assets/img/pic_default.png") no-repeat;
                background-size: 64px 64px;
                background-position:center;
            }
        }
        .divNeedR{
            .divNeedR_top{
                .divNeedR_top_l,
                .divNeedR_top_r{
                    height: 166px;
                    border:solid 1px #E6E6E6;
                    border-radius: 5px;
                    background-color: #FFFFFF!important;
                }
                h4{
                    color: #333;
                    font-size: 16px;
                    font-weight: normal;
                    height: 56px;
                    line-height: 56px;
                    text-indent: 24px;
                    span{
                        margin-right: 16px;
                        display: inline-block;
                        width: 4px;
                        height: 18px;
                        background: #36c2aa;
                    }
                }
                p{
                    text-indent: 24px;
                    line-height: 32px;
                    span{
                        color: #999;
                        width: 86px;
                        margin-right: 16px;
                        display: inline-block;
                    }
                }
            }
            .divNeedR_center {
                height: 322px;
                margin-top: 16px;
                margin-bottom: 16px;
                border:solid 1px #E6E6E6;
                border-radius: 5px;
                background-color: #FFFFFF!important;
                h4{
                    color: #333;
                    font-size: 16px;
                    font-weight: normal;
                    height: 56px;
                    line-height: 56px;
                    text-indent: 24px;
                    span{
                        margin-right: 16px;
                        display: inline-block;
                        width: 4px;
                        height: 18px;
                        background: #36c2aa;
                    }
                }
                p{
                    text-indent: 24px;
                    line-height: 32px;
                    span{
                        color: #999;
                        width: 116px;
                        text-align: right;
                        margin-right: 16px;
                        display: inline-block;
                    }
                    a{
                        padding: 4px 6px;
                    }
                    a:nth-child(2){
                        /*color: #00A383;*/
                        /*background: #E1F5ED;*/
                        margin-right: 16px;
                    }
                    /*a:nth-child(3){*/
                    /*    color: #728AA1;*/
                    /*    background: #E0EDFD;*/
                    /*}*/
                    .acur{
                        color: #00A383;
                        background: #E1F5ED;
                    }
                    .uncur{
                        color: #728AA1;
                        background: #E0EDFD;
                    }
                    label{
                        text-indent: 0;
                        width: 82px;
                    }
                }
                .textarea{
                    resize: none!important;
                }
            }
            .divNeedR_bottom{
                height: 329px;
                background: #FFFFFF;
            }
        }
    }
    /*新界面up*/
    .fingerImg{
        background: url("../../assets/img/fingerKang.png") no-repeat;
        width:130px;
        height: 166px;
        margin-left: 10px;
        text-align: center;
        margin-left: 130px;
        margin-top: 60px;
        margin-bottom: 60px;
    }
    .fingerImg img{
        vertical-align: middle;
        width: 110px;
        height: 146px;
        margin: 10px;
    }
    .fingerTit{
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        line-height: 32px;
        color: #36c2aa;
    }
    .chronicDisease {
        .search {
            color: #FFF;
            background-color: $color-btn;
            border-color: $color-btn;
        }

        height: 100%;
        width: 100%;
        bottom: 0px;
        display: -webkit-box;
        display: flex;
        display: -ms-flex;
        display: -webkit-flex;
        font-size: 18px;

        .div1, .div2, .div3 {
            padding: 5px;

            flex: 1;
            -ms-flex: 1;
            -webkit-flex: 1;
            -webkit-box-flex: 1;
            position: relative;
            height: 100%;

            .border-left {
                line-height: 30px;
                border-left: 3px solid #36C2AA;
                font-size: 22px;
                margin: 10px 0;
                padding-left: 15px;
            }
        }

        .div1 {
            .video {
                position: relative;
                height: 50%;
                background-color: #f0f8fa !important;
                background: url("../../assets/img/videoIcon.png") no-repeat;
                background-position:center;
            }

            .video_local{
                position: absolute;
                width: 50%;
                height: 120px;
                background: #f0f8fa;
                bottom: 0px;
                right: 0px;
                z-index: 99
            }
            .patient-info {
                height: 50%;


                p {
                    line-height: 40px;
                    font-size: 16px;

                    & span:first-child {
                        display: inline-block;
                        text-align-last: justify;
                        text-align: justify;
                        text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
                        width: 80px;
                    }

                    & span:last-child {
                        display: inline-block;
                        padding: 0 10px;
                        color: #909399;
                    }
                }
            }
        }

        .div2 {

            .recipel-info {
                height: 50%;

                h3 {
                    line-height: 30px;
                    border-left: 3px solid #36C2AA;
                    font-size: 22px;
                    margin: 10px 0;
                    padding-left: 15px;
                }

                p {
                    line-height: 40px;
                    font-size: 16px;

                    & span:first-child {
                        display: inline-block;
                        text-align-last: justify;
                        text-align: justify;
                        text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
                        width: 80px;
                    }

                    & span:last-child {
                        display: inline-block;
                        padding: 0 10px;
                        color: #909399;
                    }
                }
            }

            .recipel-picture {
                height: 50%;
            }
        }

        .div3 {
            p {
                line-height: 40px;
                font-size: 16px;

                & span:first-child {
                    display: inline-block;
                    text-align-last: justify;
                    text-align: justify;
                    text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
                    width: 100px;
                }

                & span:last-child {
                    display: inline-block;
                    padding: 0 10px;
                    color: #909399;
                }
            }
        }

        /deep/ .el-dialog__body {
            padding: 15px 15px;
        }

        .main-content {
            height: 500px;
            display: flex;
            flex-direction: column;

            .border-left {
                line-height: 25px;
                border-left: 3px solid #36C2AA;
                font-size: 22px;
                margin: 5px 0;
                padding-left: 15px;
            }

            .img {
                flex: 1;

                .img-box {
                    height: calc(100% - 35px);
                }
            }

            .info {
                height: 200px;

                .info-box {
                    height: calc(100% - 35px);
                    padding: 10px;
                }
            }
        }

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
        }
    }

    .el-card-id-card {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        border: 1px solid #EBEEF5;
        background: url('../../assets/img/shenfenzheng_1.png');
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
