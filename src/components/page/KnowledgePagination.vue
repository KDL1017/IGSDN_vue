<template>
    <div style="margin:0 10px">
        <span style="width: auto;display:inline-block !important; display:inline; float: left">
            <el-card style="min-width: 600px">
                <el-input v-model="query" prefix-icon="el-icon-search" placeholder="文件搜索..." clearable
                          style="font-size: 14px;width: 640px;margin:5px 20px 20px 20px"
                          @keyup.enter.native="init(false)"></el-input>
                <el-button type="primary" icon="el-icon-plus" @click="upload">上传新文件</el-button>
                <div style="margin: 10px auto;text-align: center"><i class="el-icon-loading" v-show="isLoading"></i>{{msg}}</div>
                <KnowledgeItem v-for="document in documentList" :document="document" :key="document.id"
                               :isPrivate="true"
                               :isPublic="document.public"
                               style="margin: 0 20px 20px 0;width: auto;display:inline-block !important; display:inline;"/>
            </el-card>
            <el-card>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </el-card>
        </span>
        <CategoryIntro :categoryId="categoryId"></CategoryIntro>
    </div>
</template>

<script>
    import axios from 'axios'
    import PubSub from 'pubsub-js'
    import KnowledgeItem from './KnowledgeItem'
    import CategoryIntro from './CategoryIntro'

    export default {
        name: "KnowledgePagination",
        components: {CategoryIntro, KnowledgeItem},
        props: ['categoryId', 'changeFlag'],
        data() {
            return {
                query: '', // 搜索条件
                userId: 0,
                total: 0,
                pageSize: 5,
                currentPage: 1,
                isLoading: false, // 是否正在加载
                isSuccess: true,
                documentList: []
            }
        },
        mounted() {
            this.userId = JSON.parse(localStorage.getItem('user_msg')).id
            this.init(true)
            PubSub.subscribe('deleteDocument', (event, data) => {
                if (data) {
                    this.listDocumentByPagination()
                }
            })
        },
        watch: {
            changeFlag() {
                this.init(true)
            },
        },
        computed: {
            msg() {
                if (this.isLoading) {
                    return "加载中..."
                } else if (!this.isSuccess && this.documentList.length == 0) {
                    return "抱歉，加载失败，请尝试刷新页面"
                } else if (this.isSuccess && this.documentList.length == 0) {
                    return "暂无更多数据"
                } else {
                    return ""
                }
            }
        },
        methods: {
            init(flag) {
                this.total = 0
                this.pageSize = 5
                this.currentPage = 1
                this.isLoading = false
                this.isSuccess = true
                this.documentList = []
                if (flag)
                    this.query = ""
                this.listDocumentByPagination()
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.listDocumentByPagination()
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.listDocumentByPagination()
                console.log(`当前页: ${val}`);
            },
            listDocumentByPagination() {
                this.isLoading = true
                const {query, userId, currentPage, pageSize, categoryId} = this
                axios.post('/IGSDN/listDocumentByPagination', {
                    query,
                    userId,
                    categoryId,
                    currentPage,
                    pageSize,
                }).then((res) => {
                    this.documentList = res.data.data
                    this.total = res.data.total
                    this.isLoading = false
                }).catch((err) => {
                    this.isSuccess = false
                    this.isLoading = false
                })
            },
            upload() {
                this.$router.push('upload')
            }
        },
    }
</script>

<style scoped>
</style>