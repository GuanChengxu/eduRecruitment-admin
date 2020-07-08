<template>
  <div class="he_box" ref="he_box">
    <div class="bgColor clearfix">
      <div class="title fl">烟台市教育系统招聘后台管理</div>
      <div class="login_box fr">
        <div class="isLogin clearfix">
          <img src="@/assets/user.png" alt="">
          <div class="he_login">
            <span class="name fl">
              {{userName}}
            </span>
            <span class="signOut fl" @click="exitUser()">
              退出
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['showBack'],
    data() {
      return {
        userName: '',
        header_title: '',
      }
    },
    created() {},
    mounted() {
      this.userName = localStorage.getItem("name");
      this.header_title = localStorage.getItem('header_title');
    },
    methods: {
      back() {
        this.$router.replace('/index');
      },
      exitUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('grade');
        localStorage.removeItem('name');
        this.$router.replace('/');
      }
    },
  }
</script>

<style lang="scss" scoped>
  .he_box {
    background-color: #436EF3;

    .bgColor {
      margin: 0 auto;

      .title-back {
        float: left;
        width: 8px;
        height: 16px;
        margin-left: 18px;
        margin-top: 21px;
      }

      .backtitle {
        font-size: 16px;
        height: 57px;
        line-height: 57px;
        font-weight: 400;
        color: #FFFFFF;
        margin-left: 10px;
      }

      .title {
        font-size: 16px;
        height: 57px;
        line-height: 57px;
        font-weight: 400;
        color: #FFFFFF;
        margin-left: 37px;
      }

      .login_box {
        margin-right: 13px;

        .isLogin {
          img {
            width: 13px;
            height: 13px;
            margin-right: 9px;
            float: left;
            margin-top: 22px;
          }

          .he_login {
            float: right;

            .name {
              font-size: 13px;
              height: 57px;
              line-height: 57px;
              font-weight: 400;
              color: #FFFFFF;
            }

            .signOut {
              font-size: 13px;
              height: 57px;
              line-height: 57px;
              font-weight: 400;
              color: #FFFFFF;
              margin-left: 17px;
              cursor: pointer;
              opacity: 0.7;
            }
          }
        }
      }
    }
  }
</style>
