<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="white"
                 text-color="black" active-text-color="#00d1b2" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
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
    import bus from '../common/bus';

    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'recommendation',
                        title: '个性推荐'
                    },
                    {
                        icon: 'el-icon-document',
                        index: '2',
                        title: '知识分类',
                        subs: [
                            {
                                index: 'knowledge-base',
                                title: '计算机基础'
                            },
                            {
                                index: '2-2',
                                title: '编程语言',
                                subs: [
                                    {
                                        index: 'knowledge-pl-C',
                                        title: 'C'
                                    },
                                    {
                                        index: 'knowledge-pl-java',
                                        title: 'java'
                                    },
                                    {
                                        index: 'knowledge-pl-C#',
                                        title: 'C#'
                                    },
                                    {
                                        index: 'knowledge-pl-Kotlin',
                                        title: 'Kotlin'
                                    },
                                    {
                                        index: 'knowledge-pl-Python',
                                        title: 'Python'
                                    },
                                    {
                                        index: 'knowledge-pl-JavaScript',
                                        title: 'JavaScript'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-reading',
                        index: '3',
                        title: '个人知识',
                        subs: [
                            {
                                index: 'knowledge-private-base',
                                title: '计算机基础'
                            },
                            {
                                index: '2-2',
                                title: '编程语言',
                                subs: [
                                    {
                                        index: 'knowledge-private-pl-C',
                                        title: 'C'
                                    },
                                    {
                                        index: 'knowledge-private-pl-java',
                                        title: 'java'
                                    },
                                    {
                                        index: 'knowledge-private-pl-C#',
                                        title: 'C#'
                                    },
                                    {
                                        index: 'knowledge-private-pl-Kotlin',
                                        title: 'Kotlin'
                                    },
                                    {
                                        index: 'knowledge-private-pl-Python',
                                        title: 'Python'
                                    },
                                    {
                                        index: 'knowledge-private-pl-JavaScript',
                                        title: 'JavaScript'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-upload2',
                        index: 'upload',
                        title: '文件上传'
                    },
                ]
            }
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
