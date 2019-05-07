<template>
    <div>{{category}}</div>

</template>

<script>
    export default {
        name: "Knowledge",
        computed: {
            category() {
                return this.$route.params.category
            }
        }
    }
</script>

<style scoped>

</style>