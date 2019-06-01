<template>
    <div class="sidebar">
        <!-- 前台遍历是自己循环-->
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="white"
                 text-color="black" active-text-color="#00d1b2" unique-opened router>
            <template v-for="item in items">
                <el-submenu :index="item.index" :key="item.index" v-if="item.subs && item.subs.length > 0">
                    <template slot="title">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </template>
                    <template>
                        <SidebarTree :items="item.subs"></SidebarTree>
                    </template>
                </el-submenu>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import SidebarTree from './SidebarTree'
    import bus from '../common/bus'
    import axios from 'axios'

    export default {
        components: {
            SidebarTree
        },
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-house',
                        index: 'recommendation',
                        title: '个人首页'
                    },
                    {
                        icon: 'el-icon-news',
                        index: 'knowledge',
                        title: '全部知识',
                        subs: [],
                    },
                    {
                        icon: 'el-icon-document',
                        index: 'knowledge-private',
                        title: '个人知识',
                        subs: []
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
            axios.get("/IGSDN/getAllCategoryTree").then((res) => {
                this.items[1].subs = res.data[0]
                this.items[2].subs = res.data[1]
            }).catch((err) => {

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
