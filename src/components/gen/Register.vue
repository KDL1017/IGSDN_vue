<template>
    <div id="small-dialog" class="book-form mfp-hide">
        <div id="register_loader" v-show="IsLoading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <h3>IGSDN用户注册</h3>
        <form method="post">
            <input type="text" name="Uname" placeholder="用户名（1-10个字符）" v-model="Uname">
            <input type="text" name="LoginName" class="email" placeholder="手机号或邮箱" v-model="LoginName">
            <input type="password" name="Password1" class="password" placeholder="密码" v-model="Password1">
            <input type="password" name="Password2" class="password" placeholder="重复密码" v-model="Password2">
            <span style="color:red; font-size: 14px" v-show="RegisterMsg">{{RegisterMsg}}</span>
            <input type="button" @click="register" value="点击注册">
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Register",
        data() {
            return {
                Uname: '',
                LoginName: '',
                Password1: '',
                Password2: '',
                RegisterMsg: '',
                IsLoading: false
            }
        },
        methods: {
            register() {
                const {Uname, LoginName, Password1, Password2} = this
                const MATCH_TEL_STRING = /^1[3456789]\d{9}$/
                const MATCH_EMAIL_STRING = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if (!Uname) {
                    this.RegisterMsg = '用户名不可为空！'
                } else if (Uname.length > 10) {
                    this.RegisterMsg = '用户名不能超过5个汉字或10个字符！'
                } else if (!LoginName) {
                    this.RegisterMsg = '请输入用户名！'
                } else if (!MATCH_TEL_STRING.test(LoginName) && !MATCH_EMAIL_STRING.test(LoginName)) {
                    this.RegisterMsg = '请输入正确的手机号或邮箱！'
                } else if (!Password1) {
                    this.RegisterMsg = '请输入密码！'
                } else if (!Password2) {
                    this.RegisterMsg = '请确认密码！'
                } else if (Password1 !== Password2) {
                    this.RegisterMsg = '两次密码不一致'
                } else {
                    this.RegisterMsg = ''
                    this.IsLoading = true;
                    axios.post('/IGSDN/genUser/register', {Uname, LoginName, Password1}).then((res) => {
                        this.IsLoading = false;
                        if (!res || res.data == null) {
                            alert('服务器连接失败，请检查您的网络连接是否正常！')
                        } else if (res.data == 0) {
                            alert('该用户已经注册！')
                        } else if (res.data == 1) {
                            this.$alert('若页面未跳转，请手动刷新该页面以登陆！', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    window.location.reload()
                                }
                            })
                        }
                        return
                    }).catch((error) => {
                        this.IsLoading = false
                        console.log(error)
                    })
                }
                return
            }
        }
    }
</script>

<style scoped>
    input[type="text"], input[type="password"] {
        width: 93.5%;
        padding: 15px;
        border: 1px solid #7d7d7d;
        outline: none;
        font-size: 14px;
        margin-bottom: 20px;
        border-radius: 25px;
    }

    #register_loader {
        position: absolute;
        left: 50%;
        top: 50%;
    }

    #register_loader span {
        display: block;
        bottom: 0px;
        width: 9px;
        height: 5px;
        background: #9b59b6;
        position: absolute;
        animation: register_loader 1.5s infinite ease-in-out;
    }

    #register_loader span:nth-child(2) {
        left: 11px;
        animation-delay: .2s;
    }

    #register_loader span:nth-child(3) {
        left: 22px;
        animation-delay: .4s;
    }

    #register_loader span:nth-child(4) {
        left: 33px;
        animation-delay: .6s;
    }

    #register_loader span:nth-child(5) {
        left: 44px;
        animation-delay: .8s;
    }

    @keyframes register_loader {
        0% {
            height: 5px;
            transform: translateY(0px);
            background: #9b59b6;
        }
        25% {
            height: 30px;
            transform: translateY(15px);
            background: #3498db;
        }
        50% {
            height: 5px;
            transform: translateY(0px);
            background: #9b59b6;
        }
        100% {
            height: 5px;
            transform: translateY(0px);
            background: #9b59b6;
        }
    }
</style>
