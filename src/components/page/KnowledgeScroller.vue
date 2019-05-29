<template>
    <div>
        <div style="width: auto;display:inline-block !important; display:inline; float: left">
            <transition name="el-zoom-in-center">
                <div class="tips" v-show="!categoryId && isShowTips">
                <span class="close" @click="handleShowTips()">
                    <i class="el-icon-close"></i>
                </span>
                    <span>下拉到底部，以加载更多推荐内容</span>
                </div>
            </transition>
            <el-card style="min-width: 600px">
                <KnowledgeItem v-for="document in documentList" :document="document" :key="document.id"
                               :isPrivate="false"
                               style="margin: 0 20px 20px 0;width: auto;display:inline-block !important; display:inline;"/>
                <div style="width: 100%;text-align: center;margin: 10px;color: #909399" :style="msgStyle"
                     @click="loadData(true)">
                    <i class="el-icon-loading" v-show="isLoading"></i>
                    {{msg}}
                </div>
            </el-card>
        </div>
        <CategoryIntro :categoryId="categoryId" v-show="categoryId"></CategoryIntro>
    </div>
</template>

<script>
    import 'element-ui/lib/theme-chalk/base.css'
    import CategoryIntro from './CategoryIntro'
    import KnowledgeItem from './KnowledgeItem'
    import axios from 'axios'

    export default {
        name: "KnowledgeScroller",
        components: {CategoryIntro, KnowledgeItem},
        props: ['isScrolling', 'categoryId', 'changeFlag'],
        data() {
            return {
                isShowTips: false,
                isFirstLoading: true,
                loadingCategoryFlag: true,
                currentPage: 1, // 当前页码
                pageSize: 10, // 每页大小
                isLoading: false, // 是否正在加载
                isLast: false, // 暂无更多数据
                userId: 0,
                isSuccess: true,
                documentList: [],
            }
        },
        created() {
            this.userId = localStorage.getItem("user_msg") ? localStorage.getItem("user_msg").id : 2
        },
        watch: {
            isScrolling() {
                this.loadData(this.isScrolling)
            },
            changeFlag() {
                this.init()
            },
        },
        computed: {
            msg() {
                if (!this.isSuccess) {
                    return "数据加载失败，请尝试刷新页面..."
                } else if (this.isLast) {
                    return "暂无更多数据"
                } else if (this.isLoading) {
                    return "正在加载..."
                } else {
                    return "下拉加载更多"
                }
            },
            msgStyle() {
                if (this.isLoading || this.isLast) {
                    return ""
                } else {
                    return "cursor: pointer"
                }
            }

        },
        methods: {
            init() {
                this.isShowTips = false
                this.isFirstLoading = true
                this.loadingCategoryFlag = true
                this.currentPage = 1
                this.pageSize = 10
                this.isLoading = false
                this.isLast = false
                this.documentList = []
                this.loadingCategoryFlag = !this.loadingCategoryFlag
                this.isSuccess = true
                this.loadData(true)
            },
            listDocumentByScroll() {
                const {userId, currentPage, pageSize, categoryId} = this
                axios.post('/IGSDN/listDocumentByScroll', {
                    userId,
                    categoryId,
                    currentPage,
                    pageSize
                }).then((res) => {
                    this.success = true
                    this.documentList = this.documentList.concat(res.data)
                    this.isLoading = false
                    this.isFirstLoading = false
                    this.currentPage += 1
                    if (res.data.length < pageSize)
                        this.isLast = true
                    // 告诉父组件能继续加载
                    this.$emit("loadingFlag", !this.isLoading && !this.isLast)
                }).catch((err) => {
                    this.isSuccess = false
                    this.isLoading = false
                    this.isFirstLoading = false
                })

            },

            loadData(isScrolling) {
                if (this.isFirstLoading) {
                    this.isShowTips = true
                }
                if (isScrolling && !this.isLoading && !this.isLast) {
                    this.isLoading = true
                    this.listDocumentByScroll()
                } else {
                    return
                }
            },
            handleShowTips() {
                this.isShowTips = !this.isShowTips
            }

        }
    }
</script>

<style scoped>
    .tips {
        background-color: #F56C6C;
        font-size: 14px;
        text-align: center;
        color: white;
        padding: 8px;
        margin-bottom: 2px
    }

    .tips .close {
        float: right;
        margin: 0 10px;
        cursor: pointer
    }
</style>
