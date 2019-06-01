<template id="item-template">
    <div style="margin-left: 20px;text-align:left;font-size: 14px">
        <div v-if="comments.length > 0" v-for="item in comments">
            <DocumentCommentsItem :item="item" :documentId="documentId" :userId="userId"></DocumentCommentsItem>
            <DocumentCommentsTree class="tree" v-if="item.children&&item.children.length>0" :comments="item.children"
                                  :documentId="documentId"
                                  :userId="userId"></DocumentCommentsTree>
        </div>
    </div>
</template>

<script>
    import DocumentCommentsItem from './DocumentCommentsItem'

    export default {
        name: "DocumentCommentsTree",
        props: ['comments', 'documentId', 'userId'],
        components: {DocumentCommentsItem},
        mounted() {

        },
        data() {
            return {}
        }, methods: {}
    }
</script>

<style scoped>

</style>