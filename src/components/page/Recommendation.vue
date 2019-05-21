<template>

            <div class="filter-list-recommend" ref="list">
                <el-container>
                    <el-header>Header</el-header>
                    <el-main >
                        <el-carousel style="width: 60%;margin:2px">
                            <el-carousel-item v-for="item in 4" :key="item">
                                <h3 class="small">{{ item }}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </el-main>
                </el-container>

                <template v-if="type === 'recommend'">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="推荐" name="first">
                            <span slot="label">推荐</span>
                            <div class="filter-item-recommend">
                            <!--                            v-for="list in recommendList"  -->
                            <Item  v-for="(recommend,index) in recommendList" :key="index" :recommend="recommend"
                                   :index="index"/>
                        </div></el-tab-pane>
                        <el-tab-pane label="热门" name="second">热门</el-tab-pane>
                    </el-tabs>
<!--                    <Item :recommend-list="recommendList"></Item>-->
                </template>
            </div>
</template>
<script>
    import Item from './com/Recommenditem.vue';
    import $ from './libs/util';
    import axios from 'axios'
    export default {
        name: "Recommendation",
        components: { Item },
        data(){
            return {
                knowledgeData:{
                    filterID:''
                },
                activeName: 'second',
                type: 'recommend',
                recommendList:[
                    {
                        filterID:'11111',
                        image: require("../../assets/img/Vue企业开发实战.jpg"),
                        title:'Vue开发实战',
                        author:'肖睿',
                        size:'102MB',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                    {
                        filterID:'22222',
                        image: require("../../assets/img/算法基础(第五版).jpg"),
                        title:'算法基础',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                    {
                        filterID:'22222',
                        image: require("../../assets/img/算法基础(第五版).jpg"),
                        title:'算法基础',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                    {
                        filterID:'22222',
                        image: require("../../assets/img/算法基础(第五版).jpg"),
                        title:'算法基础',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                    {
                        filterID:'22222',
                        image: require("../../assets/img/算法基础(第五版).jpg"),
                        title:'算法基础',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    }
                ],
                fileID:'',
                list: [],
                dailyTime: $.getTodayTime(),
                isLoading: false
            }
        },
        computed: {
            category() {
                return this.$route.params.category
            }
        },
        methods:{
            fileLoad() {
                this.$router.push('Details-:fileID');
            },
            getRecommendList () {
                this.isLoading = true;
                const prevDay = $.prevDay(this.dailyTime + 86400000);
                $.ajax.get('news/before/' + prevDay).then(res => {
                    this.recommendList.push(res);
                    this.isLoading = false;
                })
                // axios.post('/IGSDN//genUser/Recommendation').then((res) => {
                //     this.recommendList.push(res);
                //     this.isLoading = false;
                //     this.recommendList.FilterId = res.data.FilterId
                //     this.recommendList.image = res.data.image
                //     this.recommendList.title = res.data.title
                //     this.recommendList.author = res.data.author
                //     this.recommendList.size = res.data.size
                //     this.recommendList.uploadDate = res.data.uploadDate
                //     this.recommendList.lastUpdateDate = res.data.lastUpdateDate
                // this.isLoading = true;
                // const $list = this.$refs.list;
                // })
            },
            handleClick (id) {
                this.fileID = id;
            },


        },
        mounted () {
            this.getRecommendList();
            const $list = this.$refs.list;
            $list.addEventListener('scroll', () => {
                if (this.type === 'daily' || this.isLoading) return;
                if
                (
                    $list.scrollTop
                    + document.body.clientHeight
                    >= $list.scrollHeight
                )
                {
                    this.dailyTime -= 86400000;
                    this.getRecommendList();
                }
            });
        }
    }
</script>

<style scoped>
    @import url("../../assets/css/Recommendstyle.css");
    @import url("../../assets/css/tabs.css");
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>