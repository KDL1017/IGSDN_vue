<template>
    <div style="cursor:pointer">
        <div style="margin-bottom:5px;">
            <div class="img">
                <img :src="icon?icon:''">
            </div>
            <div style="width: auto; float: left;">
                <div class="title">
                    <a @click="openDocumentDetails" v-html="document.name"></a>
                </div>
                <div style="float:right;" v-if="isPrivate">
                    <el-button size="mini" plain>编辑</el-button>
                    <el-button size="mini" type="danger" plain @click="deleteItem">删除</el-button>
                </div>
                <div class="intro"
                     v-html="document.intro">
                </div>
                <div class="information">
                    上传者：{{ document.uploaderName }}&nbsp;|&nbsp;文件大小：{{document.size}}&nbsp;|&nbsp;上传时间：{{document.uploadTime}}&nbsp;|&nbsp;最近修改时间：{{document.lastUpdateTime}}&nbsp;|&nbsp;下载量：{{document.downloadNum}}
                </div>
            </div>

        </div>
        <hr style="background-color: #DCDFE6; border: none;height: 1px;"/>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        props: ['document', 'isPrivate'],
        data() {
            return {
                icon: '',
            }
        },
        created() {
            const i = localStorage.getItem("icon-" + this.document.icon)
            if (i) {
                this.icon = i
            } else {
                axios.get('/IGSDN/getDocumentFormatIcon/' + this.document.icon).then((res) => {
                    this.icon = "data:image/jpg;base64," + res.data
                    localStorage.setItem("icon-" + this.document.icon, this.icon)
                }).catch((err) => {

                })
            }
        },
        methods: {
            openDocumentDetails() {
                this.$router.push({
                    name: 'documentDetails',
                    params: {
                        documentId: this.document.id,
                        isPrivate: this.isPrivate,
                    },
                })
            },
            deleteItem() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const documentId = this.document.id
                    axios.delete('/IGSDN/deleteDocument/' + documentId).then((res) => {
                        if (res.data) {
                            // 告诉父组件删除成功，重新请求页面信息

                        }
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    return true
                }).catch(() => {
                    return false
                })
            },
        },

    }
</script>
<style scoped>
    .img {
        float: left;
    }

    img {
        width: 60px;
        height: 60px;
        margin: auto 10px;
    }

    .title {
        font-size: 16px;
        font-weight: bold;
        margin: 5px;
    }

    .title a {
        color: #000;
    }

    .title a:hover {
        color: #E6A23C;
    }

    .intro {
        font-size: 14px;
        color: #606266;
        margin: 5px;
    }

    .information {
        font-size: 13px;
        color: #909399;
        min-width: 750px;
        margin: 5px;
    }
</style>