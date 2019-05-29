<template>
    <div>
        <div class="images" v-if="type==='images'">
            <div v-for="value in documentData" style="padding: 0 50px">
                <img :src="value" width="100%">
            </div>
        </div>
        <div class="markdown" v-if="type==='markdown'">
            <mavon-editor
                    ref="md"
                    :value="documentData"
                    :subfield="false"
                    :defaultOpen="'preview'"
                    :toolbarsFlag="false"
                    :editable="false"
                    :scrollStyle="true"
                    :ishljs="true"
            ></mavon-editor>
        </div>
        <div v-loading.fullscreen.lock="isFirstLoading && isLoading"></div>
        <div v-loading="!isFirstLoading && isLoading"></div>
    </div>
</template>

<script>
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import axios from 'axios'
    export default {
        name: "DocumentOnlinePreview",
        components: {
            mavonEditor
        },
        data() {
            return {
                isScrolling: false,
                type: "",
                isSuccess: true,
                isLoading: true,
                documentId: 0,
                documentType: 0,
                documentUrl: '',
                pageNum: 1, // 当前页码
                pageSize: 4, // 每页大小
                documentData: [],
            }
        },
        created() {
            this.pageNum = 1
            this.documentId = this.$route.query.documentId
            this.documentType = this.$route.query.documentType
            this.documentUrl = this.$route.query.documentUrl
            this.loadDocumentData()
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, false)
            // chrome and ie
            window.addEventListener('mousewheel', this.handleScroll, false)
            // firefox
            window.addEventListener("DOMMouseScroll", this.handleScroll, false)
        },
        methods: {
            loadDocumentData() {
                this.isLoading = true
                let {documentId, documentType, documentUrl, pageNum, pageSize} = this
                axios.post('/IGSDN/documentOnlinePreview', {
                    documentId,
                    documentType,
                    documentUrl,
                    pageNum,
                    pageSize
                }).then((res) => {
                    this.handleData(res.data)
                    if (this.pageNum === 1)
                        this.$message({
                            message: '载入成功',
                            type: 'success'
                        });
                    this.pageNum += 1
                    this.isSuccess = true
                    this.isLoading = false
                    this.isScrolling = false
                }).catch((err) => {
                    this.isLoading = false
                    this.isSuccess = false
                    this.isScrolling = false
                    this.$message.error('抱歉，加载失败了');
                })
            },
            handleScroll(e) {
                if (!this.isScrolling && !this.isLoading) {
                    let scrollTop = document.documentElement.scrollTop
                    let windowHeight = document.documentElement.clientHeight
                    let scrollHeight = document.documentElement.scrollHeight
                    if (scrollTop == 0 && windowHeight == scrollHeight && e.deltaY > 0) {
                        this.isScrolling = true
                        this.loadDocumentData()
                    }
                    if (scrollTop != 0 && scrollTop + windowHeight + 1 > scrollHeight) {
                        this.isScrolling = true
                        this.loadDocumentData()
                    }
                }
            },
            handleData(data) {
                if (this.isMarkdown(data)) {
                    this.documentData = data[1]
                } else if (this.isImages(data)) {
                    data.shift()
                    data.forEach((item) => {
                        this.documentData.push("data:image/jpg;base64," + item)
                    })
                }
            },
            isMarkdown(data) {
                if (data != [] && data[0] == "markdown") {
                    this.type = "markdown"
                    return true
                }
                return false
            },
            isImages(data) {
                if (data != [] && data[0] == "images") {
                    this.type = "images"
                    return true
                }
                return false
            },
        }
        ,
        computed: {
            isFirstLoading() {
                return this.pageNum === 1
            }
        }
    }
</script>

<style scoped>
</style>