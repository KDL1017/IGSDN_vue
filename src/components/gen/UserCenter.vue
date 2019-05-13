<template>
    <div>
        <div style="">
            <el-tabs tab-position="right">
                <el-tab-pane label="个人信息"><UserCenterMessage></UserCenterMessage></el-tab-pane>
<!--                <el-tab-pane label="信息修改"><ChangePerson></ChangePerson></el-tab-pane>-->
                <el-tab-pane label="内存管理"><Memory></Memory></el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<script>
    // import ChangePerson from '../common/ChangePerson'
    import UserCenterMessage from './UserCenterMessage'
    import Memory from "./Memory"

    export default {
        name: "PersonalCenter",
        components: {
            // ChangePerson,
            UserCenterMessage,
            Memory
        },
        methods: {

        }

    }
</script>

<style scoped>

</style>