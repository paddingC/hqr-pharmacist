<template>
    <!--<div class="information">-->
        <!--<div class="left-BOX">-->
            <!--<el-row :gutter="20">-->
                <!--<el-col :span="6">-->
                    <!--<div class="col-title">-->
                        <!--药师信息-->
                    <!--</div>-->
                <!--</el-col>-->
                <!--<el-col :span="18">-->
                    <!--<div class=" col-title">-->
                        <!--<el-switch-->
                            <!--:disabled="isDisabled"-->
                            <!--@change="switchEvent"-->
                            <!--v-model="form.workstatus"-->
                            <!--active-color="#13ce66"-->
                            <!--inactive-color="#ff4949">-->
                        <!--</el-switch>-->
                    <!--</div>-->
                <!--</el-col>-->

            <!--</el-row>-->
            <!--<el-row :gutter="20">-->
                <!--<el-col :span="6">-->
                    <!--<div class="user-img">-->
                        <!--<el-avatar shape="square" v-if="form.headimage.length > -1" style="background:#fff;-->
                        <!--height: 5.3cm;-->
                        <!--width: 3.5cm;-->
                        <!--border-radius: 0px" :fit="fit" :src="form.headimage[0]"></el-avatar>-->
                    <!--</div>-->
                <!--</el-col>-->
                <!--<el-col :span="18">-->
                    <!--<ul>-->
                        <!--<li class="store-name">{{form.companyname}}</li>-->
                        <!--<li class="phone">电话 :{{form.telphone}}</li>-->
                        <!--<li class="sc-time">注册时间: {{form.registdate}}</li>-->
                    <!--</ul>-->
                <!--</el-col>-->

            <!--</el-row>-->
            <!--<el-row :gutter="20" class="timer">-->
                <!--<el-col :span="14">-->
            <!--<span class="time1">-->
                <!--药师注册证有效期 : {{form.validdate}}-->
            <!--</span>-->
                <!--</el-col>-->
                <!--<el-col :span="8">-->
                    <!--<span class="time2">剩余日期 : {{form.validnum}}</span>-->
                <!--</el-col>-->

            <!--</el-row>-->
            <!--<div class="card">-->
                <!--<div class="item item1">-->
                    <!--<span>{{form.adopt}}</span>-->
                    <!--<span class="border-L">{{form.refuse}}</span>-->
                    <!--<span class="border-L">{{form.instructiontimes}}</span>-->
                <!--</div>-->
                <!--<div class="item">-->
                    <!--<span>已通过处方</span>-->
                    <!--<span>未通过处方</span>-->
                    <!--<span>咨询人数</span>-->
                <!--</div>-->
            <!--</div>-->

        <!--</div>-->
        <!--<div class="right-Box">-->
            <!--<div>-->
                <!--<el-row :gutter="20">-->
                    <!--<el-col :span="24">-->
                        <!--<div class="col-title">-->
                            <!--呼入药店-->
                        <!--</div>-->
                    <!--</el-col>-->
                <!--</el-row>-->
                <!--<div style="height: 128px">-->
                    <!--<div class="card"  v-if="hasRequest">-->
                        <!--<div class="title">-->
                            <!--{{placepointInfo.deptname}}-->
                        <!--</div>-->
                        <!--<div class="item item1">-->
                            <!--<span>{{placepointInfo.adopt}}</span>-->
                            <!--<span class="border-L">{{placepointInfo.refuse}}</span>-->
                            <!--<span class="border-L">{{placepointInfo.instructionnum}}</span>-->
                        <!--</div>-->
                        <!--<div class="item">-->
                            <!--<span>已通过处方</span>-->
                            <!--<span>未通过处方</span>-->
                            <!--<span>咨询人数</span>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="chart-box">-->
                <!--<div class="chart-left">-->
                    <!--审方统计-->
                <!--</div>-->
                <!--<div class="chart-right">-->
                    <!--<ve-line :data="chartData" :settings="chartSettings"></ve-line>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

    <!--</div>-->
    <!--最新界面-->
    <div class="infoMain">
        <div class="infoTop">
            <el-row :gutter="20">
                <el-col :span="10">
                    <div class="infoTopcon infoTop_l">
                        <div class="user-img">
                            <el-avatar shape="square" v-if="form.headimage.length > -1" :fit="fit" :src="form.headimage[0]"></el-avatar>
                        </div>
                        <div class="user_info">
                            <p>{{form.username}}</p>
                            <p>{{form.type}}&nbsp;|&nbsp;{{form.registdate}}&nbsp;至&nbsp;{{form.validdate}}&nbsp;|&nbsp;剩余 {{form.validnum==null?'0天':form.validnum + '天'}}
                                <img @click="showViewerPic(form.certificate)" src="@/assets/img/certificate.png" style="width: 78px;height: 22px;vertical-align: middle"/>
                            </p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="infoTopcon infoTop_c">
                        <span>今日审方</span>
                        <h4>{{form.todayApprovalTimes}}</h4>
                        <p>通过 <span>{{form.todayaAdopt}}</span> 不通过<span>{{form.todayRefuse}}</span> 通过率<span>{{form.percentage}}</span></p>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="infoTopcon infoTop_r">
                        <span>今日咨询</span>
                        <h4>{{form.todayInstructionTimes}}</h4>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="infoBottom">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="infoBottomcon infoBottom_l">
                        <h4>审方统计</h4>
                        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="infoBottomcon infoBottom_r">
                        <h4>咨询统计</h4>
                        <ve-line :data="chartData1" :settings="chartSettings1"></ve-line>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-image-viewer
            v-if="showViewer"
            :on-close="closeViewer"
            :url-list="certificate" />
<!--        <el-dialog :title="doorTip" :visible.sync="dialogVisible" width="30%">-->
<!--            <span>是否加入?</span>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="refuse">拒 绝</el-button>-->
<!--                <el-button class="search" @click="videoCall">确 定</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->
    </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import {mapGetters}    from 'vuex'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
let echarts = require('echarts/lib/echarts')
export default {
    components: {
        VeLine,
        ElImageViewer
    },
    data() {
        this.chartSettings = {
            labelMap: {
                'sumtotal': '',
            },
        }
        this.chartSettings1 = {
            labelMap: {
                'ct': '',
            },
        }
        return {
            chartData: {
                columns: [ 'date', 'sumtotal' ],
                rows: []
            },
            chartData1: {
                columns: [ 'date', 'ct' ],
                rows: []
            },
            dialogVisible: false,
            hasRequest: false,
            fit: 'fill',
            val: true,
            form: {
                headimage: []
            },
            weekWork: {
                companyid: '',
                beginapprovaldate: '',
                endapprovaldate: '',
                pharmacistid: ''
            },
            placepointInfo: {},
            userid: '',
            doorTip: '',
            isDisabled: false,
            onLine: navigator.onLine,
            net: false,
            useMsg: {},
            weekWork2: {},
            showViewer: false,
            certificate: []
        }

    },
    computed: {
        ...mapGetters([
            'doctorInfo',
            'pharmacistid',
            'userInfo',
            'workLine',
            'doorInfo',
            'networkSuccess',
            'waitTime',
            'sheBeiNormal',

            // ...
        ])
    },
    sockets: {
        connect: function () {
            this.$socket.emit('login', JSON.stringify({
                userid: this.userInfo.userid, companyid: this.userInfo.companyid
            }))
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
        showViewerPic (e) {
            this.certificate = e
            this.showViewer = true
        },
        closeViewer () {
            this.showViewer = false
        },
        videoCall() {
            this.dialogVisible = false
            this.$socket.emit('pharmacistVideoRequestBack', JSON.stringify({
                type: 1,
                companyid: this.userInfo.companyid,
                mduserid: this.useMsg.mduserid,
                userid: this.userInfo.userid
            }))
            sessionStorage.setItem('noVideo', '1')
            // 用药指导
            this.$router.push({
                path: '/home/accountOverview/medicationGuidance'
            })
        },
        refuse(){
            this.$socket.emit('pharmacistVideoRequestBack', JSON.stringify({
                type: 2,
                companyid: this.userInfo.companyid,
                mduserid:  this.useMsg.mduserid,
                userid: this.userInfo.userid
            }))
            this.dialogVisible = false
            this.form.workstatus = false
            this.hasRequest = false
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
            this.hasRequest = false
        },
        getInfo () {
            // if (this.waitTime === 'loginOk' || this.waitTime === 'saveOk'){
            console.log(this.waitTime);
            if (this.waitTime === 'saveOk'){
                this.$socket.emit('changeStatus', JSON.stringify({
                    userid: this.userInfo.userid,
                    companyid: this.userInfo.companyid,
                    pharmacistid: this.userInfo.pharmacistid,
                    workstatus: 0
                }))
                this.$store.commit('app/SET_WAITTIME', '')
            }
            this.$store.dispatch('user/getPharmacistInfo',{companyId: this.userInfo.companyid, data: this.userInfo.pharmacistid} ).then(res => {
                if (res.status === 200) {
                    this.form = res.data
                    if (this.form.headimage == undefined) {
                        this.form.headimage = []
                    }
                    this.getDate()
                    this.getdayworkload()
                    this.getNum()
                }
            }).catch(err => {
                console.log(err);
            })
        },
        getNum () {
            this.$store.dispatch('user/batchGetDictList', {
                companyId: this.userInfo.companyid,
                data: ['DZSF_PHARMACIST_TYPE']
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    res.data.DZSF_PHARMACIST_TYPE.forEach(i => {
                        if (this.form.type === i.dictValue) {
                            this.form.type = i.dictDtlName
                        }
                    })
                }
            })
        },
        getdayworkload () {
            this.$store.dispatch('user/getdayworkload', this.weekWork).then(() => {
                if (this.workLine != null) {
                    this.chartData.rows = this.workLine.list
                }
            }).catch(err => {
                console.log(err);
            })
            this.$store.dispatch('user/getInstructionCount', this.weekWork2).then(res =>{
                if (res.data != null) {
                    this.chartData1.rows = res.data
                }
            })
        },
        getDate () {
            var date1 = new Date();
            var time1 = date1.getFullYear()+"-"+(this.appendZero(date1.getMonth()+1))+"-"+(this.appendZero(date1.getDate())); //time1表示当前时间
            var date2 = new Date(date1);
            date2.setDate(date1.getDate()+ (-7));
            var time2 = date2.getFullYear()+"-"+(this.appendZero(date2.getMonth()+1))+"-"+(this.appendZero(date2.getDate()));
            this.weekWork = {
                companyid: this.userInfo.companyid,
                beginapprovaldate: time2,
                endapprovaldate: time1,
                pharmacistid: this.userInfo.pharmacistid
            }
            this.weekWork2 = {
                begindate: time2,
                enddate: time1,
                pharmacistid: this.userInfo.pharmacistid
            }
        },
        appendZero (obj) {
            if (obj < 10) {
                return '0' + obj
            } else {
                return obj
            }
        },
    },
    mounted () {
        window.addEventListener("offline", () => {
            this.form.workstatus = false
            this.isDisabled = true
        });
        window.addEventListener("online", () => {
            window.location.reload()
        })
    },
    created() {
        let path = this.$route.path
        this.$store.commit('app/SET_ROUTER', path)
        this.$nextTick(() => {
            this.getInfo()
            this.getDate()
        })
    }
}
</script>
<style>
    .el-icon-circle-close{
        color: #f00;
    }
    .el-avatar>img{
        width: 100%;
        height: auto;
    }
</style>
<style scoped lang="scss">
    .el-main{
        padding: 0!important;
    }
    .infoMain{
        padding-top: 20px;
        .infoTop{
            margin-left: 80px;
            margin-right: 80px;
            .infoTopcon{
                height:138px;
                background:rgba(255,255,255,1);
                border-radius:4px;
                border:1px solid rgba(230,230,230,1);
            }
            .infoTop_l{
                height:138px;
                .user-img{
                    margin-top: 32px;
                    padding-left: 24px;
                    float: left;
                    .el-avatar{
                        height: 56px;
                        width: 56px;
                        border-radius: 56px;
                        border:1px solid #E6E6E6;
                        background: #E6E6E6;
                        margin-right: 20px;
                        img{
                        }
                    }
                }
                .user_info{
                    float: left;
                    p:first-child{
                        margin-top: 36px;
                        font-size: 20px;
                        color: #333;
                    }
                    p{
                        line-height: 36px;
                    }
                    p:last-child{
                        font-size: 14px;
                        color: #999;
                    }
                }
            }
            .infoTop_c{
                text-indent: 24px;
                span{
                    line-height: 48px;
                }
                h4{
                    font-size: 30px;
                    color: #333;
                    font-weight: normal;
                }
                p{
                    color: #999;
                    span{
                        margin-right: 12px;
                        margin-left: 6px;
                    }
                    span:nth-child(1){
                        color: #36c2aa;
                    }
                    span:nth-child(2){
                        color: #F04134;
                    }
                    span:nth-child(3){
                        color: #F5A623;
                    }
                }
            }
            .infoTop_r{
                text-indent: 24px;
                h4{
                    font-size: 30px;
                    color: #333;
                    font-weight: normal;
                }
                span{
                    line-height: 48px;
                }
            }
        }
        .infoBottom{
            margin-left: 80px;
            margin-right: 80px;
            margin-top: 16px;
            .infoBottomcon{
                height:454px;
                background:rgba(255,255,255,1);
                border-radius:4px;
                border:1px solid rgba(230,230,230,1);
                h4{
                    height: 56px;
                    line-height: 56px;
                    color: #333;
                    font-weight: normal;
                    font-size: 20px;
                    padding-left: 24px;
                }
            }
        }
    }
    /*------------------------------------------*/
    .information {
        .search {
            color: #FFF;
            background-color: $color-btn;
            border-color: $color-btn;
        }

        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        .left-BOX {
            width: 600px;
            height: 100%;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            padding: 10px;
            font-size: 16px;

            .col-title {
                font-size: 26px;
                line-height: 60px;
            }

            .user-img {
                height: 180px;
            }

            li {
                line-height: 45px;
                font-size: 16px;
            }

            .store-name {
                font-size: 20px;
                color: #36C2AA;
            }

            .timer .time1, .timer .time2 {
                line-height: 70px;
            }

            .card {
                box-shadow: 0 8px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 80%;
                margin-left: 10%;

                .item {
                    height: 200px;
                    width: 100%;
                    font-size: 18px;

                    span {
                        text-align: center;
                        display: inline-block;
                        width: 33.3333%;

                    }
                }

                .item1 {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .border-L {
                    border-left: 1px solid skyblue;
                }


            }


        }

        .right-Box {
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            flex: 1;
            height: 100%;
            margin-left: 10px;
            display: flex;
            flex-direction: column;

            .col-title {
                font-size: 26px;
            }

            .card {
                margin-top: 10px;
                box-shadow: 0 8px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 40%;

                .title {
                    line-height: 40px;
                    font-size: 20px;
                    padding: 5px;
                    box-sizing: border-box;
                }

                .item {
                    height: 60px;
                    width: 100%;
                    font-size: 18px;

                    span {
                        text-align: center;
                        display: inline-block;
                        width: 33.3333%;

                    }
                }

                .item1 {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .border-L {
                    border-left: 1px solid skyblue;
                }


            }

            .chart-box {
                padding: 20px 0px;
                display: flex;
                flex: 1;
                /*justify-content: center;*/

                .chart-left {
                    font-size: 26px;
                    width: 130px;
                }

                .chart-right {
                    flex: 1;
                    height: 100%;
                }
            }
        }
    }
</style>
