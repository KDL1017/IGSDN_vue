<template>
    <div>
        <div :class="isFirstLevel?'firstItem':'item'" @mouseenter="handleShowOperation"
             @mouseleave="handleShowOperation">
            <span>{{item.data.userName}} :</span>
            <span style="color: #606266">{{item.data.content}}</span>
            <span style="color: #909399;font-size: 12px">({{item.data.remarkDate}})</span>
            <span><a v-show="isShowOperation" @click="handleShowInput">{{isShowInput?"关闭":"评论"}}</a></span>
            <span><a v-show="isFirstLevel && isShowOperation" @click="handleOpen">{{isOpen?"收起回复":"查看回复"}}</a></span>
        </div>
        <div style="margin: 0 50px 0 20px;">
            <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="content" v-show="isShowInput">
            </el-input>
        </div>
    </div>
</template>

<script>
    import DocumentCommentsTree from './DocumentCommentsTree'

    export default {
        name: "DocumentCommentsItem",
        props: ["item", 'documentId', 'userId', 'isFirstLevel','index'],
        components: {DocumentCommentsTree},
        data() {
            return {
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
            replyComments() {
                let documentComment2 = {};
                documentComment2.isSecond = false
                documentComment2.document = this.documentId
                documentComment2.commentId = this.item.data.id
                documentComment2.content = this.message
                documentComment2.commentator = this.userId
                documentComment2.remarkDate = moment().utc().format('YYYY-MM-DD')
                documentComment2.id = null
                axios.post("/IGSDN//replyDocumentComments", {'documentComment2': JSON.stringify(documentComment2)}).then((res) => {
                    if (res.data) {
                        alert("评论成功")
                    } else {
                        alert("评论失败")
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