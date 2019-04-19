<template>
  <div id="small-dialog" class="book-form mfp-hide">
    <h3>IGSDN用户注册</h3>
    <form method="post">
      <input type="text" name="Uname" placeholder="用户名" v-model="Uname">
      <input type="text" name="LoginName" class="email" placeholder="手机号或邮箱" v-model="LoginName">
      <input type="password" name="Password1" class="password" placeholder="密码" v-model="Password1">
      <input type="password" name="Password2" class="password" placeholder="重复密码" v-model="Password2">
      <span v-show="isInputMsg">{{isInputMsg}}</span>

      <input type="button" @click="register" value="点击注册">
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  import PubSub from 'pubsub-js'

  export default {
    name: "GenUser_regist",
    data() {
      return {
        Uname: '',
        LoginName: '',
        Password1: '',
        Password2: '',
        //是否填入信息
        isInputMsg: '',

      }
    },
    methods: {
      register() {
        this.isInputMsg = ''
        const Uname = this.Uname.trim()
        const Loginname = this.LoginName.trim()
        const Password1 = this.Password1.trim()
        const Password2 = this.Password2.trim()
        const REGEX_MOBILE = /^1[3456789]\d{9}$/
        const REGEX_EMAIL = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (Uname.length > 10) {
          this.isInputMsg = '用户名不能超过5个汉字或10个字符'
        } else {
          if (REGEX_MOBILE.test(Loginname) || REGEX_EMAIL.test(Loginname)) {
            if (!Uname && !Loginname && !Password1 && !Password2) {
              this.isInputMsg = '请输入完整信息'
            } else {
              if (Password1 !== Password2) {
                this.isInputMsg = '密码不一致'
              } else {
                this.isInputMsg = ''
                const url = 'http://localhost:8080/IGSDN/genUser/register'
                axios.post(url, {Uname, Loginname, Password1}).then((res) => {
                  if (res.data === 1) {
                    alert('注册成功')
                    // 传到login组件中，回显刚刚注册的 loginName

                    window.href = "http://localhost:8080/IGSDN/genUser/login";
                    alert('页面没跳转')
                  } else if (res.data === 2) {
                    alert('已经注册')
                  } else if (res.data === 0) {
                    alert('注册失败')
                  }
                }).catch((error) => {
                  this.isInputMsg = '连接失败'
                })
              }
            }
          } else {
            this.isInputMsg = "手机邮箱格式不对"
          }
        }
        return
      }

    },


  }
</script>

<style scoped>

</style>
