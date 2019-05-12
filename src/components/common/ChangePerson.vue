<template>
    <div style="margin:50px 200px">
        <el-form :model="personValidateForm" ref="personValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="真实姓名" prop="name" :rules="[ { required: true, message: '真实姓名不能为空'}]">
                <el-input type="name" v-model="personValidateForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户名称" prop="uname" :rules="[ { required: true, message: '用户名不能为空'}]">
                <el-input type="name" v-model="personValidateForm.uname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="genter">
                <el-radio-group type="genter" v-model="personValidateForm.genter" autocomplete="off">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄" prop="age"
                          :rules="[{ required: true, message: '年龄不能为空'},{ type: 'number', message: '年龄必须为数字值'}]">
                <el-input type="age" v-model.number="personValidateForm.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tel"
                          :rules="[{ required: true, message: '手机号不能为空'},{ type: 'number', message: '手机号必须为数字值'}]">
                <el-input type="tel" v-model.number="personValidateForm.tel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱"
                          :rules="[ { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                <el-input v-model="personValidateForm.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('personValidateForm')">提交信息</el-button>
                <el-button @click="resetForm('personValidateForm')">重置信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "ChangePerson",
        data() {
            return {
                personValidateForm: {
                    uname:'',
                    name: '',
                    genter: '',
                    age: '',
                    tel: '',
                    email: ''
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
                            axios.post('/IGSDN//genUser/transformUserInfo', personValidateForm).then((res) => {
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
        }
    }
</script>

<style scoped>

</style>