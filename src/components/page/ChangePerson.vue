<template>
    <div style="margin:80px auto; width: 60%">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改用户信息</span>
                <el-button style="float: right; padding: 2px 0" type="text" @click="goBack">返回</el-button>
            </div>
            <el-form :model="personValidateForm" ref="personValidateForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="真实姓名" prop="name" :rules="[ { required: true, message: '真实姓名不能为空'}]">
                    <el-input type="name" v-model="personValidateForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名称" prop="uname" :rules="[ { required: true, message: '用户名不能为空'}]">
                    <el-input type="uname" v-model="personValidateForm.uname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender" :rules="[{ required: true, message: '性别不能为空'}]">
                    <el-radio-group type="gender" v-model="personValidateForm.gender" autocomplete="off">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄" prop="age"
                              :rules="[{ required: true, message: '年龄不能为空'},{ type: 'number', message: '年龄必须为数字值'}]">
                    <el-input type="age" v-model.number="personValidateForm.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('personValidateForm')">提交信息</el-button>
                    <el-button @click="goBack">返回上级</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "ChangePerson",
        mounted() {
            this.userId = JSON.parse(localStorage.getItem('user_msg')).id
            axios.get('/IGSDN/genUser/selectUserInfo/' + this.userId).then((res) => {
                this.personValidateForm.name = res.data.name
                this.personValidateForm.uname = res.data.uname
                this.personValidateForm.age = parseInt(res.data.age)
                this.personValidateForm.gender = res.data.gender ? "男" : "女"
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '修改失败，请检查网络连接!'
                })
            })
        },
        data() {
            return {
                userId: null,
                personValidateForm: {
                    uname: '',
                    name: '',
                    gender: '',
                    age: '',
                }
            };
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            submitForm(formName) {
                let personValidateForm = this.personValidateForm
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('此操作将修改你的个人信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            axios.put('/IGSDN/genUser/updateUserInfo/' + this.userId, personValidateForm).then((res) => {
                                if (res.data)
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功!'
                                    })
                                this.$router.push('userCenter')
                            }).catch(() => {
                                this.$message({
                                    type: 'error',
                                    message: '修改失败，请检查网络连接!'
                                })
                                this.$router.push('userCenter')
                            })

                        }).catch(() => {

                        })
                    } else {
                        return false;
                    }
                });
            },
            goBack() {
                this.$router.go(-1);
            },
        }
    }
</script>

<style scoped>

</style>