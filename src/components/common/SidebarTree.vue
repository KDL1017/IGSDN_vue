<template>
    <div>
        <div v-for="item in items">
            <el-submenu v-if="item.subs && item.subs.length!=0" :index="item.index" :key="item.index" unique-opened
                        router>
                <template slot="title">
                    <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                </template>
                <el-menu-item :index="item.index" :key="item.index" unique-opened router>
                    <i :class="item.icon"></i><span slot="title">全部</span>
                </el-menu-item>
                <SidebarTree :items="item.subs"></SidebarTree>
            </el-submenu>
            <el-menu-item v-else :index="item.index" :key="item.index" unique-opened router>
                <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </el-menu-item>
        </div>
    </div>
</template>

<script>
    import bus from '../common/bus'

    export default {
        name: "SidebarTree",
        props: ['items'],

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

</style>