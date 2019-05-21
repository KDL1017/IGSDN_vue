<template>
    <div>
        <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>个人资料</span>
                <el-button style="float: right;font-size: 14px" type="text" @click="toUpdate">修改资料</el-button>
            </div>
            <table style="font-size: 16px; width: 100%">
                <tr>
                    <td style="width: 60px">昵称：
                    </td>
                    <td style="width: auto">{{userInfo.uname}}</td>
                    <td style="width: 30px"></td>
                </tr>
                <tr>
                    <td>手机：</td>
                    <td :style="{color:(userInfo.tel ? '#000':'#F56C6C')}">
                        {{userInfo.tel?userInfo.tel:'未绑定'}}
                    </td>
                    <td>
                        <el-button type="primary" icon="el-icon-edit" size="mini" circle
                                   @click="bindingUserLoginName('tel')"></el-button>
                    </td>
                </tr>
                <tr>
                    <td>邮箱：</td>
                    <td :style="{color:(userInfo.email?'#000':'#F56C6C')}">
                        {{userInfo.email?userInfo.email:'未绑定'}}
                    </td>
                    <td>
                        <el-button type="primary" icon="el-icon-plus" size="mini" circle
                                   @click="bindingUserLoginName('email')"></el-button>
                    </td>
                </tr>
                <tr>
                    <td>姓名：</td>
                    <td>{{userInfo.name}}</td>
                </tr>
                <tr>
                    <td>年龄：</td>
                    <td>{{userInfo.age}}</td>
                </tr>
                <tr>
                    <td>性别：</td>
                    <td>{{userInfo.gender}}</td>
                </tr>
            </table>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "UserCenterMessage",
        data() {
            return {
                userInfo: {
                    uname: '张三的昵称',
                    tel: '13789839972',
                    email: null,
                    name: '张三',
                    gender: '男',
                    age: '23'
                }
            }
        },
        mounted() {
            // localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
            let t_user = localStorage.getItem("t_user")
            let user_msg = JSON.parse(localStorage.getItem('user_msg'))
            let loginName = user_msg.id
            // let loginName = t_user? t_user:user_msg
            axios.get('/IGSDN/genUser/selectUserInfo/' + loginName).then((res) => {
                console.log(res.data)
                this.userInfo.name = res.data.name
                this.userInfo.uname = res.data.uname
                this.userInfo.age = res.data.age
                this.userInfo.gender = res.data.gender
                this.userInfo.email = res.data.email
                this.userInfo.tel = res.data.tel
                localStorage.setItem("userInfo", this.userInfo)
                this.userInfo.email = this.userInfo.email ? this.userInfo.email : '未绑定'
                this.userInfo.tel = this.userInfo.tel ? this.userInfo.tel : '未绑定'
            }).catch(()=>{
                this.$message({
                    type: 'error',
                    message: '修改失败，请检查网络连接!'
                })
            })
        },
        methods: {
            toUpdate() {
                this.$router.push('/genUser/changePerson')
            },
            bindingUserLoginName(type) {
                let msg = ""
                let inputPattern = ""
                if (type == "email") {
                    msg = "请输入邮箱"
                    inputPattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                } else if (type == "tel") {
                    msg = "请输入手机号"
                    inputPattern = /^1[3456789]\d{9}$/
                }
                this.$prompt(msg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '关闭',
                    inputPattern: inputPattern,
                    inputErrorMessage: '输入格式不正确'
                }).then(({newValue}) => {
                    this.$message({
                        type: 'success',
                        message: '你的邮箱是: ' + newValue
                    });
                }).catch(() => {

                });
            }
        }
    }
</script>

<style scoped>
    table td {
        height: 45px;
    }

    table .title {
        width: 40px;
    }

    table .content {
        width: 200px;
    }

    .clearfix {
        font-size: 25px
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
        width: 60%;
        margin: 50px auto;
    }
</style>