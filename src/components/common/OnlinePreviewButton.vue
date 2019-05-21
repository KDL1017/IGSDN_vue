<template>
    <div>
        <el-button type="primary" size="small" round @click="show">{{buttonText}}</el-button>
        <el-card class="box-card" v-show="isVisible">
            <div slot="header" class="clearfix">
                <span>{{buttonText}}</span>
            </div>
            <h2>{{documentId}}</h2>
            <h2>{{documentType}}</h2>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "DocumentOnlinePreview",
        props: [
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
            if (this.documentType == "markdown") {
                this.buttonText = "在线编辑"
            } else {
                this.buttonText = "在线预览"
            }
        },
        methods: {
            show() {
                let routeUrl = this.$router.resolve({
                    name: "documentOnlinePreview",
                    path: "/documentOnlinePreview",
                    query: {
                        documentId: this.documentId,
                        documentType: this.documentType,
                        documentUrl: this.documentUrl,
                    }
                })
                let winHeight = window.document.documentElement.clientHeight - 10;
                window.open(routeUrl.href, "_blank", "height=" + winHeight
                    + ",top=80,left=80,toolbar=no, menubar=no, scrollbars=yes, resizable=yes");
            }
        }
    }
</script>

<style scoped>

</style>