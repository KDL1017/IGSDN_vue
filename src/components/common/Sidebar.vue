<template>
    <div class="sidebar">
        <!-- 前台遍历是自己循环-->
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="white"
                 text-color="black" active-text-color="#00d1b2" unique-opened router>
            <SiderBarTree :items="items"></SiderBarTree>

        </el-menu>
    </div>
</template>

<script>
    import SiderBarTree from './SidebarTree'
    import bus from '../common/bus'
    import axios from 'axios'
    export default {
        components:{
            SiderBarTree
        },
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-house',
                        index: 'recommendation',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'documentComments',
                        title: '文件评论'
                    },
                    {
                        icon: 'el-icon-document',
                        index: '2',
                        title: '全部知识',
                        subs: [],
                        /*[
                            {
                                index: 'knowledge-1',
                                title: '编程语言',
                                subs: [
                                    {
                                        index: 'knowledge-1',
                                        title: '推荐',
                                    },
                                    {
                                        index: 'knowledge-2',
                                        title: 'C/C++',
                                    },
                                    {
                                        index: 'knowledge-3',
                                        title: 'java',
                                    },
                                    {
                                        index: 'knowledge-4',
                                        title: 'C#'
                                    },
                                    {
                                        index: 'knowledge-5',
                                        title: 'JavaScript'
                                    },
                                ]
                            },
                        ]*/

                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'knowledge-private',
                        title: '个人知识',
                        subs: []
                           /* {
                                index: 'knowledge-private-base',
                                title: '计算机基础'
                            },
                            {
                                index: '2-2',
                                title: '编程语言',
                                subs: [
                                    {
                                        index: 'knowledge-private-2',
                                        title: 'C/C++',
                                    },
                                    {
                                        index: 'knowledge-private-3',
                                        title: 'java',
                                    },
                                    {
                                        index: 'knowledge-private-4',
                                        title: 'C#'
                                    },
                                    {
                                        index: 'knowledge-private-5',
                                        title: 'JavaScript'
                                    },
                                ]
                            },
                        ]*/
                    },
                    {
                        icon: 'el-icon-upload2',
                        index: 'upload',
                        title: '文件上传'
                    },
                ]
            }
        },
        mounted() {
            axios.get("/IGSDN/listSimpleCategories").then((res) => {
               // console.log(res.data)
                let i = 0
               //console.log(res.data.children)




                this.items[2].subs = res.data[0].subs
                this.items[3].subs = res.data[1].subs
                //console.log(this.items)
                //console.log(this.items[2].subs[0].node.index)
                //console.log(this.items)

            }).catch((e) => {

            })
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
