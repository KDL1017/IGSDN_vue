<template>
    <div style="margin:50px 200px">
        <el-form :model="personValidateForm" ref="personValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="真实姓名" prop="name" :rules="[ { required: true, message: '真实姓名不能为空'}]">
                <el-input type="name" v-model="personValidateForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户名称" prop="uname" :rules="[ { required: true, message: '用户名不能为空'}]">
                <el-input type="name" v-model="personValidateForm.uname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
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
                <el-button type="danger" @click="resetForm('personValidateForm')">重置信息</el-button>
                <el-button @click="goBack">返回上级</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "ChangePerson",
        mounted() {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"))
            this.personValidateForm.uname = userInfo.uname
            this.personValidateForm.name = userInfo.name
            this.personValidateForm.gender = userInfo.gender
            this.personValidateForm.age = parseInt(userInfo.age)
        },
        data() {
            return {
                personValidateForm: {
                    uname: '',
                    name: '',
                    gender: '',
                    age: '',
                }
            };
        },
        methods: {
            submitForm(formName) {
                let personValidateForm = this.personValidateForm
                this.$refs[formName].validate((valid) => {


                    if (valid) {

                        this.$confirm('此操作将修改你的个人信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            axios.put('/IGSDN/genUser/transformUserInfo', personValidateForm).then((res) => {
                                if (res.data == true)
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功!'
                                    })
                                this.$router.push('userCenter');
                            })

                        }).catch(() => {

                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            goBack() {
                this.$router.go(-1);
            },
        }
    }
</script>

<style scoped>

</style>