<template>
    <div id="app">
        <div class="w3layouts ">
            <div class="signin-agile">
                <h2>登录
                </h2>
                <form>
                    <input type="text" name="loginName" class="loginName" placeholder="手机号或邮箱" v-model="loginName">
                    <input type="password" name="password" class="password" placeholder="密码" v-model="password">
                    <a href="#">忘记密码?</a><br>
                    <div class="clear" style="color:red; font-size: 14px" v-show="msg">{{msg}}</div>
                    <div id="login_loader" v-show="isLoading">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <input type="button" value="登录" @click="checkLogin">
                    <div class="goSignup" @click="goSignup"
                         style="float: right;color:#7d7d7d;font-size: 14px;margin-top:15px;cursor: pointer">
                        去注册>>
                    </div>
                </form>
            </div>
            <div class="signup signup-agileinfo">
                <h3 class="goSignup" style="color:#ffffff;cursor: pointer">用户须知</h3>
                <p style="height: 120px; overflow-y:scroll; overflow-x:hidden;">
                    <b>一、服务条款说明</b><br>
                    本平台内各项电子服务的所有权和运作权归本平台所有。本平台提供的服务将完全按照其发布的服务条款和操作规则严格执行。<br>
                    <b>二、注册须知</b><br>
                    在进行注册时请填写您的真实信息，我们会进行核对，若出现异常，您的账号可能会被系统封停。
                </p>
                <div class="more">
                    <a class="book popup-with-zoom-anim button-isi zoomIn animated" data-wow-delay=".5s"
                       href="#small-dialog">点击注册</a>
                    <br><br>
                    <div class="goSignin" @click="goSignin" style="color:#dfdfdf;font-size: 14px;cursor: pointer"><<
                        返回登陆
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="pop-up">
            <Register/>
        </div>

        <div class="footer-w3l">
            <p class="agileinfo"> &copy;IGSDN版权所有
            </p>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import Register from './Register'
    import {jquery} from '../../assets/js/jquery.min'
    import popup from '../../assets/js/jquery.magnific-popup'

    export default {
        components: {
            Register
        },
        created() {
            $(document).ready(function () {
                $('.popup-with-zoom-anim').magnificPopup({
                    type: 'inline',
                    fixedContentPos: false,
                    fixedBgPos: true,
                    overflowY: 'auto',
                    closeBtnInside: true,
                    preloader: false,
                    midClick: true,
                    removalDelay: 300,
                    mainClass: 'my-mfp-zoom-in'
                })
            })
        },
        data() {
            return {
                loginName: null,
                password: null,
                msg: '',
                isLoading: false
            }
        },
        methods: {
            goSignup() {
                let scrollHeight = $("body").prop("scrollHeight")
                $("html,body").animate({scrollTop: scrollHeight}, 800)
            },
            goSignin() {
                $("html,body").animate({scrollTop: 0}, 800)
            },
            checkLogin() {
                this.$router.push("/genUser")
                const {loginName, password} = this
                if (loginName && password) {
                    this.isLoading = true
                    axios.post('/IGSDN/genUser/checkLogin', {loginName, password}).then((res) => {
                        this.isLoading = false
                        if (res.data) {
                            this.msg = ''
                            localStorage.setItem("t_user", "gen")
                            localStorage.setItem("user_msg", JSON.stringify(res.data))
                            console.log(res.data)
                            this.$router.push("/")
                        } else {
                            this.msg = '用户名或密码错误！'
                        }
                    }).catch((err) => {
                        this.isLoading = false
                        this.msg = '服务器请求超时，请检查网络连接！'
                    })
                } else {
                    this.msg = '用户名或密码不能为空！'
                }
            }
        }
    }
</script>

<style scoped>
    @import url('../../assets/css/login.css');
    @import url('../../assets/css/popup-box.css');

    input[type="text"], input[type="password"] {
        width: 93.5%;
        padding: 15px;
        border: 1px solid #7d7d7d;
        outline: none;
        font-size: 14px;
        margin-bottom: 20px;
        border-radius: 25px;
    }

    #login_loader {
        position: relative;
        display: inline-block;
        vertical-align: middle;
    }

    #login_loader span {
        display: block;
        bottom: 0px;
        width: 9px;
        height: 5px;
        background: #9b59b6;
        position: absolute;
        animation: login_loader 1.5s infinite ease-in-out;
    }

    #login_loader span:nth-child(2) {
        left: 11px;
        animation-delay: .2s;
    }

    #login_loader span:nth-child(3) {
        left: 22px;
        animation-delay: .4s;
    }

    #login_loader span:nth-child(4) {
        left: 33px;
        animation-delay: .6s;
    }

    #login_loader span:nth-child(5) {
        left: 44px;
        animation-delay: .8s;
    }

    @keyframes login_loader {
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

