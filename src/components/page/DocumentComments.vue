<template>
    <!--@click="clickPageNum"-->
    <!-- :rowKey="firstLevel."-->
    <el-card>
        <!--   <el-table
                   :data="firstLevel"
                   style="width: 100%"
                   :rowKey="rowKey(this)"
                   height="250">
               <el-table-column
                       fixed
                       prop="item.node.remarkDate"
                       label="日期"
                       width="150">
               </el-table-column>
           </el-table>-->

        <el-checkbox v-model="value2" style="margin: 5px 0">匿名</el-checkbox>

        <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="必须少于50个字符！"
                v-model="remark_document" style="margin: 5px 0">
        </el-input>
        <el-button type="info" @click="remarkDocument">对文章评论</el-button>
        <div v-for="item in firstLevel">
            <div>{{item.node.userName}}{{item.node.remarkDate}}{{item.node.content}}
                <Button
                        @click="showComment(item)">展开回复
                </Button>
                <input type="text" v-model="message"/><input type="button" value="回复" @click="recomment(item.node.id)">
            </div>
            <tree v-show="item.node.levelShow" :comments="item.children" :documentID="documentID" :value2="value2" :userID="userID"></tree>
        </div>
        <div class="block">
            <span class="demonstration">当前页：{{documentComment.currentPage}}</span>
            <el-pagination
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :total="documentComment.total">
            </el-pagination>
        </div>
    </el-card>
</template>

<script>

    import axios from 'axios'
    import tree from './Tree'
    import moment from 'moment'
    /**
     *需要当前登陆的ID
     *   1.评论要写入documentComments2 表中
     *   2.评论要加入通知表中
     *
     */

    axios.defaults.baseURL = "http://localhost:8080/"
    export default {
        name: "Recommendation",
        components: {tree},
        data() {
            return {
                remark_document:'',
                value2:false,
                documentID:1,
                userID:3,
                message: '',
                flag: false,
                ///totalNum:9,
                pageSize: 20,
                isShow: false,
                prev: '',
                pager: '',
                next: '',
                current: '',

                activeName: '1',
                firstLevel: [],
                /* documentComment: {
                     currentPage: '',
                     total: null,
                     tree: {
                         children: [{node: {}}]

                         ,
                         node: {
                             content: '',
                             foreignKey: '',
                             id: '',
                             remarkDate: '',
                             userName: '',
                         }
                     },
                 }*/
                documentComment: {},

            };
        }, mounted() {
            //第一次进来默認显示 还要传那个文件
            this.documentID
            this.selectDocumentCommentByPageNum(1)
        },
        methods: {
            showS() {
                return this.showNext()
            },

            showNext(item) {

                while (item.length != 0) {
                    let items = item

                    return item.children
                }
            },
            handleCurrentChange(val) {


                this.selectDocumentCommentByPageNum(val)
            },
            selectDocumentCommentByPageNum(value) {
                let documentID = this.documentID
                let userID = this.userID
                let pageNum = value
                axios.post('/IGSDN/listDocumentComments', {documentID,pageNum,pageNum}).then((res) => {

                    this.documentComment = res.data
                    console.log(this.documentComment)
                    this.firstLevel = this.documentComment.tree.children


                    console.log(this.firstLevel)

                }).catch((err) => {
                    this.isLoading = false
                    this.msg = '服务器请求超时，请检查网络连接！'
                })
            },
            showComment(item) {

                this.flag = !this.flag
                item.node.levelShow = this.flag


            },
            recomment(id) {

                let documentComment2 = {};




                documentComment2.isSecond = true

                documentComment2.document = this.documentID
                documentComment2.commentId = id
                documentComment2.content = this.message
                documentComment2.commentator = this.userID
                documentComment2.remarkDate = moment().utc().format('YYYY-MM-DD')
                documentComment2.isIdentify = this.value2
                documentComment2.id = null
                axios.post("/IGSDN/replyDocumentComments", {'documentComment2': JSON.stringify(documentComment2)}).then((res) => {
                         if ( res.data){
                             alert("评论成功")
                         }else{
                             alert("评论失败")
                         }
                }).catch(e => {

                })
            },
            remarkDocument(){
                this.remark_document


                let documentComment = {};






                documentComment.document = this.documentID

                documentComment.content = this.remark_document

                documentComment.commentator = this.userID


                documentComment.remarkDate = moment().utc().format('YYYY-MM-DD')
                documentComment.isIdentify = this.value2
                documentComment.id = null
                axios.post("/IGSDN/remarkDocument", {'document': JSON.stringify(documentComment)}).then((res) => {
                    if ( res.data){
                        alert("评论成功")
                    }else{
                        alert("评论失败")
                    }
                }).catch(e => {

                })
            }


        }
    }
</script>
<style>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
</style>