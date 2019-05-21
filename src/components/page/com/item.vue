<template>
    <a class="file-item-recommend">
        <dt>
            <div class="file-img" >
                <img :src="recommend.image">
            </div>
        </dt>
        <dd><div style="">
            <div class="file-title"><a v-on:click="fileLoad">{{recommend.title }}</a></div>
            <div class="file-introduction" style="width:300px;overflow: hidden; text-overflow: ellipsis;white-space: nowrap;">
                {{recommend.fileIntroduction}}
            </div>
            <div class="file-information">
                作者：{{ recommend.author }}|
                文件大小：{{recommend.size}}|
                上传时间：{{recommend.uploadDate}}|
                上次修改时间：{{recommend.lastUpdateDate}}
            </div>
        </div>
        </dd>

    </a>
</template>
<script>
    import $ from '../libs/util';
    export default {
        props: ['recommend','index'],
        data () {
            return {

            }
        },
        methods: {
            fileLoad() {
                this.$router.push('genUser/knowledgeDetails');
            },
            handleClick(row) {
                console.log(row);
            },

        },
        mounted: function () {
            //定义that用that.size获取size的值
            var that=this;
            // getPromotion();
            //秒表每秒请求一次
            setInterval(function(){
                //content是div类名
                const el = document.querySelector('.content');
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
                    url: "/news/search",
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
        },
    }
</script>
