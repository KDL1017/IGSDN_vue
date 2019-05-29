<template>
    <div >
        <template v-for="item in items" >
            <template v-if="item.subs">
                <el-submenu :index="item.index" :key="item.index" unique-opened router>
                    <template slot="title">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </template>
                  <!-- <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>-->
                    <SiderBarTree :items="item.subs"></SiderBarTree>


                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.index" :key="item.index" unique-opened router>
                    <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </template>
        </template>
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