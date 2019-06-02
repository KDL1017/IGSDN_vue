<template>
    <div>
        <div class="container">
            <div style="margin: 0 auto " v-loading="documentId!=0 && isContentLoading"></div>
            <!--            <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/>-->
            <mavon-editor v-model="content" ref="md" @change="change" style="min-height: 600px" :toolbars="toolbars"/>
            <el-button class="editor-btn" type="primary" @click="submit" v-if="documentId!=0 && content"
                       :loading="isUpdateLoading">{{submitButtonText}}
            </el-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        name: 'MarkdownEditor',
        data() {
            return {
                isContentLoading: true,
                isUpdateLoading: false,
                documentId: 0,
                content: '',
                html: '',
                isUpdate: false,
                toolbars: {
                    bold: true, // 粗体
                    italic: true,// 斜体
                    header: true,// 标题
                    underline: true,// 下划线
                    strikethrough: true,// 中划线
                    mark: true,// 标记
                    superscript: true,// 上角标
                    subscript: true,// 下角标
                    quote: true,// 引用
                    ol: true,// 有序列表
                    ul: true,// 无序列表
                    link: true,// 链接
                    imagelink: false,// 图片链接
                    code: true,// code
                    table: true,// 表格
                    subfield: true,// 是否需要分栏
                    fullscreen: false,// 全屏编辑
                    readmodel: false,// 沉浸式阅读
                    htmlcode: true,// 展示html源码
                    help: false// 帮助
                }
            }
        },
        components: {
            mavonEditor
        },
        mounted() {
            this.isUpdate = false
            this.isContentLoading = true
            const documentId = this.$route.query.documentId
            if (documentId) {
                this.documentId = documentId
                this.isUpdateLoading = false
                this.init()
            }
        },
        watch: {
            content() {
                if (!this.isContentLoading) {
                    this.isUpdate = true
                }
                this.isContentLoading = false
            }
        },
        computed: {
            submitButtonText() {
                if (this.isUpdateLoading) {
                    return "提交中"
                } else {
                    return "提交"
                }
            }
        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            // $imgAdd(pos, $file){
            //     var formdata = new FormData();
            //     formdata.append('file', $file);
            //     // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
            //     this.$axios({
            //         url: '/common/upload',
            //         method: 'post',
            //         data: formdata,
            //         headers: { 'Content-Type': 'multipart/form-data' },
            //     }).then((url) => {
            //         this.$refs.md.$img2Url(pos, url);
            //     })
            // },
            init() {
                this.isContentLoading = true
                this.content = ''
                if (this.documentId && this.documentId != 0) {
                    axios.get('/IGSDN/getMarkdownContent/' + this.documentId).then((res) => {
                        this.content = res.data
                    }).catch((err) => {
                        this.$message.error('抱歉，加载失败！')
                    })
                }
                return
            }
            ,
            change(value, render) {
                // render 为 markdown 解析后的结果
                this.html = render;
            }
            ,
            submit() {
                if (!this.isUpdateLoading) {
                    this.isUpdateLoading = true
                    const content = this.content
                    axios.put('/IGSDN/updateMarkdownContent/' + this.documentId, {content}).then((res) => {
                        this.isUpdateLoading = false
                        if (res.data) {
                            this.$message.success('提交成功！')
                        } else {
                            this.$message.error('提交失败！')
                        }
                    }).catch((err) => {
                        this.isUpdateLoading = false
                        this.$message.error('提交失败！')
                    })
                }
                return
            },
        },

    }
</script>
<style scoped>
    .editor-btn {
        margin-top: 20px;
    }
</style>