<template>
  <div class="he_box" ref="he_box">
    <div class="bgColor clearfix">
      <img v-if="grade == '' || grade == null || grade == 'null'" @click="back()" class="title-back" src="../assets/back.png" style="cursor: pointer;"/>
      <div v-if="grade == '' || grade == null || grade == 'null'" @click="back()" class="backtitle fl" style="cursor: pointer;">{{header_title}}</div>
      <div v-else-if="grade != '' || grade != null || grade != 'null'" class="title fl">{{header_title}}</div>
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
  import qs from 'qs'
  const axios = require('axios');
  export default {
    data() {
      return {
        userName: '',
        header_title: '',
        detailDto: {
          'applyId': ''
        },
        grade: ''
      }
    },
    created() {},
    mounted() {
      this.userName = localStorage.getItem("name");
      this.detailDto.applyId = localStorage.getItem('applyId');
      this.grade = localStorage.getItem('grade');
      if (this.detailDto.applyId != null) {
        this.getDetail();
      }
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
      },
      getDetail() {
        var that = this;
        axios({
          method:'post',
          url:'http://154.8.201.198:8081/edu/eduRear/eduApplySet/applyById',
          data: qs.stringify(that.detailDto),
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              that.header_title = res.data.data.recruitTheme;
            } else if (res.data.code == 500) {
              if (res.data.msg == '您的Session时效性已过，请重新登录!') {
                that.$message(res.data.msg);
                localStorage.removeItem('token');
                that.$router.replace('/');
              } else {
                that.$message(res.data.msg);
              }
            }
          }
        })
        .catch(function () {
          that.$message('失败');
        });
      }
    },
  }
</script>

<style lang="scss" scoped>
  .he_box {
    background-color: #436EF3;

    .bgColor {
      width: 100vw;
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
