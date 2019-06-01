<template>
    <div style="width:50%;margin:50px auto">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改密码</span>
            </div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="原密码" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPass">
                    <el-input type="password" v-model="ruleForm.confirmPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "ChangePassword",
        data() {
            let validateOldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原密码'));
                } else {
                    callback();
                }
            }
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.ruleForm.confirmPass !== '') {
                        this.$refs.ruleForm.validateField('confirmPass');
                    }
                    callback();
                }
            }
            let validateConfirmPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                checkResult: false,
                ruleForm: {
                    oldPass: '',
                    pass: '',
                    confirmPass: '',
                },
                rules: {
                    oldPass:
                        [{validator: validateOldPass, trigger: 'blur'}],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    confirmPass: [
                        {validator: validateConfirmPass, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let userId = JSON.parse(localStorage.getItem('user_msg')).id
                        // let loginName = t_user? t_user:user_msg
                        let oldPass = this.ruleForm.oldPass
                        let pass = this.ruleForm.pass
                        axios.put('/IGSDN/genUser/updatePassword/' + userId, {oldPass, pass}).then((res) => {
                            if (res.data) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                })
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '原密码错误!'
                                })
                            }
                        }).catch(() => {
                            this.$message({
                                type: 'error',
                                message: '修改失败，请检查网络连接!'
                            })
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }


</script>

<style scoped>

</style>