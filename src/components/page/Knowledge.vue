<template>
    <div>
        {{category}}
        <OnlinePreviewButton :documentId="documentId" :documentType="documentType"></OnlinePreviewButton>
    </div>

</template>

<script>
    import OnlinePreviewButton from "../common/OnlinePreviewButton"

    export default {
        name: "Knowledge",
        data() {
            return {
                documentId: 1,
                documentType: 'markdown'
            }
        },
        components: {OnlinePreviewButton},
        comments: {
            OnlinePreviewButton
        },
        computed: {
            category() {
                return this.$route.params.category
            }
        }
    }
</script>

<style scoped>

</style>