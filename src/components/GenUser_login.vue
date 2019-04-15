<template>
  <div>
    <div class="w3layouts">
      <div class="signin-agile">
        <h2>登录
        </h2>
        <form>
          <input type="text" name="loginName" class="loginName" placeholder="手机号或邮箱" v-model="loginName">
          <input type="password" name="password" class="password" placeholder="密码" v-model="password">
          <a href="#">忘记密码?</a><br>
          <div class="clear" style="color:red; font-size: 14px">{{msg}}</div>
          <input type="button" value="登录" @click="checkLogin">
          <div class="goSignup" style="float: right;color:#7d7d7d;font-size: 14px;margin-top:15px;cursor: pointer">
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
          <div class="goSignin" style="color:#dfdfdf;font-size: 14px;cursor: pointer"><< 返回登陆</div>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <div class="pop-up">
      <div id="small-dialog" class="book-form mfp-hide">
        <h3>IGSDN用户注册</h3>
        <form action="" method="post">
          <input type="text" name="Username" placeholder="用户名" required="">
          <input type="text" name="Email" class="email" placeholder="邮件" required="">
          <input type="password" name="Password" class="password" placeholder="密码" required="">
          <input type="password" name="Password" class="password" placeholder="重复密码" required="">
          <input type="submit" value="点击注册">
        </form>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from '_axios@0.18.0@axios/index'

  export default {
    data() {
      return {
        loginName: null,
        password: null,
        msg: '',
      }
    },
    methods: {
      checkLogin() {
        const {loginName, password} = this
        if (loginName && password) {
          axios.post('cgenUser/checkLogin', {loginName, password}).then((res) => {
            console.log(res)
            if (res.data) {
              this.msg = ''
              window.location.href = "http://localhost:8080/IGSDN/genUser/index";
            } else {
              this.msg = '用户名或密码错误！'
            }
          }).catch((err) => {
            this.msg = '请检查网络连接！'
          })
        } else {
          this.msg = '用户名或密码不能为空！'
        }

      }
    }
  }
</script>

<style>
</style>

