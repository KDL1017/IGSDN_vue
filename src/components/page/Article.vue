<template>
    <daily-article :id="articleId"></daily-article>
</template>

<script>
    import Item from './com/item.vue';
    import dailyArticle from './com/KnowledgeDetails.vue';
    import $ from './libs/util';
    export default {
        name: "Article",
        components: { Item, dailyArticle },
        data(){
            return {
                knowledgeData:{},
                themes: [],
                showThemes: false,
                type: 'recommend',
                recommendList: [],
                dailyTime: $.getTodayTime(),
                list: [],
                themeId: 0,
                articleId: 0,
                isLoading: false
            }
        },
        created() {
            let category = this.category.toString()
            let knowledgeName = category.split('-')

            if(knowledgeName[0] == "private"){
                knowledgeName.shift()
                let name = knowledgeName.join("-")
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
            getArticle() {
                $.ajax.get('Knowledge/' + this.knowledgeID).then(res => {
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
            },
            getThemes () {
                $.ajax.get('themes').then(res => {
                    this.themes = res.others;
                })
            },
            formatDay (date) {
                let month = date.substr(4, 2);
                let day = date.substr(6, 2);
                if (month.substr(0, 1) === '0') month = month.substr(1, 1);
                if (day.substr(0, 1) === '0') day = day.substr(1, 1);
                return `${month} 月 ${day} 日`;
            },
            handleClick (id) {
                this.articleId = id;
            }
        },
        mounted () {
            this.getRecommendList();
            this.getThemes();
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

</style>
