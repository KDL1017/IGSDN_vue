<template>
    <div>
        <el-card class="box-card"style="width:50%;margin:50px auto" >
            <div slot="header" class="clearfix">
                <span><h3>个人资料</h3></span>
            </div>
            <div  class="text item">
                <div style="line-style:none;">
                    <div>实名：{{userInfo.name}}</div>
                    <div>性别：{{userInfo.genter}}</div>
                    <div>用户名：{{userInfo.uname}}</div>
                    <div>年龄：{{userInfo.age}}</div>
                    <div>手机号：{{userInfo.tel}}</div>
                    <div>邮箱：{{userInfo.email}}</div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from '_axios@0.18.0@axios/index'

    export default {
        name: "UserCenterMessage",
        data() {
            return {
                userInfo: {
                    name: '',
                    tel: '',
                    email: '',
                    uname: '',
                    genter: '',
                    age: ''

                }
            }
        },
        mounted() {
            let t_user = localStorage.getItem("t_user")
            let user_msg = localStorage.getItem("user_msg")
            axios.post('/IGSDN//genUser/updateUserInfo', user_msg.loginName).then((res) => {
                this.userInfo.name = res.data.name
                this.userInfo.uname = res.data.uname
                this.userInfo.age = res.data.age
                this.userInfo.email = res.data.email
                this.userInfo.genter = res.data.genter
                this.userInfo.tel = res.data.tel
            })
        }
    }
</script>

<style scoped>


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