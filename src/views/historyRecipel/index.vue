<template>
    <div class="historyRecipel">
        <!--<div class="form-serch">-->
            <!--<el-form :inline="true" class="left" :model="formInline" label-width="120px">-->
                <!--<el-form-item label="执业药师姓名">-->
                    <!--<el-autocomplete-->
                        <!--class="search-w"-->
                        <!--v-model="formInline.pharmacistname"-->
                        <!--filterable allow-create default-first-option-->
                        <!--:fetch-suggestions="querySearchName">-->
                    <!--</el-autocomplete>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="患者姓名">-->
                    <!--<el-input v-model="formInline.patient" placeholder="患者姓名" style="width: 240px;"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="是否慢病">-->
                    <!--<el-select style="width: 240px;" v-model="formInline.attribute" placeholder="处方状态">-->
                        <!--<el-option label="是" value="2"></el-option>-->
                        <!--<el-option label="否" value="4"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<div>-->
                    <!--<el-form-item label="提交药店">-->
                        <!--<el-autocomplete-->
                            <!--class="search-w"-->
                            <!--v-model="formInline.deptname"-->
                            <!--filterable allow-create default-first-option-->
                            <!--:fetch-suggestions="querySearchStore">-->
                        <!--</el-autocomplete>-->
                    <!--</el-form-item>-->

                    <!--<el-form-item label="开始时间">-->
                        <!--<el-date-picker-->
                            <!--style="width: 240px"-->
                            <!--v-model="formInline.beginapprovaldate"-->
                            <!--type="date"-->
                            <!--value-format="yyyy-MM-dd HH:mm:ss"-->
                            <!--placeholder="选择日期">-->
                        <!--</el-date-picker>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="结束时间">-->
                        <!--<el-date-picker-->
                            <!--style="width: 240px"-->
                            <!--v-model="formInline.endapprovaldate"-->
                            <!--type="date"-->
                            <!--value-format="yyyy-MM-dd HH:mm:ss"-->
                            <!--placeholder="选择日期">-->
                        <!--</el-date-picker>-->
                    <!--</el-form-item>-->

                <!--</div>-->
            <!--</el-form>-->
            <!--<el-form class="right">-->
                <!--<div style="text-align: center">-->
                    <!--<el-button @click="moreSearch">更多</el-button>-->
                    <!--<el-button @click="checkMore">批量审核</el-button>-->
                <!--</div>-->
                <!--<el-form-item class="buttons" style="margin-top: 6px">-->
                    <!--<el-button class="search" type="success" @click="search">查询</el-button>-->
                    <!--<el-button @click="clear">清空</el-button>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</div>-->
        <!--<div class="table">-->
            <!--<div class="left">-->
                <!--<div>-->
                    <!--<span>-->
                        <!--处方列表共 {{info}} 条-->
                    <!--</span>-->
                    <!--<div style="margin: 15px 0;"></div>-->

                    <!--<vxe-table-->
                        <!--height="450"-->
                        <!--border-->
                        <!--ref="table"-->
                        <!--:header-cell-style="headClass"-->
                        <!--highlight-hover-row-->
                        <!--highlight-current-row-->
                        <!--:data="tableData"-->
                        <!--@current-change="findUrl">-->
                        <!--<vxe-table-column type="checkbox" width="60"></vxe-table-column>-->
                        <!--<vxe-table-column type="index" title="序号" width="60"></vxe-table-column>-->
                        <!--<vxe-table-column field="prescriptionno" title="处方流水号"></vxe-table-column>-->
                        <!--<vxe-table-column field="patient" title="患者姓名"></vxe-table-column>-->
                        <!--<vxe-table-column field="insiderphone" title="联系方式">-->
                            <!--<template v-slot="{ row }">-->
                                <!--<template>-->
                                    <!--{{row.insiderphone |formatPhone}}-->
                                <!--</template>-->
                            <!--</template>-->
                        <!--</vxe-table-column>-->
                        <!--<vxe-table-column field="approvalstatus" title="审方状态" :formatter="approvalstatusM"></vxe-table-column>-->
                        <!--<vxe-table-column field="reason" title="不通过原因"></vxe-table-column>-->
                        <!--<vxe-table-column field="pharmacistname" title="执业药师姓名"></vxe-table-column>-->
                        <!--<vxe-table-column field="attribute" :formatter="attributeM" title="处方属性"></vxe-table-column>-->
                        <!--<vxe-table-column field="comefrom" :formatter="comefromM" title="处方来源"></vxe-table-column>-->
                        <!--<vxe-table-column field="doctor" title="医生姓名"></vxe-table-column>-->
                        <!--<vxe-table-column field="deptname" title="门店名称"></vxe-table-column>-->
                        <!--<vxe-table-column field="prescriptiondate" :formatter="formatterDate" title="制单时间"></vxe-table-column>-->
                        <!--&lt;!&ndash;<vxe-table-column title="操作">&ndash;&gt;-->
                            <!--&lt;!&ndash;<template v-slot="{ row }">&ndash;&gt;-->
                                <!--&lt;!&ndash;<template>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<div @click="lookEvent(row)"&ndash;&gt;-->
                                         <!--&lt;!&ndash;style="color: #00ffff;line-height: 30px;cursor: pointer">查看处方&ndash;&gt;-->
                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                    <!--&lt;!&ndash;&lt;!&ndash;                                    <vxe-button  @click="lookEvent(row)">查看处方</vxe-button>&ndash;&gt;&ndash;&gt;-->
                                <!--&lt;!&ndash;</template>&ndash;&gt;-->
                            <!--&lt;!&ndash;</template>&ndash;&gt;-->
                        <!--&lt;!&ndash;</vxe-table-column>&ndash;&gt;-->
                    <!--</vxe-table>-->

                <!--</div>-->
                <!--&lt;!&ndash;<div class="pagination">&ndash;&gt;-->
                    <!--&lt;!&ndash;<vxe-pager&ndash;&gt;-->
                        <!--&lt;!&ndash;perfect&ndash;&gt;-->
                        <!--&lt;!&ndash;:loading="loading"&ndash;&gt;-->
                        <!--&lt;!&ndash;:current-page="tablePage.currentPage"&ndash;&gt;-->
                        <!--&lt;!&ndash;:page-size="tablePage.pageSize"&ndash;&gt;-->
                        <!--&lt;!&ndash;:total="tablePage.totalResult"&ndash;&gt;-->
                        <!--&lt;!&ndash;:layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"&ndash;&gt;-->
                        <!--&lt;!&ndash;@page-change="handlePageChange">&ndash;&gt;-->
                    <!--&lt;!&ndash;</vxe-pager>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
            <!--<div class="right">-->
                <!--<el-image class="img"-->
                    <!--:alt="checkedCities[0]"-->
                    <!--style="width: 100%; height: 100%"-->
                    <!--:src="srcList[0]"-->
                    <!--:preview-src-list="srcList">-->
                <!--</el-image>-->
            <!--</div>-->
        <!--</div>-->

        <!--&lt;!&ndash;更多搜索&ndash;&gt;-->
        <!--<el-dialog :visible.sync="moreVisible" title="查询" width="600px">-->
            <!--<el-form :inline="true" class="left" :model="formInline" label-width="120px">-->
                <!--<el-form-item label="处方类型:">-->
                    <!--<el-checkbox-group v-model="formInline.comboxType">-->
                        <!--<el-checkbox label="1">西药处方</el-checkbox>-->
                        <!--<el-checkbox label="2">中药处方</el-checkbox>-->
                    <!--</el-checkbox-group>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="处方属性:">-->
                    <!--<el-checkbox-group v-model="formInline.comboxAttribute">-->
                        <!--<el-checkbox label="1">普通处方</el-checkbox>-->
                        <!--<el-checkbox label="2">慢病处方</el-checkbox>-->
                        <!--<el-checkbox label="3">特药处方</el-checkbox>-->
                    <!--</el-checkbox-group>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="处方来源:">-->
                    <!--<el-checkbox-group v-model="formInline.comboxComefrom">-->
                        <!--<el-checkbox label="1">拍照处方</el-checkbox>-->
                        <!--<el-checkbox label="2">电子处方</el-checkbox>-->
                    <!--</el-checkbox-group>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="审核状态:">-->
                    <!--<el-checkbox-group v-model="formInline.comboxStatus">-->
                        <!--<el-checkbox label="1">审核通过</el-checkbox>-->
                        <!--<el-checkbox label="2">审核不通过</el-checkbox>-->
                    <!--</el-checkbox-group>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button @click="moreVisible=false">取 消</el-button>-->
                <!--<el-button class="search" @click="search">确 定</el-button>-->
            <!--</span>-->
        <!--</el-dialog>-->
        <div class="recipeManage">
            <div class="recipeTop">
                <li v-for="(item, index) in tabs" :key="index" @click="tabEvent(item, index)">
                    <a href="jsvascript:;" :class="tabsCur==index?'licur':''">{{item.name}}</a>
                </li>
            </div>
            <div class="recipeDoc">
                <div class="recipeDoc_top">
                    <el-form :inline="true" size="small" :model="formInline" label-width="88px" style="float: left">
                        <el-form-item label="患者姓名">
                            <el-input v-model="formInline.patient" placegolder="请输入" style="width: 180px;"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <el-input v-model="formInline.insiderphone" placegolder="请输入" style="width: 180px;"></el-input>
                        </el-form-item>
                        <el-form-item label="门店名称">
                            <el-input v-model="formInline.deptname" placegolder="请输入" style="width: 180px;"></el-input>
                        </el-form-item>
                        <br />
                        <el-form-item label="处方种类">
                            <el-select v-model="formInline.attribute" style="width: 180px;">
                                <el-option label="普通处方" value="1"></el-option>
                                <el-option label="慢病处方" value="2"></el-option>
                                <el-option label="特药处方" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="制单日期">
                            <el-date-picker
                                style="width: 248px"
                                v-model="formInline.prescriptiondate"
                                type="daterange"
                                range-separator="—"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="审核日期" v-if="tabsCur!=0">
                            <el-date-picker
                                style="width: 248px"
                                v-model="formInline.approvaldate"
                                type="daterange"
                                range-separator="—"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>
                        <br />
                        <el-form-item label="处方来源" v-if="tabsCur!=0">
                            <el-select v-model="formInline.comefrom" style="width: 180px;">
                                <el-option v-for="(item, index) in fromArr" :key="index" :label="item.dictDtlName" :value="item.dictValue"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <label style="float: right;margin-right: 24px">
                        <el-button @click="search" style="background: lightseagreen; color: #fff">查询</el-button>
                        <el-button @click="clear">重置</el-button>
                    </label>
                </div>
                <div class="recipeDoc_center" v-if="tabsCur==0">
                    <el-button @click="checkMore" style="background: #36c2aa; color: #fff" size="mini">审核通过</el-button>
                    <el-button @click="checkNo" size="small">审核不通过</el-button>
                </div>
                <div class="recipeDoc_bottom">
                    <div class="recipeDoc_bottom_l">
                        <vxe-table
                            height="403"
                            v-loading="tabLoading"
                            border
                            ref="table"
                            :header-cell-style="headClass"
                            highlight-hover-row
                            highlight-current-row
                            :data="tableData"
                            @current-change="findUrl">
                            <vxe-table-column type="checkbox" width="60"></vxe-table-column>
                            <vxe-table-column type="index" title="序号" width="60"></vxe-table-column>
                            <vxe-table-column field="prescriptiondate" :formatter="formatterDate" title="制单日期"></vxe-table-column>
                            <vxe-table-column field="patient" title="患者姓名"></vxe-table-column>
                            <vxe-table-column field="insiderphone" title="联系方式">
                                <template v-slot="{ row }">
                                    {{row.insiderphone | formatPhone}}
                                </template>
                            </vxe-table-column>
                            <vxe-table-column field="attribute" :formatter="attributeM" title="处方种类"></vxe-table-column>
                            <vxe-table-column field="deptname" title="门店"></vxe-table-column>
<!--                            <vxe-table-column field="medicalinstitution" title="医院" v-if="tabsCur!==0"></vxe-table-column>-->
                            <vxe-table-column field="doctor" title="医生" v-if="tabsCur!==0"></vxe-table-column>
                            <vxe-table-column title="审方视频" v-if="tabsCur!==0">
                                <template v-slot="{ row }">
                                    <el-button :disabled="row.approvalvideourl == '' || row.approvalvideourl == null" @click.stop="lookVedio(row)" type="mini">审方视频</el-button>
                                </template>
                            </vxe-table-column>
                        </vxe-table>
                    </div>
                    <div class="recipeDoc_bottom_r" style="text-align: center">
                        <el-button v-if="source == 2" @click="openNew">查看附件</el-button>
                        <el-image class="img" v-else
                        :alt="checkedCities[0]"
                        style="width: 100%; height: 100%"
                        :src="srcList[0]"
                        :preview-src-list="srcList">
                        </el-image>
                    </div>
                </div>
            </div>
            <div class="recipeDtl" v-if="tabsCur==3">
                <div class="dtlTable">
                    <vxe-table
                        height="330"
                        border
                        ref="childtable"
                        :header-cell-style="headClass"
                        highlight-hover-row
                        highlight-current-row
                        :data="childtableData">
                        <vxe-table-column type="checkbox" width="60"></vxe-table-column>
                        <vxe-table-column type="index" title="序号" width="60"></vxe-table-column>
                        <vxe-table-column field="goodsname" title="通用名"></vxe-table-column>
<!--                        <vxe-table-column field="currencyname" title="商品名"></vxe-table-column>-->
                        <vxe-table-column field="goodstype" title="规格"></vxe-table-column>
                        <vxe-table-column field="factoryname" title="生产厂商"></vxe-table-column>
                        <vxe-table-column field="goodsqty" title="数量"></vxe-table-column>
                        <vxe-table-column field="yfyl" title="用法用量"></vxe-table-column>
                    </vxe-table>
                </div>
            </div>
        </div>
        <!--审核不通过原因-->
        <el-dialog title="审核不通过原因" :visible.sync="checkNopass" width="560px">
            <el-input type="textarea" v-model="nopass" class="textarea" placeholder="请输入"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="checkNopass = false">取 消</el-button>
                <el-button class="search" @click="savePass">确 定</el-button>
            </span>
        </el-dialog>
        <!--视频-->
        <el-dialog title="审方视频" :visible.sync="vedioVisible" :close-on-click-modal="false" :showClose="false">
            <div ref="player" id="play-box">
                <video id="player-container-id" preload="auto" style="width: 100%" height="360" playsinline webkit-playsinline>
                </video>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="vedioClose">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
const cityOptions = [ '慢病处方', '特殊药品处方']
import {mapGetters, mapActions}    from 'vuex'
import XEUtils from 'xe-utils'
export default {
    name: "index",
    data() {
        return {
            info: 0,
            tableData: [],
            checkAll: false,
            checkedCities: [],
            cities: cityOptions,
            srcList: [],
            moreVisible: false,
            formInline: {
                user: '',
                region: '',
                comboxType: [],
                comboxAttribute: [],
                comboxComefrom: [],
                comboxStatus: [],
                approvaldate: null,
                prescriptiondate: null,
                comefrom: ''
            },
            fromArr: [],
            loading: false,
            tablePage: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
            },
            vedioVisible: false,
            player: null,
            placepointInfo: {},

            tabs: [{name: '待审核'}, {name: '审核通过'}, {name: '审核不通过'}, {name: '全部'}],
            tabsCur: 0,
            childtableData: [],
            nopass: '',
            checkNopass: false,
            tabLoading: false,
            noids: [],
            source: 1,
            openurl: []
        }
    },
    computed: {
        toatal: function () {
            return this.tableData.length
        },
        ...mapGetters([
            'appInfo',
            'userInfo',
            'cfList'
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
        videoRequest: function (data) {
            console.log('处方管理页面收到门店请求拒绝该请求');
            this.placepointInfo = data
            this.videoNocall()
        }
    },
    created(){
        this.$store.commit('app/SET_ROUTER', '/home/historyRecipel')
    },
    mounted () {
        this.getList()
    },
    methods: {
        ...mapActions(
            {
                getDeptByKey: 'recipe/getDeptByKey',
                getByKey: 'recipe/getByKey',
                batchApproval: 'recipe/batchApproval',
                finddtl: 'recipe/finddtl'
            }
        ),
        openNew () {
            window.open(
                this.openurl[0],
                "_blank",
                "width=375px,height=667px,top=100px,left=0px"
            )
        },
        getNum () {
            this.$store.dispatch('user/batchGetDictList', {
                companyId: this.userInfo.companyid,
                data: ['PRESCRIPTION_COMEFROM']
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    this.fromArr = res.data.PRESCRIPTION_COMEFROM
                }
            })
        },
        lookVedio (row) {
            this.vedioVisible = true
            console.log(row);
            console.log(row.approvalvideourl);
            console.log(row.appid);
            this.$nextTick(()=>{
                this.player = TCPlayer('player-container-id', {
                    fileID: row.approvalvideourl,
                    appID: row.appid,
                    plugins: {
                        ProgressMarker: true
                    }
                });
            })
        },
        vedioClose () {
            this.player.dispose()
            let player = this.$refs.player
            let newView = document.createElement('video')
            newView.style.width = '100%'
            newView.setAttribute('height', '360')
            newView.setAttribute('playsinline', 'true')
            newView.setAttribute('webkit-playsinline', 'true')
            newView.setAttribute('id', 'player-container-id')
            player.appendChild(newView)
            this.vedioVisible = false
        },
        videoNocall () {
            this.$socket.emit('videoRequestBack', JSON.stringify({
                type: 2,
                companyid: this.userInfo.companyid,
                mduserid: this.placepointInfo.mduserid,
                userid: this.userInfo.userid
            }))
        },
        async querySearchName(queryString, cb) {
            const yfyl = await this.getByKey(
                {
                    key: queryString,
                    companyid: this.userInfo.companyid
                }
            )
            var d = yfyl.map(( item => {
                return {
                    value: item.pharmacistname
                }
            } ))
            cb(d);
        },
        async querySearchStore(queryString, cb) {
            const yfyl = await this.getDeptByKey(
                {
                    deptkey: queryString,
                    companyid: this.userInfo.companyid
                }
            )
            var d = yfyl.map(( item => {
                return {
                    value: item.deptname
                }
            } ))
            cb(d);
        },
        moreSearch(){
            this.moreVisible = true
        },
        checkNo () {
            let rows = this.$refs.table.selection;
            if (rows.length) {
                this.noids = [];
                rows.forEach(e=>{
                    this.noids.push(e.prescriptionid)
                });
                this.checkNopass = true

            } else {
                this.$message.warning('请至少选择一条数据');
            }
        },
        savePass () {
            this.batchApproval({
                companyId: this.userInfo.companyid,
                data: {
                    approvalstatus: 2,
                    pharmacistid: this.userInfo.pharmacistid,
                    pharmacistname: this.userInfo.username,
                    prescriptionids: this.noids,
                    reason: this.nopass
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$message.success('审核不通过成功');
                    this.getList()
                    this.checkNopass = false
                } else {
                    this.$message.error('审核不通过失败');
                }
            }).catch(err => {
                this.$message.error('审核不通过异常');
                console.log(err);
            })
        },
        // 批量审批
        checkMore () {
            let rows = this.$refs.table.selection;
            if (rows.length) {
                let ids = [];
                rows.forEach(e=>{
                    ids.push(e.prescriptionid)
                });
                this.batchApproval({
                    companyId: this.userInfo.companyid,
                    data: {
                        approvalstatus: 1,
                        pharmacistid: this.userInfo.pharmacistid,
                        pharmacistname: this.userInfo.username,
                        prescriptionids: ids
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('批量审核成功');
                        this.getList()
                    } else {
                        this.$message.error('批量审核失败');
                    }
                }).catch(err => {
                    this.$message.error('批量审核异常');
                    console.log(err);
                })
            } else {
                this.$message.warning('请至少选择一条数据');
            }
        },
        handlePageChange ({currentPage, pageSize}) {
            this.tablePage.currentPage = currentPage
            this.tablePage.pageSize = pageSize
            this.getList()
        },
        getList () {
            this.tabLoading = true
            let beforapprovaldate = null
            let endapprovaldate = null
            let beforprescriptiondate = null
            let endprescriptiondate = null
            let status = ''
            if (this.formInline.approvaldate != null) {
                beforapprovaldate = this.formInline.approvaldate[0]
                endapprovaldate = this.formInline.approvaldate[1]
            }
            if (this.formInline.prescriptiondate != null) {
                beforprescriptiondate = this.formInline.prescriptiondate[0]
                endprescriptiondate = this.formInline.prescriptiondate[1]
            }
            this.tabsCur === 3?status='':status=this.tabsCur

            let needParams = {
                patient: this.formInline.patient,
                attribute: this.formInline.attribute,
                deptname: this.formInline.deptname,
                insiderphone: this.formInline.insiderphone,
                beginprescriptiondate: beforprescriptiondate,
                endprescriptiondate: endprescriptiondate,
                companyid: this.userInfo.companyid,
                beginapprovaldate: beforapprovaldate,
                endapprovaldate: endapprovaldate,
                approvalstatus: status,
                pharmacistid: this.userInfo.pharmacistid,
                comefrom: this.formInline.comefrom
                // pageIndex: this.tablePage.currentPage,
                // pageSize: this.tablePage.pageSize
            }
            if (this.tabsCur == 0) {
                needParams.approvalMode = 2
            }
            this.loading = true
            this.$store.dispatch('user/sxfinddoc', needParams).then(() => {
                this.loading = false
                this.tableData = this.cfList.list
                this.tabLoading = false
                this.getNum()
            }).catch(err => {
                console.log(err);
                this.tabLoading = false
                return false
            })
        },
        findUrl({row}){
            if (row.source == 2) {
                this.source = 2
                this.openurl = row.imageurl
            } else {
                this.source = 1
                if (row.imageurl !== undefined && row.imageurl != '') {
                    this.srcList = row.imageurl
                } else {
                    this.srcList = []
                }
            }

            if (this.tabsCur == 3){
                if (row.prescriptionid) {
                    let parms = {
                        prescriptionid: row.prescriptionid,
                        pageIndex: 1,
                        pageSize: 100
                    }
                    this.childtableData = []
                    this.findChildList(parms)
                }
            }
        },
        findChildList (parms) {
            this.finddtl(parms).then(res => {
                if (res.status === 200) {
                    this.childtableData = res.data.list
                }
            }).catch(err => {
                console.log(err);
            })
        },
        headClass({row, column, rowIndex, columnIndex}) {
            return 'background:#EAEAEA;height:54px'
        },
        formatterDate({row, column, cellValue, index}) {
            return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
        },
        search() {
            this.moreVisible = false
            // this.$refs.tableData.recalculate()
            this.getList()
            this.childtableData = []
        },
        clear (){
            this.formInline = {}
        },
        onSubmit() {
            console.log('submit!')
        },
        approvalstatusM({cellValue}) {
            if (cellValue == 1) {
                return '审批通过'
            } else {
                return '审批不通过'
            }
        },
        comefromM({cellValue}){
            if (cellValue == 1) {
                return '拍照处方'
            } else if (cellValue == 2) {
                return '电子处方'
            }
        },
        attributeM({cellValue}) {
            if (cellValue == 1) {
                return '普通处方'
            } else if (cellValue == 2){
                return '慢病处方'
            } else if (cellValue == 3) {
                return '特药处方'
            }
        },
        tabEvent (item, index) {
            this.tabsCur = index
            this.getList()
        }
    }
}
</script>
<style>
    .img /deep/ .el-image-viewer__close{
        color: #f00!important;
    }
    .login-main{
        padding: 0!important;
    }
    .textarea .el-textarea__inner{
        height: 160px!important;
        resize: none!important;
    }
</style>
<style scoped lang="scss">
    .historyRecipel {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        /* 新页面 */
        .recipeManage{
            .recipeTop{
                height: 54px;
                line-height: 54px;
                width: 100%;
                background: #fff;
                border-top: solid 1px #efefef;
                text-indent: 48px;
                li{
                    float: left;
                    padding-left: 16px;
                    padding-right: 16px;
                    a{
                        color: #666;
                        display: inline;
                        font-size: 16px;
                        text-decoration: none;
                        padding-bottom: 18px;
                    }
                }
                .licur{
                    color: #36c2aa;
                    border-bottom: solid 3px #36c2aa;
                }
            }
            .recipeDoc{
                height: 593px;
                width: calc(100% - 160px);
                margin-left: 80px;
                background: #fff;
                margin-top: 16px;
                margin-bottom: 16px;
                .recipeDoc_top{
                    height: 126px;
                    padding-top: 24px;
                }
                .recipeDoc_center{
                    margin-left: 24px;
                    margin-bottom: 12px;
                }
                .recipeDoc_bottom{
                    margin-left: 24px;
                    margin-right: 24px;
                    .recipeDoc_bottom_l{
                        float: left;
                        width: calc(100% - 24px - 276px);
                        height: calc(553px - 126px - 24px);
                        background: #36c2aa;
                    }
                    .recipeDoc_bottom_r{
                        float: right;
                        width: 274px;
                        height: calc(553px - 126px - 24px);
                        border:1px solid #E6E6E6;
                        background: #FAFAFA!important;
                        background: url("../../assets/img/video_default.png") no-repeat;
                        background-size: 64px 64px;
                        background-position:center;
                    }
                }
            }
            .recipeDtl{
                margin-bottom: 16px;
                height: 378px;
                margin-left: 80px;
                width: calc(100% - 160px);
                background: #fff;
                .dtlTable{
                    padding-top: 24px;
                    margin: 0 24px;
                }
            }
        }
        /* end */
        .form-serch {
            height: 145px;
            display: flex;
            /*flex-wrap: wrap;*/
            justify-content: space-between;
            align-items: center;
            border: 1px solid #c9c9c9;
            padding: 10px;
            box-sizing: border-box;
            margin-bottom: 10px;

            .search {
                color: #FFF;
                background-color: $color-btn;
                border-color: $color-btn;
            }

            .left {

            }

            .right {

                .buttons{
                    width: 220px;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
        .table {
            flex: 1;
            display: flex;
            flex-direction: row;


            .left {
                width: 80%;
                padding: 5px;
                box-sizing: border-box;
            }

            .right {
                width: 20%;
            }
        }
    }
</style>
