<template>
    <div>
        <el-button type="primary" size="small" @click="preview">在线预览</el-button>
        <el-button type="primary" size="small" @click="edit" v-if="isPrivate && formatName=='markdown'">在线编辑
        </el-button>
        <el-button type="primary" size="small" plain @click="download">下载文件</el-button>
    </div>
</template>

<script>
    export default {
        name: "OnlinePreviewButton",
        props: [
            'isPrivate',
            'formatName',
            'documentId',
            'documentType',
            'documentUrl'
        ],
        data() {
            return {
                buttonText: "",
                isVisible: false
            }
        },
        created() {

        },
        methods: {
            preview() {
                let routeUrl = this.$router.resolve({
                    name: "documentOnlinePreview",
                    path: "/documentOnlinePreview",
                    query: {
                        documentId: this.documentId,
                        documentType: this.documentType,
                        documentUrl: this.documentUrl,
                    }
                })
                let width = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;

                let height = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight;
                height = height * 5 / 6
                width = width * 5 / 6
                window.open(routeUrl.href, "_blank", "height=" + height + ",width=" + width + ",top=80,left=80,toolbar=no, menubar=no, scrollbars=yes, resizable=yes");
            },
            edit() {
                this.$router.push({
                    name: 'MarkdownEditor',
                    params: {
                        documentId: this.documentId,
                    },
                })
            },
            download() {

            }
        }
    }
</script>

<style scoped>

</style>