<template>
    <div>
        <div style="position: absolute; left: 50%;top: 50%" v-loading="isLoadingDocumentDetails"></div>
        <transition name="el-zoom-in-center" mode="out-in">
            <el-card v-if="!isLoadingDocumentDetails&&isShowDocumentDetails" key="showDocumentDetails" class="card">
                <div slot="header" class="clearfix" style="text-align: center">
                    <div class="handle" style="float:left;" @click="goBack">
                        <i class="el-icon-arrow-left"></i>&nbsp;返回上级
                    </div>
                    <div class="handle" style="float:right;" @click="handleDetailsOrComments">
                        查看评论<i class="el-icon-arrow-right"></i>&nbsp;
                    </div>
                    <span>{{document.name}}</span>
                </div>
                <div class="img">
                    <img :src="document.icon" style=""/>
                </div>
                <div class="content">
                    <div class="intro">
                        <span style="font-size: 22px;font-weight: bold">简介: </span>
                        <span class="meta" v-html="simpleIntro"></span>
                        <span class="more" @click="isShowAllIntro=!isShowAllIntro"
                              v-if="introFlag">{{this.showMore}}</span>
                    </div>
                    <table class="meta">
                        <tr>
                            <td class="left">文件类型：
                            </td>
                            <td style="width: auto">{{document.formatName}}</td>
                        </tr>
                        <tr>
                            <td class="left">文件大小：
                            </td>
                            <td style="width: auto">{{document.size}}</td>
                        </tr>
                        <tr>
                            <td class="left">上传者：
                            </td>
                            <td style="width: auto">{{ document.uploaderName }}</td>
                        </tr>

                        <tr>
                            <td class="left">上传时间：
                            </td>
                            <td style="width: auto">{{document.uploadTime}}</td>
                        </tr>
                        <tr>
                            <td class="left">最后更新时间：
                            </td>
                            <td style="width: auto">{{document.lastUpdateTime}}</td>
                        </tr>
                        <tr>
                            <td class="left">下载量：
                            </td>
                            <td style="width: auto">{{document.downloadNum}}</td>
                        </tr>
                        <tr style="height: 40px">
                            <td colspan="2" class="left" style="width: auto">
                                <el-tag type="success" style="margin-right: 14px" v-if="document.key1">
                                    {{document.key1}}
                                </el-tag>
                                <el-tag type="warning" style="margin-right: 14px" v-if="document.key2">
                                    {{document.key2}}
                                </el-tag>
                                <el-tag type="danger" v-if="document.key3">{{document.key3}}</el-tag>
                            </td>
                        </tr>

                    </table>
                    <OnlinePreviewButton :isPrivate="isPrivate" :documentId="document.id"
                                         :formatName="document.formatName"></OnlinePreviewButton>
                </div>

            </el-card>
            <!--            <DocumentComments v-if="!isLoadingDocumentDetails&&!isShowDocumentDetails">-->

            <!--            </DocumentComments>-->
            <el-card class="card" v-if="!isLoadingDocumentDetails&&!isShowDocumentDetails" key="showDocumentComments">
                <div slot="header" class="clearfix" style="text-align: center">
                    <div class="handle" style="float:left;" @click="handleDetailsOrComments">
                        <i class="el-icon-arrow-left">查看文件</i>&nbsp;
                    </div>
                    <span>文件评论</span>
                </div>
                <div style="text-align: center;margin: 50px;color:#909399;"
                     v-if="!firstLevel || firstLevel.length==0">
                    该文件暂无评论
                </div>
                <div v-else>
                    <div v-for="(item,index)  in firstLevel"
                         style="border-bottom: 1px dashed #e0e0e0;padding: 5px 5px 5px 0">
                        <DocumentCommentsItem :item="item" :documentId="document.id" :userId="userId"
                                              :isFirstLevel="true" @openMsg="receiveOpenMsg"
                                              :index="index"></DocumentCommentsItem>
                        <DocumentCommentsTree v-show="item.data.levelShow"
                                              :comments="item.children"
                                              :documentId="document.id"
                                              :userId="userId"></DocumentCommentsTree>
                    </div>
                    <div style="margin: 10px 0" v-show="documentComment.total > pageSize">
                        <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page.sync="documentComment.currentPage"
                                :page-size="pageSize"
                                layout="total, prev, pager, next"
                                :total="documentComment.total">
                        </el-pagination>
                    </div>
                </div>
                <div style="float: bottom;margin-top: 36px">
                    <el-input
                            placeholder="不大于50个字符！"
                            maxlength="50"
                            @keyup.enter.native="listenReplayDocument($event)"
                            v-model="remark_document" style="margin: 5px 0">
                    </el-input>
                    <el-checkbox v-model="isIdentify" style="margin: 5px 0">匿名</el-checkbox>
                    <el-button type="primary" @click="replayDocument" style="float: right; margin: 5px 0">发布评论
                    </el-button>
                </div>
            </el-card>
        </transition>
    </div>
</template>
<script>
    import 'element-ui/lib/theme-chalk/base.css'
    import OnlinePreviewButton from './OnlinePreviewButton'

    import DocumentCommentsTree from './DocumentCommentsTree'
    import DocumentCommentsItem from './DocumentCommentsItem'
    import axios from 'axios'
    import moment from 'moment'
    import PubSub from 'pubsub-js'

    export default {
        components: {
            OnlinePreviewButton,
            DocumentCommentsTree,
            DocumentCommentsItem
        },
        data() {
            return {
                isPrivate: false,
                isShowDocumentDetails: true,
                isLoadingDocumentDetails: true,
                isShowAllIntro: false,
                introFlag: true,
                document: {},
                documentInit: {
                    id: 0,
                    name: '',
                    size: '',
                    uploadTime: '',
                    lastUpdateTime: '',
                    icon: '',
                    key1: '',
                    key2: '',
                    key3: '',
                    formatId: 0,
                    formatName: '',
                    uploaderId: 0,
                    uploaderName: '',
                    intro: '',
                    downloadNum: 0
                },
                remark_document: '',
                isIdentify: false,
                userId: 0,
                message: '',
                ///totalNum:9,
                pageSize: 10,
                isShow: false,
                activeName: '1',
                firstLevel: [],
                documentComment: {},
                isShowInput: false,
                isShowOperation: false,
                promptFlag: false
            }
        },
        mounted() {
            this.isShowDocumentDetails = true
            this.document = this.documentInit
            this.document.id = this.$route.params.documentId
            this.isPrivate = this.$route.params.isPrivate
            this.userId = JSON.parse(localStorage.getItem("user_msg")).id
            this.selectDocumentCommentByPageNum(1)
            this.getDocumentDetails()
            PubSub.subscribe('isCommentSuccess', (context, data) => {
                console.log(data)
                if (data) {
                    let pageNum = this.documentComment.currentPage
                    pageNum = pageNum ? pageNum : 1
                    this.selectDocumentCommentByPageNum(pageNum)
                }
            })
        }
        ,
        watch: {
            $route() {
                this.isShowDocumentDetails = true
                this.document = this.documentInit
                this.document.id = this.$route.params.documentId
                this.isPrivate = this.$route.params.isPrivate
                this.getDocumentDetails()
                this.selectDocumentCommentByPageNum(1)
            }
            ,
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            getDocumentDetails() {
                const documentId = this.document.id
                if (documentId && documentId != 0) {
                    this.isLoadingDocumentDetails = true
                    axios.get('/IGSDN/getDocumentDetails/' + documentId).then((res) => {
                        this.isShowDocumentDetails = true
                        this.document = res.data
                        if (this.document.icon)
                            this.document.icon = "data:image/jpg;base64," + this.document.icon
                        else
                            this.document.icon = localStorage.getItem("icon-" + this.document.formatId)
                        this.isLoadingDocumentDetails = false
                    }).catch((err) => {
                        this.isLoadingDocumentDetails = false
                        console.log(err)
                    })
                }
            },
            handleDetailsOrComments() {
                this.isShowDocumentDetails = !this.isShowDocumentDetails
            },

            handleCurrentChange(val) {
                this.selectDocumentCommentByPageNum(val)
            },
            selectDocumentCommentByPageNum(value) {
                let documentId = this.document.id
                const {userId, pageSize} = this
                if (documentId && documentId != 0) {
                    // let userId = this.userId
                    let pageNum = value
                    axios.post('/IGSDN/listDocumentComments', {userId, documentId, pageNum, pageSize}).then((res) => {
                        this.documentComment = res.data
                        this.firstLevel = this.documentComment.data
                    }).catch((err) => {
                    })
                }
            },

            listenReplayDocument(event) {
                this.replayDocument()
                event.preventDefault() // 阻止浏览器默认换行操作
                return false
            },
            replayDocument() {
                if (!this.promptFlag) {
                    this.promptFlag = true
                    this.$confirm('确认发布评论？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        const uploaderId = this.document.uploaderId
                        if (uploaderId != this.userId) {
                            // if (true) {
                            let documentComment = {};
                            documentComment.document = this.document.id
                            documentComment.content = this.remark_document
                            // documentComment.content = this.content
                            documentComment.commentator = this.userId
                            documentComment.remarkDate = moment().utc().format('YYYY-MM-DD')
                            documentComment.isIdentify = this.isIdentify
                            documentComment.id = null

                            axios.post("/IGSDN/remarkDocument", {'document': JSON.stringify(documentComment)}).then((res) => {
                                if (res.data) {
                                    this.remark_document = ""
                                    this.promptFlag = false
                                    let pageNum = this.documentComment.currentPage
                                    if (this.firstLevel.length == this.pageSize) {
                                        pageNum++
                                    }
                                    this.selectDocumentCommentByPageNum(pageNum)
                                    this.$message({
                                        message: '评论成功',
                                        type: 'success'
                                    });

                                } else {
                                    this.promptFlag = false
                                    this.$message({
                                        message: '评论失败',
                                        type: 'error'
                                    });
                                }
                            }).catch(e => {

                            })
                        } else {
                            this.$message({
                                message: '抱歉，这是你自己发布的文件',
                                type: 'error'
                            });
                        }

                    }).catch(() => {
                    });
                }
            },
            receiveOpenMsg(data) {
                let index = data[0]
                let isOpen = data[1]
                this.firstLevel[index].data.levelShow = isOpen
            }
        }
        ,
        computed: {
            simpleIntro() {
                if (this.isShowAllIntro)
                    return this.document.intro
                let intro = this.document.intro
                if (intro) {
                    this.introFlag = intro.length > 160
                    intro = this.introFlag ? intro.substring(0, 160) + "..." : intro
                }
                return intro
            }
            ,
            showMore() {
                if (this.isShowAllIntro)
                    return "关闭"
                else
                    return "展开"
            }
            ,
        }
    }
</script>
<style scoped>
    .img {

    }

    .img img {
        width: 150px;
        float: left;
    }

    .content {
        float: left;
        overflow: hidden;
        width: 420px;
        margin: 0 10px;
    }

    .clearfix:before, .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .card {
        width: 700px;
        margin: 20px auto 0 auto;
        padding: 10px
    }

    .intro {
        margin-bottom: 10px;
    }

    .meta {
        font-size: 14px;
        color: #606266;
        margin-bottom: 10px;
    }

    .meta tr {
        height: 26px;
    }

    .meta .left {
        font-weight: bold;
        width: 120px;
    }

    .more {
        font-size: 14px;
        color: #909399;
        cursor: pointer;
    }

    .more:hover {
        color: #E6A23C;
        text-decoration: underline;
    }

    .handle {
        font-size: 14px;
        cursor: pointer
    }

    a {
        font-size: 12px;
        color: #409EFF;
    }

    a:hover {
        color: #79a5e5;
    }

    .item {
        height: 20px;
        margin: 5px 5px 5px 0;
    }

    .item span {
        margin: 5px 5px 5px 0;
    }
</style>
