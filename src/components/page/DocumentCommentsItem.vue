<template>
    <div style="margin: 10px 0">
        <div :class="isFirstLevel?'firstItem':'item'" @mouseenter="handleShowOperation"
             @mouseleave="handleShowOperation">
            <span>{{item.data.userName}} :</span>
            <span style="color: #606266">{{item.data.content}}</span>
            <span style="color: #909399;font-size: 12px">({{item.data.remarkDate}})</span>
            <span><a v-show="isShowOperation" @click="handleShowInput">{{isShowInput?"关闭":"评论"}}</a></span>
            <span><a v-show="isFirstLevel && isShowOperation" @click="handleOpen">{{isOpen?"收起回复":"查看回复"}}</a></span>
        </div>
        <div style="margin: 0 50px 0 20px;" v-show="isShowInput">
            <el-input
                    placeholder="不大于50个字符！"
                    maxlength="50"
                    @keyup.enter.native="listenReplyComments($event)"
                    v-model="content" v-show="isShowInput" style="margin: 5px 0">
            </el-input>
            <el-checkbox v-model="isIdentify" style="margin: 5px 0">匿名</el-checkbox>
            <el-button type="primary" @click="replyComments" style="float: right; margin: 5px 0">发布评论
            </el-button>
        </div>
    </div>
</template>

<script>

    import DocumentCommentsTree from './DocumentCommentsTree'
    import axios from 'axios'
    import moment from 'moment'
    import PubSub from 'pubsub-js'

    export default {
        name: "DocumentCommentsItem",
        props: ["item", 'documentId', 'userId', 'isFirstLevel', 'index'],
        components: {DocumentCommentsTree},
        data() {
            return {
                isIdentify: false,
                content: '',
                isOpen: false,
                isShowInput: false,
                isShowOperation: false,
            }
        },
        methods: {
            handleOpen() {
                this.isOpen = !this.isOpen
                let msg = []
                msg.push(this.index)
                msg.push(this.isOpen)
                this.$emit("openMsg", msg)
            },
            handleShowInput() {
                this.isShowInput = !this.isShowInput
            },
            handleShowOperation() {
                this.isShowOperation = !this.isShowOperation
            },
            listenReplyComments(event) {
                this.replyComments()
                event.preventDefault() // 阻止浏览器默认换行操作
                return false
            },
            replyComments() {
                let documentComment2 = {};
                documentComment2.isIdentify = this.isIdentify
                documentComment2.isSecond = this.isFirstLevel ? true : false
                documentComment2.document = this.documentId
                documentComment2.commentId = this.item.data.id
                documentComment2.content = this.content
                documentComment2.commentator = this.userId
                documentComment2.remarkDate = moment().utc().format('YYYY-MM-DD')
                documentComment2.id = null
                axios.post("/IGSDN/replyDocumentComments", {'documentComment2': JSON.stringify(documentComment2)}).then((res) => {
                    if (res.data) {
                        PubSub.publish('isCommentSuccess', true)
                        this.isShowInput = false
                        this.isShowOperation = false
                        this.content = ""
                        this.$message({
                            message: '评论成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '评论失败',
                            type: 'error'
                        });
                    }
                }).catch(err => {

                })

            }
        }
    }
</script>

<style scoped>
    a {
        cursor: pointer;
        font-size: 12px;
        color: #409EFF;
    }

    a:hover {
        color: #79a5e5;
    }

    .firstItem {
        min-height: 20px;
        height: auto;
        margin: 5px;
    }

    .firstItem {
        min-height: 20px;
        height: auto;
        margin: 5px;
    }

    .item {
        border-left: 4px solid #c5c5c5;
        min-height: 20px;
        height: auto;
        margin: 5px;
    }

    span {
        margin: 5px;
    }
</style>