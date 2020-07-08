<template>
  <div class="login">
    <!-- 居中登录div -->
    <div ref="logindiv_height" class="login-div">
      <!-- 标题 -->
      <div class="title-div">
        <span class="title">烟台市教育系统事业单位公开招聘后台管理</span>
      </div>
      <div>
        <!-- 左边图片 -->
        <img class="login-img" src="../assets/login_image.png" />
        <!-- 右边登录框 -->
        <div class="login-box">
          <!-- 账号 -->
          <div class="input-box">
            <div class="input-title">
              <span class="input-span">账号</span>
            </div>
            <input class="login-input" type="text" v-model="username" @keyup.enter="login()"/>
          </div>
          <!-- 密码 -->
          <div class="input-box">
            <div class="input-title">
              <span class="input-span">密码</span>
            </div>
            <input class="login-input" type="password" v-model="password" @keyup.enter="login()"/>
          </div>
          <!-- 登录按钮 -->
          <button class="input-button" @click="login()">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  const axios = require('axios');
  export default {
    data() {
      return {
        top: '', //居中登录div的top
        clientHeight: 0, //屏幕高度
        username: '', //用户名
        password: '', //密码
        data: {
          'name': '',
          'password': ''
        }
      }
    },
    created() {},
    mounted() {
      this.clientHeight = this.$el.clientHeight;
      let height = this.$refs.logindiv_height.offsetHeight;
      this.top = ((this.clientHeight - height) / 2) + 'px';
    },
    methods: {
      login() {
        var that = this;
        if (that.username == '' || that.password == '') {
          that.$message('账号密码不能为空');
        } else {
          that.data.name = that.username;
          that.data.password = that.password;
          axios({
            method:'post',
            url:'http://154.8.201.198:8081/edu/eduRear/user/login',
            data: qs.stringify(that.data),
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.$message('登录成功');
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('grade',res.data.eduUser.grade);
                localStorage.setItem('name',res.data.eduUser.name);
                localStorage.setItem('unitId',res.data.eduUser.unitId);
                localStorage.setItem('unitName',res.data.eduUser.unitName);
                that.$router.replace('/index');
              } else {
                that.$message(res.data.msg);
              }
            }
          })
          .catch(function () {
            that.$message('账号或密码错误');
          });
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .login {
    background-image: url(../assets/login_background_image.jpg);
    background-size: cover;
    width: 100vw;
    height: 100vh;
    position: fixed;
  }

  .login-div {
    width: 1090px;
    height: 626px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 4px 16px 2px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
    position: absolute;
    bottom: 50%;
    right: 50%;
    margin-right: -545px;
    margin-bottom: -313px;
  }

  .title-div {
    margin-top: 88px;
    margin-left: 83px;
    font-weight: bold;
  }

  .title {
    font-size: 48px;
    color: #2878FF;
  }

  .login-img {
    width: 367px;
    height: 315px;
    float: left;
    margin-top: 55px;
    margin-left: 67px;
  }

  .login-box {
    width: 340px;
    height: 262px;
    float: right;
    margin-top: 77px;
    margin-right: 117px;
  }

  .input-box {
    width: 340px;
    height: 79px;
  }

  .login-input {
    width: 340px;
    height: 39px;
    line-height: 39px;
    padding-left: 7px;
    font-size: 18px;
    color: #333333;
    border-bottom: 1px solid #BDBDBD;
  }

  .input-title {
    padding-top: 23px;
    margin-left: 7px;
  }

  .input-span {
    font-size: 18px;
    color: #2878FF;
  }

  .input-button {
    width: 340px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 21px;
    color: #FFFFFF;
    background: #2878FF;
    border-radius: 5px;
    margin-top: 54px;
    border: none;
  }

  button:after {
    border: none;
  }

  @media screen and (max-width: 1600px) {
    .login-div {
      width: 775px;
      height: 445px;
      background: rgba(255, 255, 255, 0.7);
      box-shadow: 0 4px 16px 2px rgba(0, 0, 0, 0.1);
      border-radius: 7px;
      position: absolute;
      bottom: 50%;
      right: 50%;
      margin-right: -387.5px;
      margin-bottom: -222.5px;
    }

    .title-div {
      margin-top: 63px;
      margin-left: 59px;
      font-weight: bold;
    }

    .title {
      font-size: 34px;
      color: #2878FF;
    }

    .login-img {
      width: 261px;
      height: 221px;
      float: left;
      margin-top: 39px;
      margin-left: 48px;
    }

    .login-box {
      width: 242px;
      height: 186px;
      float: right;
      margin-top: 52px;
      margin-right: 83px;
    }

    .input-box {
      width: 242px;
      height: 56px;
    }

    .login-input {
      width: 242px;
      height: 30px;
      line-height: 30px;
      padding-left: 6px;
      font-size: 13px;
      color: #333333;
      border-bottom: 1px solid #BDBDBD;
    }

    .input-title {
      padding-top: 14px;
      margin-left: 4px;
    }

    .input-span {
      font-size: 13px;
      color: #2878FF;
    }

    .input-button {
      width: 242px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-size: 15px;
      color: #FFFFFF;
      background: #2878FF;
      border-radius: 4px;
      margin-top: 38px;
      border: none;
    }
  }

</style>
