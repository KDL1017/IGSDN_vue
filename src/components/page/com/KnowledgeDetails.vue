<template>
    <div class="file-details">
        <el-card class="box-card">
            <div class="file-img">{{file.img}}</div>
            <div slot="header" class="clearfix">
                <span>{{file.title}}</span>
            </div>
            <div class="file-introduction">
                {{file.introduction}}
            </div>
            <div class="file-information">
                作者：{{ file.author }}|
                文件大小：{{file.size}}|
                上传时间：{{file.uploadDate}}
            </div>
            <div class="el-button">
                <button>预览全文</button>
                <button>下载文件</button>
            </div>
            <div v-for="(comment,index) in  commented" :key="index" :comment="comment"
                 :index="index" class="text item">
                {{}}
            </div>
        </el-card>
<!--        <div class="file-details-title">{{title }}</div>-->
<!--        <div class="file-article-content" v-html="data.body"></div>-->
<!--        <div class="file-comments" v-show="comments.length">-->
<!--            <span>评论（{{ comments.length }}）</span>-->
<!--            <div class="file-comment" v-for="comment in comments">-->
<!--                <div class="file-comment-avatar">-->
<!--                    <img :src="comment.avatar">-->
<!--                </div>-->
<!--                <div class="file-comment-content">-->
<!--                    <div class="file-comment-name">{{ comment.author }}</div>-->
<!--                    <div class="file-comment-time" v-time="comment.time"></div>-->
<!--                    <div class="file-comment-text">{{ comment.content }}</div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>
<script>
    import Time from '../directives/time';
    import $ from '../libs/util';
    export default {
        directives: { Time },
        props: {
            id: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                file:
                    {
                        filterID:'1',
                        image: require("../../../assets/img/Word.png"),
                        title:'JavaScript权威指南',
                        author:'Neapolitan,R.E.',
                        size:'78.2MB',
                        fileIntroduction:'里面啥也没有啦',
                        uploadDate:'2019-01-14',
                        lastUpdateDate:'2019-01-14'
                    },
                comments: [
                    {

                    },
                ]

            }
        },
        methods: {


            // getArticle () {
            //     $.ajax.get('news/' + this.id).then(res => {
            //         res.body = res.body
            //             .replace(/src="http/g, 'src="' + $.imgPath + 'http');
            //         res.body = res.body
            //             .replace(/src="https/g, 'src="' + $.imgPath + 'https');
            //         this.data = res;
            //         window.scrollTo(0, 0);
            //         this.getComments();
            //     })
            // },

            getComments () {
                this.comments = [];
                $.ajax.get('story/' + this.id + '/short-comments').then(res => {
                    this.comments = res.comments.map(comment => {
                        // 将头像的图片地址转为代理地址
                        comment.avatar = $.imgPath + comment.avatar;
                        return comment;
                    });
                })
            }
        },
        watch: {
            id (val) {
                if (val) this.getArticle();
            }
        }
    };
</script>
<style>
    @import url("../../../assets/css/details.css");
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
</style>
