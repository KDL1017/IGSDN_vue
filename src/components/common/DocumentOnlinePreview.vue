<template>
    <div v-loading.fullscreen.lock="isLoading">
        <div id="error" v-if="!isLoading && !isSuccess">
            <p404 :isShowHandle="false"></p404>
        </div>
        <div class="images" v-if="!isLoading && isSuccess && isImages">
            <div v-for="value in documentData" style="padding: 0 50px">
                <img :src="'data:image/jpg;base64,' + value" width="100%">
            </div>
        </div>
        <div class="markdown" v-if="!isLoading && isSuccess && isMarkdown">
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
            <!--            <div v-html="documentData"></div>-->
        </div>
    </div>
</template>

<script>
    // import marked from 'marked'
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import axios from 'axios'
    import p404 from '../page/404'

    axios.defaults.baseURL = 'http://localhost:8080'
    export default {
        name: "DocumentOnlinePreview",
        components: {
            p404,
            mavonEditor
        },
        data() {
            return {
                isSuccess: false,
                isLoading: true,
                documentData: [],
            }
        },
        created() {
            // let documentId = this.$route.query.documentId
            // let documentType = this.$route.query.documentType
            // let documentUrl = this.$route.query.documentUrl
            let documentId = 1
            let documentType = "2"
            let documentUrl = "document\\public\\第5讲 穷举法.md"

            console.log("documentId:" + documentId)
            console.log("documentType:" + documentType)
            console.log("documentUrl:" + documentUrl)
            axios.post('/IGSDN/documentOnlinePreview', {documentId, documentType, documentUrl}).then((res) => {
                // console.log(res.data)
                this.documentData = res.data
                console.log(this.documentData)
                this.isLoading = false
                this.isSuccess = true
            }).catch((error) => {
                this.documentData = []
                this.isLoading = false
                this.isSuccess = false
            })

        },
        computed: {
            isMarkdown() {
                if (this.documentData != [] && this.documentData[0] == "markdown") {
                    this.documentData = this.documentData[1]
                    return true
                }
                return false
            },
            isImages() {
                if (this.documentData != [] && this.documentData[0] == "images") {
                    this.documentData.shift()
                    return true
                }
                return false
            }
        }
    }
</script>

<style scoped>
</style>