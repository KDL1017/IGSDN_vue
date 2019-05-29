<template>
    <div>
        <transition name="intro-box">
            <div class="right intro" v-if="isShowCategoryIntro">
                <el-card>
                    <div style="margin: 10px auto" v-loading="!category.intro"></div>
                    <div slot="header" class="clearfix">
                        <span>{{category.name}}</span>
                    </div>
                    <div style="margin:5px; font-size: 14px;max-height:400px;overflow-y: auto;">
                        <div v-html="category.intro" style="color: #606266"></div>
                    </div>
                </el-card>
            </div>
        </transition>
        <span class="right icon" @click="isShowCategoryIntro =! isShowCategoryIntro">
            <el-tooltip class="item" effect="dark" :content="isShowCategoryIntro? '收起':'展开'" placement="left">
                <i :class="isShowCategoryIntro?'el-icon-arrow-right':'el-icon-arrow-left'" style="margin:10px"></i>
            </el-tooltip>
        </span>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "CategoryIntro",
        props: ['categoryId'],
        data() {
            return {
                isShowCategoryIntro: false, // 是否显示category简介
                category: {
                    id: 0,
                    name: '',
                    intro: ''
                },
            }
        },
        mounted() {
            this.isShowCategoryIntro = false
            this.getCategoryIntro()
        },
        watch: {
            categoryId() {
                this.isShowCategoryIntro = false
                this.getCategoryIntro()
            }
        },
        methods: {
            getCategoryIntro() {
                if (this.categoryId && this.categoryId != 0) {
                    axios.get('/IGSDN/getCategoryIntro/' + this.categoryId).then((res) => {
                        this.category = res.data
                        this.categoryIntroRender()
                        this.isShowCategoryIntro = true
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            },
            categoryIntroRender() {
                // 每段落开头空两格，与categoryName相同的字加标识
                const categoryIntros = this.category.intro.split("<br>")
                let categoryIntroString = ""
                for (let index in categoryIntros) {
                    categoryIntroString += "<p style='text-indent:2em;'>" + categoryIntros[index] + "</p>"
                }
                this.category.intro = categoryIntroString
            },
        }
    }
</script>

<style scoped>
    .right {
        position: fixed;
        top: 100px;
        left: auto;
        right: 20px;
        bottom: auto;
        float: right
    }

    .intro {
        width: 350px;
    }

    .icon {
        cursor: pointer
    }

    .intro-box-enter-active {
        transition: all .6s ease;
    }

    .intro-box-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .intro-box-enter, .intro-box-leave-to {
        transform: translateX(400px);
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>