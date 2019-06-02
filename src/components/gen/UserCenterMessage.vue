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
                        <el-button type="primary" :icon="userInfo.tel?'el-icon-edit':'el-icon-plus'" size="mini" circle
                                   @click="bindingUserLoginName('tel')"></el-button>
                    </td>
                </tr>
                <tr>
                    <td>邮箱：</td>
                    <td :style="{color:(userInfo.email?'#000':'#F56C6C')}">
                        {{userInfo.email?userInfo.email:'未绑定'}}
                    </td>
                    <td>
                        <el-button type="primary" :icon="userInfo.email?'el-icon-edit':'el-icon-plus'" size="mini"
                                   circle
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
                    <td>{{userInfo.gender?"男":"女"}}</td>
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
                userId: null,
                userInfo: {
                    uname: '',
                    tel: '',
                    email: '',
                    name: '',
                    gender: '',
                    age: ''
                }
            }
        },
        mounted() {
            this.userId = JSON.parse(localStorage.getItem('user_msg')).id
            const userId = this.userId
            // let loginName = t_user? t_user:user_msg
            axios.get('/IGSDN/genUser/selectUserInfo/' + userId).then((res) => {
                this.userInfo.name = res.data.name
                this.userInfo.uname = res.data.uname
                this.userInfo.age = res.data.age
                this.userInfo.gender = res.data.gender
                this.userInfo.email = res.data.email
                this.userInfo.tel = res.data.tel
            }).catch(() => {
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
                let tel = ""
                let email = ""
                const userId = this.userId
                if (type == "email") {
                    msg = "请输入邮箱"
                    inputPattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                } else if (type == "tel") {
                    msg = "请输入手机号"
                    inputPattern = /^1[3456789]\d{9}$/
                }
                this.$prompt(msg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: inputPattern,
                    inputErrorMessage: '输入格式不正确'
                }).then(({value}) => {
                    console.log(value)
                    if (type == "email") {
                        email = value
                    } else if (type == "tel") {
                        tel = value
                    }
                    axios.put("/IGSDN/genUser/updateLoginName", {userId, tel, email}).then((res) => {
                        if (res.data) {
                            this.$message({
                                type: 'success',
                                message: '绑定成功'
                            });
                            if (type == "email") {
                                this.userInfo.email = value
                            } else if (type == "tel") {
                                this.userInfo.tel = value
                            }
                        } else {
                            this.$message({
                                type: 'error',
                                message: '绑定失败'
                            });
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'error',
                            message: '服务器错误'
                        });
                    })
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