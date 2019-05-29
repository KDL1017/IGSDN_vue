<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <!--<v-tags></v-tags>-->
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view :isScrolling="isScrolling" v-on:loadingFlag="receiveChildMsg"></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    // import vTags from './Tags.vue';
    import bus from './bus';

    export default {
        data() {
            return {
                tagsList: [],
                collapse: false,
                isScrolling: false
            }
        },
        components: {
            vHead, vSidebar
        },
        created() {
            bus.$on('collapse', msg => {
                this.collapse = msg
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            // bus.$on('tags', msg => {
            //     let arr = [];
            //     for(let i = 0, len = msg.length; i < len; i ++){
            //         msg[i].name && arr.push(msg[i].name);
            //     }
            //     this.tagsList = arr;
            // })
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true)
        },
        methods: {
            handleScroll(e) {
                if (!this.isScrolling) {
                    this.isScrolling = false
                    let scrollTop = e.target.scrollTop
                    let windowHeight = e.target.clientHeight
                    let scrollHeight = e.target.scrollHeight
                    if (scrollHeight - (scrollTop + windowHeight) > 1) {
                    } else {
                        this.isScrolling = true
                        return
                    }
                    return
                }
            },
            receiveChildMsg(loadingFlag) {
                // 若数据正在加载，禁用滚动加载
                this.isScrolling = !loadingFlag
            }
        }
    }
</script>
