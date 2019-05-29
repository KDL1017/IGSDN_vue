<template>
    <div>
        <div style="position: absolute; left: 50%;top: 50%" v-loading="isLoadingDocumentDetails"></div>
        <transition name="el-zoom-in-center">
            <el-card v-show="isShow" class="card">
                <div slot="header" class="clearfix" style="text-align: center">
                    <div style="float:left; font-size: 14px; cursor: pointer" @click="goBack">
                        <i class="el-icon-arrow-left"></i>&nbsp;返回上级
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
                                <el-tag type="success" style="margin-right: 14px" v-if="document.key1">{{document.key1}}
                                </el-tag>
                                <el-tag type="warning" style="margin-right: 14px" v-if="document.key2">{{document.key2}}
                                </el-tag>
                                <el-tag type="danger" v-if="document.key3">{{document.key3}}</el-tag>
                            </td>
                        </tr>

                    </table>
                    <OnlinePreviewButton :isPrivate="isPrivate" :documentId="document.id"
                                         :formatName="document.formatName"></OnlinePreviewButton>
                </div>
            </el-card>
        </transition>
    </div>
</template>
<script>
    import 'element-ui/lib/theme-chalk/base.css'
    import OnlinePreviewButton from './OnlinePreviewButton'
    import axios from 'axios'

    export default {
        components: {
            OnlinePreviewButton
        },
        data() {
            return {
                isPrivate: false,
                isShow: false,
                isLoadingDocumentDetails: true,
                isShowAllIntro: false,
                introFlag: true,
                document: {},
                documentInit: {
                    id: 1,
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
                    uploaderName: '',
                    intro: '',
                    downloadNum: 0
                }
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            getDocumentDetails() {
                this.isLoadingDocumentDetails = true
                axios.get('/IGSDN/getDocumentDetails/' + this.document.id).then((res) => {
                    this.isShow = true
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
            },
        },
        created() {
            this.isShow = false
            this.document = this.documentInit
            this.document.id = this.$route.params.documentId
            this.isPrivate = this.$route.params.isPrivate
            this.getDocumentDetails()
        },
        watch: {
            $route() {
                this.isShow = false
                this.document = this.documentInit
                this.document.id = this.$route.params.documentId
                this.isPrivate = this.$route.params.isPrivate
                this.getDocumentDetails()
            },
        },
        computed: {
            simpleIntro() {
                if (this.isShowAllIntro)
                    return this.document.intro
                let intro = this.document.intro
                this.introFlag = intro.length > 160
                intro = this.introFlag ? intro.substring(0, 160) + "..." : intro
                return intro
            }
            ,
            showMore() {
                if (this.isShowAllIntro)
                    return "关闭"
                else
                    return "展开"
            },
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
        min-height: 380px;
        width: 700px;
        margin: 20px auto;
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
</style>
