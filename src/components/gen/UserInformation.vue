<template>
    <div style="margin:50px 50px">
        <el-card class="box-card">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                     active-text-color="#606266">
                <el-submenu index="1">
                    <template slot="title">未读</template>
                    <el-menu-item index="1-1">系统通知</el-menu-item>
                    <el-menu-item index="1-2">评论</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">已读</template>
                    <el-menu-item index="2-1">系 统通知</el-menu-item>
                    <el-menu-item index="2-2">评论</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">垃圾箱</template>
                    <el-menu-item index="3-1">系统通知</el-menu-item>
                    <el-menu-item index="3-2">评论</el-menu-item>
                </el-submenu>
            </el-menu>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            label="日期"
                            width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.remark_date }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="姓名"
                            width="180">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>姓名: {{ scope.row.content }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.commentatorName }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="文件"
                            width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-tickets"></i>
                            <span style="margin-left: 10px">{{ scope.row.documentName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">回复
                            </el-button>
                            <el-button
                                    size="mini"
                                    @click="handleHistory(scope.$index, scope.row)">对话记录
                            </el-button>
                            <el-button v-show="!(showDel==='3-1'||showDel==='3-2')"
                                       size="mini"
                                       type="danger"
                                       @click="handleRemove(scope.$index, scope.row)">删除
                            </el-button>
                            <el-button v-show="showDel==='3-1'||showDel==='3-2'"
                                       size="mini"
                                       type="danger"
                                       @click="handleDelete(scope.$index, scope.row)">彻底删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-card>

        <el-dialog :visible.sync="dialogHistory">
            <div class="block">
                <el-card style="margin-bottom: 20px">
                    <div slot="header" class="clearfix">
                        <span>对话历史</span>
                    </div>
                    <el-timeline>
                        <el-timeline-item v-for="(dc,index) in documentCommnent" :key="index" :timestamp="dc.remarkDate"
                                          placement="top">
                            <div style="margin-left: 40px">
                                <p style="font-size: 16px;margin-left: 5px;margin-bottom: 5px;float: left">
                                    {{dc.commentatorName}}</p>
                                <div class="l-info">
                                    <div class="l-nav l-nav-border"></div>
                                    <div class="l-nav l-nav-background"></div>
                                    {{dc.content}}
                                </div>
                            </div>
                        </el-timeline-item>
                        <el-timeline-item v-for="(d,index) in documentCommnent2" :timestamp="d.remarkDate"
                                          placement="top">
                            <div style="margin-left: 40px">
                                <p style="font-size: 16px;margin-left: 5px;margin-bottom: 5px;float: left">
                                    {{d.commentatorName}}</p>
                                <div class="l-info">
                                    <div class="l-nav l-nav-border"></div>
                                    <div class="l-nav l-nav-background"></div>
                                    {{d.content}}
                                </div>
                            </div>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </div>

        </el-dialog>
        <el-dialog :visible.sync="dialogFormVisible">
            <div>
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>回复</span>
                    </div>
                    <div style="margin: 2px 0">
                        <el-checkbox v-model="value2" style="margin: 5px 0">匿名</el-checkbox>
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="必须少于50个字符！"
                                v-model="remark_content" style="margin: 5px 0">
                        </el-input>
                    </div>
                </el-card>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
                <el-button type="primary" @click="dialogSubmit" :disabled="showButton">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import moment from 'moment'

    axios.defaults.baseURL = "http://localhost:8080/"
    export default {
        mounted() {
            this.handleSelect('1-1', null)
            //获取登录者的 ID
            let ID = 1
            this.ID = ID
            axios.get('/IGSDN/genUser/userInformation/' + ID).then((res) => {
                this.data = res.data
            }).catch((error) => {
                console.log(error)
            })
        },
        data() {
            return {
                dialogFormVisible: false,
                dialogHistory: false,


                documentID: '',
                dc_id:'',
                userID: '',
                ID: '',


                index: '',
                value2: false,
                showSubmitButton: 'true',
                //回复内容
                remark_content: '',
                showDel: "",
                activeIndex: '1-1',
                data:// 0-未读  1-已读  2-垃圾箱
                    [{
                        content: "翠花我爱你",
                        documentName: "111",
                        id: '',//信息通知ID
                        is_dentify: '',
                        remark_date: "",
                        source: '1',//0:系统消息 1:用户消息(首次) 2:用户消息(非首次)
                        state: '1',//0:垃圾箱 1:未读 2:已读 3:已回复
                        dc_id:'',
                        documentID: '',
                        userID: ''
                    },],
                tableData: [],
                documentCommnent: [{

                    commentator: '',
                    content: "",
                    document: '',
                    id: '',
                    identify: '',
                    remarkDate: '',
                    commentatorName: '',
                    documentName: ''
                }],
                documentCommnent2: [{

                    commentId: '',
                    commentator: '',
                    content: "",
                    document: '',
                    id: '',
                    identify: '',
                    second: '',
                    remarkDate: '',
                    commentatorName: '',
                    documentName: ''
                }],

                formLabelWidth: '120px'
            }
        }, computed: {
            show: function () {
                let showDel = this.showDel.splice('-')
                if (showDel[0] === 3)
                    return true
            },
            reverseSum: function () {
                return this.documentCommnent2.reverse();
            },
            showButton() {
                return (this.remark_content.trim().length < 50 && this.remark_content.trim().length > 0) ? this.showSubmitButton = false : this.showSubmitButton = true
            },


        },
        methods: {
            handleSelect(key, keyPath) {
                this.showDel = key
                let s = key.toString()
                let a = s.split("-")
                switch (a[0]) {
                    case '1':
                        a.shift()
                        if (a[0] === '1') {
                            this.tableData = this.data.filter(item => item.source === "0" && item.state === 1)
                        } else if (a[0] === '2') {//其他用户
                            this.tableData = this.data.filter(item => item.source !== "0" && item.state === 1)
                        }
                        break;
                    case '2':
                        a.shift()
                        if (a[0] === '1') {
                            this.tableData = this.data.filter(item => item.source === "0" && (item.state === 2 || item.state === 3))
                        } else if (a[0] === '2') {
                            this.tableData = this.data.filter(item => item.source !== "0" && (item.state === 2 || item.state === 3))
                        }
                        break;
                    case '3':
                        a.shift()
                        if (a[0] === '1') {
                            this.tableData = this.data.filter(item => item.source === "0" && item.state === 0)
                        } else if (a[0] === '2') {
                            this.tableData = this.data.filter(item => item.source !== "0" && item.state === 0)
                        }
                        break;
                }
            },
            handleHistory(index, row) {
                this.dialogHistory = true

                axios.get('/IGSDN/genUser/showRemark/' + row.id).then((res) => {
                    let document = res.data
                    let documentCommnent = document['list1']
                    let documentCommnent2 = document['list2']
                    let i = 0;

                    for (; i < documentCommnent.length; i++) {
                        if (documentCommnent[i].identify) {
                            documentCommnent[i].commentatorName = '匿名'
                        }
                    }

                    for (i = 0; i < documentCommnent2.length; i++) {
                        if (documentCommnent2[i].commentator === this.ID) {
                            documentCommnent2[i].commentatorName = '您'
                        } else if (documentCommnent2[i].identify && documentCommnent2[i].commentator !== this.ID) {
                            documentCommnent2[i].commentatorName = '匿名'
                        }
                    }
                    this.documentCommnent2 = documentCommnent2.sort(function (a, b) {
                        return (a['id'] < b['id']) ? -1 : ((a['id'] > b['id']) ? 1 : 0)
                    })
                    this.documentCommnent = documentCommnent
                }).catch((error) => {
                    console.log(error)
                })

            },
            handleRemove(index, row) {
                let userInformationID = row.id
                let state = 0
                axios.put('/IGSDN/genUser/userInformationRemove/', {userInformationID, state}).then((res) => {
                    if (res.data)
                        alert('修改成功')
                    else
                        alert('修改shibai')
                }).catch((error) => {
                    console.log(error)
                })
                if (this.tableData[index].state === 1 || this.tableData[index].state === 2 || this.tableData[index].state === 3) {
                    this.tableData[index].state = 0
                    this.tableData.splice(index, 1)
                }
            },
            handleEdit(index, row) {
                this.remark_content = ''
                this.thisRowID = row.dc_id
                this.thisRowType = row.source
                this.documentID = row.documentID

                this.userID = row.userID

                this.dialogFormVisible = true
                this.index = index


            },
            handleDelete(index, row) {
                let id = row.id
                axios.delete('/IGSDN/genUser/userInformationDelete/' + id).then((res) => {
                    if (res.data)
                        return '删除成功'
                    else
                        return '未删除'
                }).catch((error) => {
                    console.log(error)
                })
                this.tableData.splice(this.index, 1)
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
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            dialogSubmit() {//回复

                if (this.tableData[this.index].state === 1 || this.tableData[this.index].state === 2) {
                    this.tableData[this.index].state === 3
                    let state = this.tableData[this.index].state
                    let userInformationID = this.tableData[this.index].id
                    axios.put('/IGSDN/genUser/userInformationRemove/', {userInformationID, state}).then((res) => {
                        if (res.data)
                        {this.tableData.splice(this.index, 1)
                            return '修改成功'}
                        else
                            return '未修改'
                    }).catch((error) => {
                        console.log(error)
                    })
                }

                let documentComment2 = {};
                let receive;
                receive = this.userID

                if (this.thisRowType === 1) {
                    documentComment2.isSecond = true
                } else if (this.thisRowType === 2) {
                    documentComment2.isSecond = false
                }
                documentComment2.document = this.documentID
                documentComment2.commentId = this.thisRowID
                documentComment2.content = this.remark_content
                documentComment2.commentator = this.ID
                documentComment2.remarkDate = moment().utc().format('YYYY-MM-DD')
                documentComment2.isIdentify = this.value2
                console.log(this.documentCommnent2)
                documentComment2.id = null

                axios.post('/IGSDN/genUser/userInformationRemark/', {
                    'documentComment2String': JSON.stringify(documentComment2),
                    'receive':receive
                }).then((res) => {
                    if (res.data)
                    {this.dialogFormVisible = false
                        alert('评论成功')}
                    else
                        alert('评论失败')
                }).catch((error) => {
                    console.log(error)
                })


                this.dialogFormVisible = false
            },
            dialogCancel() {
                if (this.tableData[this.index].state === 1) {
                    this.tableData[this.index].state = 2
                    let state = this.tableData[this.index].state
                    let userInformationID = this.tableData[this.index].id
                    alert(userInformationID + "==" + state)
                    axios.put('/IGSDN/genUser/userInformationRemove/', {userInformationID, state}).then((res) => {
                        if (res.data)
                            return '修改成功'
                        else
                            return '未修改'
                    }).catch((error) => {

                        console.log(error)
                    })
                    this.tableData.splice(this.index, 1)
                }
                this.dialogFormVisible = false
            }

        }
    }
</script>

<style scoped>
    .l-nav {
        position: absolute;
        overflow: hidden;
        top: 5px;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid dashed dashed dashed;
    }

    .l-info {
        margin: 10px 50px;
        padding: 5px 15px 5px 15px;
        position: relative;
        line-height: 30px;
        max-width: 400px;
        height: auto;
        background: #EBEEF5;
        box-shadow: 1px 2px 3px #EBEEF5;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
    }

    .l-nav-border {
        left: -19px;
        border-color: transparent #DCDFE6 transparent transparent;
    }

    .l-nav-background {
        left: -18px;
        border-color: transparent #EBEEF5 transparent transparent;
    }

</style>