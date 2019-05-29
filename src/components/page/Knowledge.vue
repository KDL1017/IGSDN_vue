<template>
    <div>
        <KnowledgeScroller  style="margin:0 10px"
                v-if="!isPrivate" :isScrolling="isScrolling" :categoryId="categoryId" :changeFlag="changeFlag"
                v-on:loadingFlag="receiveChildMsg"></KnowledgeScroller>
        <KnowledgePagination  style="margin:0 10px"
                v-if="isPrivate" :categoryId="categoryId" :changeFlag="changeFlag"></KnowledgePagination>
    </div>
</template>

<script>
    import KnowledgeScroller from './KnowledgeScroller'
    import KnowledgePagination from './KnowledgePagination'

    export default {
        name: "Knowledge",
        props: ['isScrolling'],
        components: {KnowledgeScroller, KnowledgePagination},
        data() {
            return {
                changeFlag: true,
                isPrivate: true,
                categoryId: 0,
            }
        },
        created() {
            this.getCategory()
        },
        watch: {
            $route() {
                this.getCategory()
            },
            category: {
                handler: function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        this.changeFlag = !this.changeFlag
                    }
                },
                deep: true
            }
        },
        computed: {
            category() {
                const {isPrivate, categoryId} = this
                return {
                    isPrivate,
                    categoryId
                }
            }
        },
        methods: {
            getCategory() {
                let categoryParams = this.$route.params.category
                let categoryParamsList = categoryParams.split('-')

                if (categoryParamsList[0] == "private") {
                    this.categoryId = categoryParamsList[1]
                    this.isPrivate = true
                } else {
                    this.categoryId = categoryParamsList[0]
                    this.isPrivate = false
                }
            },
            receiveChildMsg(loadingFlag) {
                this.$emit("loadingFlag", loadingFlag)
    }
</script>

<style scoped>

</style>