<template>
    <div class="filter-list-recommend" ref="list">
        <el-container>
            <!--            <el-header>-->
            <!--            </el-header>-->
            <el-main>
                <!--                <div class="block">-->
                <!--                    <el-carousel trigger="click" height="150px" style="width: 600px">-->
                <!--                        <el-carousel-item v-for="item in 4" :key="item">-->
                <!--                            <h3>{{ item }}</h3>-->
                <!--                        </el-carousel-item>-->
                <!--                    </el-carousel>-->
                <!--                </div>-->
                <KnowledgeScroller :isScrolling="isScrolling" v-on:loadingFlag="receiveChildMsg" :userId="userId"
                                   :changeFlag="changeFlag" class="block"></KnowledgeScroller>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import KnowledgeScroller from './KnowledgeScroller'

    export default {
        name: "Recommendation",
        props: ['isScrolling'],
        components: {KnowledgeScroller},
        data() {
            return {
                userId: 0,
                changeFlag: true,
            }
        },
        mounted() {
            this.userId = localStorage.getItem("user_msg") ? localStorage.getItem("user_msg").id : 2
            this.changeFlag = !this.changeFlag
        },
        computed: {
            $route() {
                this.changeFlag = !this.changeFlag
            }
        },
        methods: {
            receiveChildMsg(loadingFlag) {
                this.$emit("loadingFlag", loadingFlag)
            }
        },
    }
</script>

<style scoped>
    .block {
        margin: 0 0 20px 5px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

</style>