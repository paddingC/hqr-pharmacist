<template>
    <div class="medicationGuidance">
        <section class="video" id="remote_stream">
            <!-- 远端-->
            <section class="video_local" id="local_stream">
                <!-- 本地 -->
            </section>
        </section>
        <section class="button-end">
            <label>切换摄像头&nbsp;&nbsp;</label>
            <el-select v-model="chooseValue" @change="changeCamera" placeholder="请选择" >
                <el-option
                    v-for="(item, index) in options"
                    :key="item.deviceId"
                    :label="item.label"
                    :value="index">
                </el-option>
            </el-select>
            <el-button @click="endGuidance" style="margin-left: 10px">结束指导</el-button>
            <el-badge :is-dot="isDot" style="margin-left: 10px">
                <el-button :disabled="!src" @click="picturePrew" >查看图片</el-button>
            </el-badge>
        </section>
        <div class="tipMenu">
            <audio id="sound-bgm">
                <source src="@/assets/defsound.wav">
            </audio>
        </div>
        <el-dialog title="图片" :destroy-on-close="true"   :before-close="handleClose" :visible.sync="dialogTableVisible" width="800px">
            <div class="block">
                <el-image :src="src"></el-image>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import TRTC from 'trtc-js-sdk'
import $ from 'jquery';
require('../../common/lib-generate-test-usersig.min')
import RtcClient from '../../common/RtcClient'
import {mapGetters}    from 'vuex'

export default {
    name: "medicationGuidance",
    data() {
        return {
            src:null,
            dialogTableVisible:false,
            isDot:false,
            fit: 'cover',
            client_: null,
            localStream_: null,
            localStream: null,
            userId: 'a998',
            isPublished_: false,
            timer: null,
            rtc: null,
            chooseValue: '',
            options: [],
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'doorInfo',
            'usedoorInfo',
            'sdkKey',
            'creadRecord',
            'Mix',
            'streamState',
            'sheBeiNormal',
            'camerasArr'
            // ...
        ])
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
        videoEnd (data) {
            if (data.status === 200) {
                if(this.usedoorInfo.roomid == data.data.roomid) {
                    this.rtc.leave()
                    this.$store.commit('app/SET_CALLFLASE', false)
                    this.$store.commit('app/SET_WAITTIME', 'saveOk')
                    this.$router.replace({
                        path: '/home/accountOverview/information'
                    })
                }
            }
        },
        shopImage(data){
            this.src=data
            this.isDot=true
        }
    },
    methods: {
        picturePrew(){
            this.dialogTableVisible=true
            this.isDot=false
        },
        handleClose(done) {
            done();
        },
        changeCamera (e) {
            this.rtc.switchCamera(e)
        },
        endGuidance() {
            this.$store.commit('app/SET_CALLFLASE', false)
            this.$store.commit('app/SET_WAITTIME', 'saveOk')
            this.$socket.emit('instructionEnd', JSON.stringify({
                mduserid: this.usedoorInfo.mduserid,
                regid: this.usedoorInfo.instructioninfo.regid,
                companyid: this.userInfo.companyid,
                pharmacistuserid: this.userInfo.userid
            }));
            this.$router.replace({
                path: '/home/accountOverview/information'
            })
        },
        getKey(){
            let params = {
                userid: this.userInfo.userid,
                companyid: this.userInfo.companyid
            }
            this.$store.dispatch('user/getkey', params).then(() => {
                this.join()
            }).catch((err) => {
                this.$message.error('网络异常')
                console.log(err);
            })
        },
        join() {
            this.rtc = null
            if (this.rtc) return
            this.rtc = new RtcClient({
                userId: this.userInfo.userid, //this.userInfo.userid,
                roomId: this.usedoorInfo.roomid,
                sdkAppId: this.sdkKey.sdkAppId,
                userSig: this.sdkKey.userSig,
                record: {
                    userid1: this.usedoorInfo.mduserid,
                    companyid: this.userInfo.companyid,
                    userid2: this.userInfo.userid,
                    roomid: this.usedoorInfo.roomid,
                    billtype: 2,
                    billid: this.usedoorInfo.instructioninfo.regid
                },
                streamState: this.streamState
            })
            this.$store.commit('app/SET_CALLFLASE', true)
            this.rtc.join()
            this.rtc.saveCameras()
            // 获取设备失败，拒绝
            setTimeout (()=> {
                console.log('音频视频的设备状态+++++++++++++++++++++++++' + this.sheBeiNormal);
                if (!this.sheBeiNormal) {
                    this.videoRefult(2)
                    this.$store.commit('user/SET_SGEBEI', true)
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
                mduserid: this.usedoorInfo.mduserid,
                userid: this.userInfo.userid
            }))
        },
    },
    mounted() {
        console.log(this.usedoorInfo);
        this.$nextTick(() => {
            this.getKey()
        })
        console.log('播放音频');
        $('#sound-bgm')[0].play()
    },
    beforeDestroy () {
        window.location.reload()
    }
}
</script>

<style lang="scss" scoped>
    .medicationGuidance {
        padding: 40px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .video {
            position: relative;
            width: 90%;
            flex: 1;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

            & /deep/ .el-image {
                width: 100%;
                height: 100%;
            }

            img {
                width: 100%;
                height: 100%;
            }
            background-color: #f0f8fa !important;
            background: url("../../assets/img/videoIcon.png") no-repeat;
            background-position:center;
        }
        .video_local{
            position: absolute;
            width: 20%;
            height: 260px;
            background: #f0f8fa;
            bottom: 20px;
            right: 20px;
            z-index: 9999
        }

        .button-end {
            height: 100px;
                display: flex;
                    justify-content: space-between;
            align-items: center;
        }
    }
</style>
