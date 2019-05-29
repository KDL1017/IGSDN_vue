<!--<template id="item-template">
    <div style="margin-left: 10px">
        <div style="text-align:left" >
            <div v-if="comments.length > 0" v-for="item in comments">
                <div >{{item.node.userName}} {{item.node.remarkDate}} {{item.node.content}}
                    <Button
                        @click="flag=!flag">展开回复</Button></div>
                <div v-if="flag"><input type="text" v-model="message"/><input type="button" value="回复" @click="reomment(item.node.id)"></div>
                <div v-if="flag">
                <tree class="tree" :comments="item.children" ></tree>
                </div>
            </div>

        </div>
        <div>

        </div>
    </div>
</template>-->
<template id="item-template">
    <div style="margin-left: 10px">
        <div style="text-align:left">
            <div v-if="comments.length > 0" v-for="item in comments">
                <div>{{item.node.userName}} {{item.node.remarkDate}} {{item.node.content}}
                </div>
                <input type="text" v-model="message"/><input type="button" value="回复" @click="recomment(item.node.id)">
                <tree class="tree" :comments="item.children"></tree>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'

    export default {
        name: "tree",
        template: '#item-template',
        props: ['comments', 'documentID', 'value2', 'userID'],
        mounted() {


        },
        data() {
            return {

                message: '',
            }
        }, methods: {
            recomment(id) {
                let documentComment2 = {};
                documentComment2.isSecond = false
                documentComment2.document = this.documentID
                documentComment2.commentId = id
                documentComment2.content = this.message
                documentComment2.commentator = this.userID
                documentComment2.remarkDate = moment().utc().format('YYYY-MM-DD')
                documentComment2.isIdentify = this.value2
                documentComment2.id = null
                axios.post("/IGSDN//replyDocumentComments", {'documentComment2': JSON.stringify(documentComment2)}).then((res) => {
                    if (res.data) {
                        alert("评论成功")
                    } else {
                        alert("评论失败")
                    }
                }).catch(e => {

                })

            }
        }
    }
</script>

<style scoped>

</style>