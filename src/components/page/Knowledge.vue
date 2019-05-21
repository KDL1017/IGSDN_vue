<template>

    <div>
        {{category}}
        <OnlinePreviewButton :documentId="documentId" :documentType="documentType"></OnlinePreviewButton>
    </div>

    <div class="file-list">
        <div class="file-item-recommend">
            <!--                            v-for="list in recommendList"  -->
            <Item  v-for="(recommend,index) in recommendList" :key="index" :recommend="recommend"
                   :index="index"/>
        </div>

        <div class="knowledgeIcon">
            <img :src=icon  min-width="200" height="120" />
        </div>
        <el-card class="box-card">

            <div v-for="(intro,index) in  introduction" :key="index" :intro="intro"
                 :index="index" class="text item">
                {{intro.introductionMessage}}
            </div>
        </el-card>

    </div>
</template>

<script>
    import Item from './com/item.vue';
    import knowledge from './com/KnowledgeDetails.vue';
    import $ from './libs/util';
    export default{
        name: "Knowledge",
        components: { Item,knowledge },
        data(){
            return {
                //
                swiper: null,
                carousel: [],
                promotion: [],
                cates: [],
                //设置size初始为10
                size:10,
                //
                knowledgeData:{},
                type: 'recommend',
                icon:require("../../assets/img/标志1.jpg"),
                introduction:[
                    {introID1:'1',
                        introductionMessage:'C语言是一门面向过程、抽象化的通用程序设计语言，广泛应用于底层开发。'
                    },
                    {introID1:'2',
                        introductionMessage:'C语言能以简易的方式编译、处理低级存储器。'},
                    {introID1:'3',
                        introductionMessage:'C语言是仅产生少量的机器语言以及不需要任何运行环境支持便能运行的高效率程序设计语言。'},
                    {introID1:'4',
                        introductionMessage:'尽管C语言提供了许多低级处理的功能，' +
                            '但仍然保持着跨平台的特性，以一个标准规格写出的C语言程序可在包括一些类似嵌入式处理器以及超级计算机等作业平台的许多计算机平台上进行编译。'},
                ],
                recommendList:[
                    {
                        filterID:'1',
                        image: require("../../assets/img/pdf.png"),
                        title:'Vue开发实战',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        fileIntroduction:'里面啥也没有啦',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                    {
                        filterID:'2',
                        image: require("../../assets/img/pdf.png"),
                        title:'算法基础',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        fileIntroduction:'没有就是没有！hhhhhhhhh没有就是没有！hhhhhhhhh没有就是没有！hhhhhhhhh没有就是没有！hhhhhhhhh没有就是没有！hhhhhhhhh没有就是没有！hhhhhhhhh',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                    {
                        filterID:'3',
                        image: require("../../assets/img/PowerPoint.png"),
                        title:'计算机组成原理',
                        author:'唐朔飞',
                        size:'30.2MB',
                        fileIntroduction:'里面啥也没有啦',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                    {
                        filterID:'4',
                        image: require("../../assets/img/pdf.png"),
                        title:'JavaScript权威指南',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        fileIntroduction:'里面啥也没有啦',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                    {
                        filterID:'5',
                        image: require("../../assets/img/Word.png"),
                        title:'JavaScript权威指南',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        fileIntroduction:'里面啥也没有啦',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                    {
                        filterID:'6',
                        image: require("../../assets/img/Word.png"),
                        title:'JavaScript权威指南',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        fileIntroduction:'里面啥也没有啦',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                    {
                        filterID:'7',
                        image: require("../../assets/img/Word.png"),
                        title:'JavaScript权威指南',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        fileIntroduction:'里面啥也没有啦',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                    {
                        filterID:'8',
                        image: require("../../assets/img/Word.png"),
                        title:'JavaScript权威指南',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        fileIntroduction:'里面啥也没有啦',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                    {
                        filterID:'9',
                        image: require("../../assets/img/Word.png"),
                        title:'JavaScript权威指南',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        fileIntroduction:'里面啥也没有啦',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                    {
                        filterID:'10',
                        image: require("../../assets/img/Word.png"),
                        title:'JavaScript权威指南',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        fileIntroduction:'里面啥也没有啦',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                    {
                        filterID:'11',
                        image: require("../../assets/img/Word.png"),
                        title:'JavaScript权威指南',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        fileIntroduction:'里面啥也没有啦',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },

                ],
                dailyTime: $.getTodayTime(),
                list: [],
                fileId: 0,
                isLoading: false
            }
        },
        created() {
            let category = this.category.toString()
            let knowledgeName = category.split('-')

            if(knowledgeName[0] == "private"){
                knowledgeName.shift()
                let name = knowledgeName.join("-")
                console.log(name)

            }
        },
        watch: {
            id (val) {
                if (val) this.getArticle();
            }
        },
        computed: {
            category() {
                return this.$route.params.category
            }
        },
        methods:{
            //第一次加载先获取10条
            getPromotion() {
                $.ajax({
                    type: "post",
                    url: "/genUser",
                    data: {intro: 'best', page: 1, size: 10},
                    dataType: 'json',
                    success: function (data) {
                        $.hideIndicator();
                        if (data.errCode === 1) {
                            app.promotion = data.data.articleList;
                            // console.log(data);
                        } else {
                            $.toast(data.errMsg);
                        }
                    }
                });
                $.showIndicator();
            },
            goDetail (id) {
                location.href = '/news/newsDetail/' + id;
            },
            getKnowledge() {
                $.ajax.get('Knowledge/' + this.fileId).then(res => {
                    // res.body = res.body
                    //     .replace(/src="http/g, 'src="' + $.imgPath + 'http');
                    this.knowledgeData = res;
                    window.scrollTo(0, 0);
                })
            },
            getRecommendList () {
                this.isLoading = true;
                const prevDay = $.prevDay(this.dailyTime + 86400000);
                $.ajax.get('news/before/' + prevDay).then(res => {
                    this.recommendList.push(res);
                    this.isLoading = false;
                })

                // const $list = this.$refs.list;
                // axios.post('/IGSDN//genUser/Recommendation').then((res) => {
                //     this.recommendList.push(res);
                //     this.isLoading = false;
                //     this.recommendList.FilterId = res.data.FilterId
                //     this.recommendList.image = res.data.image
                // this.recommendList.filterID = res.data.filterID
                // this.isLoading = true;
            },

            handleClick (id) {
                this.fileId = id;
            },
            handleClick2(row) {
                console.log(row);
            }
        },

        mounted: function () {

            this.getRecommendList();
            // this.getThemes();
            // const $list = this.$refs.list;
            // $list.addEventListener('scroll', () => {
            //     if (this.type === 'daily' || this.isLoading) return;
            //     if
            //     (
            //         $list.scrollTop
            //         + document.body.clientHeight
            //         >= $list.scrollHeight
            //     )
            //     {
            //         this.dailyTime -= 86400000;
            //         this.getRecommendList();
            //     }
            // });

            //定义that用that.size获取size的值
            var that=this;
            // this.getPromotion();
            //秒表每秒请求一次
            setInterval(function(){
                //content是div类名
                const el = document.querySelector('.file-item-recommend');
                const offsetHeight = el.offsetHeight;
                el.onscroll = () => {
                    const scrollTop = el.scrollTop;
                    const scrollHeight = el.scrollHeight;
                    if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
                        //每次滚动到底部size+10
                        that.size+=10;
                    }
                }
                $.ajax({
                    type: "post",
                    url: "/genUser/",
                    data: {intro: 'best', page: 1, size: that.size},
                    dataType: 'json',
                    success: function (data) {
                        $.hideIndicator();
                        if (data.errCode === 1) {
                            app.promotion = data.data.articleList;
                            // console.log(222);
                        } else {
                            $.toast(data.errMsg);
                        }
                    }
                });
            },10*60);
            // window.addEventListener('scroll', this.scrollBottom());
        }
    }
</script>

<style scoped>
    @import url("../../assets/css/knowledge.css");
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        position: fixed;
        top: 25%;
        left: 85%;
        width: 14%;
        height: auto;
        overflow: auto;
    }
</style>
