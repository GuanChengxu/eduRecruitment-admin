<template>
  <div>
    <div ref="right_box" class="right-box" >
      <div class="" style="min-height: 366px;">
        <!-- 标题box -->
        <div class="right-title-box">
          <!-- 标题竖线 -->
          <div class="right-title-line"></div>
          <!-- 标题 -->
          <div class="right-title">招聘列表</div>
          <!-- 按钮 -->
          <button class="rb-title-button" style="cursor: pointer;" @click="showAddPopup()">创建新的招聘</button>
        </div>
        <!-- 列表名称box -->
        <div class="rb-list-title-box">
          <div class="rb-list-title title-number">序号</div>
          <div class="rb-list-title title-theme">主题</div>
          <div class="rb-list-title title-state">招聘报名状态</div>
          <div class="rb-list-title title-quantity">职位数量</div>
          <div class="rb-list-title title-peoples">报名人数</div>
          <div class="rb-list-title title-audit">待审核</div>
          <div class="rb-list-title title-show">招聘前台显示</div>
          <div class="rb-list-title title-operation">操作</div>
        </div>
        <!-- 列表详情 -->
        <div class="rb-list-detail-box clearfix" v-for="(rm,rmidx) in rmData" :key='rmidx'>
          <!-- 序号 -->
          <div class="rb-list-detail title-number">{{rmidx + 1 + ((rmListDto.pageNum - 1) * rmListDto.pageSize)}}</div>
          <!-- 主题 -->
          <div class="rb-list-detail title-theme" style="cursor: pointer;" @click="goRecruitmentDetail(rm.applyId,rm.createBy)">{{rm.recruitTheme}}</div>
          <!-- 招聘报名状态 -->
          <div class="rb-list-detail title-state" v-if="rm.applyStatus == 0">未开始</div>
          <div class="rb-list-detail title-state" v-if="rm.applyStatus == 1">报名中</div>
          <div class="rb-list-detail title-state" v-if="rm.applyStatus == 2">已结束</div>
          <!-- 职位数量 -->
          <div class="rb-list-detail title-quantity">{{rm.jobNum}}</div>
          <!-- 报名人数 -->
          <div class="rb-list-detail title-peoples">{{rm.peopleNum}}</div>
          <!-- 待审核 -->
          <div class="rb-list-detail title-audit">{{rm.auditNum}}</div>
          <!-- 待审核 -->
          <div class="rb-list-detail title-show">
            <el-switch v-model="rm.isShow" active-color="#B1B1B1" inactive-color="#436EF3" active-value="0" inactive-value="1"></el-switch>
            <div @click="showPopup(rm)" style="width: 100%;height: 28px;position: absolute;top: 0;left: 0;z-index: 99999;"></div>
          </div>
          <!-- 操作 -->
          <div class="rb-list-detail title-operation">
              <span style="cursor: pointer;" @click="goRecruitmentDetail(rm.applyId,rm.createBy)">查看详情</span>
              <span style="margin: 0 14px;cursor: pointer;" @click="showUpdatePopup(rm.applyId,rm.recruitTheme)">修改招聘主题</span>
              <span style="cursor: pointer;" @click="deleteRecruitment(rm.applyId)">删除</span>
          </div>
        </div>

      </div>
      <!-- 分页 -->
      <div class="rb-paging">
        <el-pagination small layout="prev, pager, next" :total="total" :page-size="15" @current-change='handleCurrentChange'></el-pagination>
      </div>
    </div>
    <!-- 新建弹窗 -->
    <div class="rb-mask" v-show="show_add_popup == 1">
      <div ref="rb_popup_add" class="rb-popup">
        <!-- 弹窗title -->
        <div class="rb-popup-titlebox">
          <div class="rb-popup-title">新建招聘</div>
          <img class="rb-popup-close" src="../assets/close.png" style="cursor: pointer;" @click="hideAddPopup()"/>
        </div>
        <!-- 弹窗内容 -->
        <div class="rb-popup-detailbox">
          <div class="rb-popup-dt">招聘主题</div>
          <input class="rb-popup-input" type="text" v-model="data.recruitTheme" placeholder="请输入您要新建的招聘主题" @focus="data.recruitTheme = ''"/>
        </div>
        <!-- 弹窗按钮 -->
        <button class="rb-popup-button" style="cursor: pointer;" @click="addRecruitment()">确认</button>
      </div>
    </div>
    <!-- 修改弹窗 -->
    <div class="rb-mask" v-show="show_update_popup == 1">
      <div ref="rb_popup_update" class="rb-popup">
        <!-- 弹窗title -->
        <div class="rb-popup-titlebox">
          <div class="rb-popup-title">招聘</div>
          <img class="rb-popup-close" src="../assets/close.png" style="cursor: pointer;" @click="hideUpdatePopup()"/>
        </div>
        <!-- 弹窗内容 -->
        <div class="rb-popup-detailbox">
          <div class="rb-popup-dt">招聘主题</div>
          <input class="rb-popup-input" type="text" v-model="data.recruitTheme" placeholder="请输入您要修改的招聘主题" @focus="data.recruitTheme = ''"/>
        </div>
        <!-- 弹窗按钮 -->
        <button class="rb-popup-button" style="cursor: pointer;" @click="updateRecruitment()">确认</button>
      </div>
    </div>
    <!-- 显示弹窗 -->
    <div class="rb-mask" v-show="show_popup == 1">
      <div class="rb_popup_show">
        <!-- 弹窗title -->
        <div class="rb-popup-titlebox">
          <img class="rb-popup-close" src="../assets/close.png" style="cursor: pointer;" @click="hideShowPopup()"/>
        </div>
        <!-- 弹窗内容 -->
        <div class="rb-popup-detail" v-show="detail.isShow == '0'">您要将本次招聘在前台页面展示，给他人浏览报名，请再次确认本次招聘的相关信息已经设置完毕。</div>
        <div class="rb-popup-detail" v-show="detail.isShow == '1'">您要将本次招聘取消前台页面展示，关闭后前台将无此招聘信息的任何内容，请谨慎操作。</div>
        <!-- 弹窗按钮 -->
        <button class="rb-popup-button" style="cursor: pointer;" @click="updateIsShow()">确认</button>
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
        show_add_popup: 0,
        show_update_popup: 0,
        data: {
          "applyId": '',
          "recruitTheme": ''
        },
        rmData: '',
        recruitTheme: '',
        deleteData: {
          "id": ''
        },
        show_popup: 0,
        detail: '',
        updateIsShowDto: {
          'applyId': '',
          'isShow': ''
        },
        rmListDto: {
          'pageNum': 1,
          'pageSize': 15
        },
        total: 0
      }
    },
    created() {
      localStorage.setItem('header_title','');
    },
    mounted() {
      this.getRmList();
    },
    methods: {
      showPopup(rm) {
        this.show_popup = 1;
        this.detail = rm;
      },
      hideShowPopup() {
        this.show_popup = 0;
      },
      showAddPopup() {
        this.show_add_popup = 1;
        this.data.applyId = '';
        this.data.recruitTheme = '';
      },
      hideAddPopup() {
        this.show_add_popup = 0;
      },
      showUpdatePopup(applyId,recruitTheme) {
        this.show_update_popup = 1;
        this.data.applyId = applyId;
        this.data.recruitTheme = recruitTheme;
      },
      hideUpdatePopup() {
        this.show_update_popup = 0;
      },
      goRecruitmentDetail(applyId,createBy) {
        localStorage.setItem('applyId',applyId);
        localStorage.setItem('createBy',createBy);
        this.$router.replace('/index2');
      },
      handleCurrentChange(val) {
        this.rmListDto.pageNum = val;
        this.getRmList();
      },
      updateIsShow() {
        var that = this;
        that.updateIsShowDto.applyId = that.detail.applyId;
        if (that.detail.isShow == '0') {
          that.updateIsShowDto.isShow = '1';
        } else if (that.detail.isShow == '1') {
          that.updateIsShowDto.isShow = '0';
        }
        axios({
          method:'post',
          url:this.commenUrl+'/edu/eduRear/eduApplySet/updateIsShow',
          data: qs.stringify(that.updateIsShowDto),
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              that.show_popup = 0;
              that.getRmList();
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
          that.$message('修改失败')
        });
      },
      getRmList() {
        var that = this;
        axios({
          method:'post',
          url:this.commenUrl+'/edu/eduRear/eduApplySet/list',
          data: qs.stringify(that.rmListDto),
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              that.rmData = res.data.data.rows;
              that.total = res.data.data.total;
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
          that.$message('查询失败')
        });
      },
      addRecruitment() {
        var that = this;
        if (that.data.recruitTheme == '' || that.data.recruitTheme.replace(/\s*/g, "") == "") {
          that.$message('请输入招聘主题');
        } else if (that.data.recruitTheme.length > 50) {
          that.$message('招聘主题只能在50字以内');
        } else {
          axios({
            method:'post',
            url:this.commenUrl+'/edu/eduRear/eduApplySet/applySet',
            data: qs.stringify(that.data),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.$message('添加成功');
                that.show_add_popup = 0;
                that.getRmList();
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
            that.$message('新建失败')
          });
        }
      },
      updateRecruitment() {
        var that = this;
        if (that.data.recruitTheme == '' || that.data.recruitTheme.replace(/\s*/g, "") == "") {
          that.$message('请输入招聘主题');
        } else if (that.data.recruitTheme.length > 50) {
          that.$message('招聘主题只能在50字以内');
        } else {
          axios({
            method:'post',
            url:this.commenUrl+'/edu/eduRear/eduApplySet/applySet',
            data: qs.stringify(that.data),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.$message('修改成功');
                that.show_update_popup = 0;
                that.getRmList();
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
            that.$message('修改失败')
          });
        }
      },
      deleteRecruitment(applyId) {
        var that = this;
        that.deleteData.id = applyId;
        that.$confirm('是否要删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            method:'post',
            url:this.commenUrl+'/edu/eduRear/eduApplySet/deleteApplySet',
            data: qs.stringify(that.deleteData),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.$message('删除成功');
                that.getRmList();
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
            that.$message('删除失败')
          });
        }).catch(() => {
        });
      }
    },
  }
</script>

<style>
  .right-box {
    width: calc(100vw - 145px - 34px);
    height: calc(100vh - 57px - 34px);
    background: #FFFFFF;
    margin-top: 12px;
    margin-left: 9px;
    min-width: calc(1200px - 145px - 34px);
  }

  .right-title-box {
    height: 48px;
  }

  .right-title-line {
    width: 2px;
    height: 12px;
    background: #436DF3;
    margin-left: 24px;
    margin-top: 18px;
    float: left;
  }

  .right-title {
    width: 200px;
    height: 48px;
    line-height: 48px;
    margin-left: 7px;
    font-size: 12px;
    color: #333333;
    float: left;
    text-align: left;
  }

  .rb-title-button {
    width: 93px;
    height: 21px;
    line-height: 21px;
    margin-right: 16px;
    margin-top: 14px;
    background: #FFFFFF;
    border: 1px solid #436DF3;/* no */
    border-radius: 10px;
    font-size: 12px;
    color: #436DF3;
    text-align: center;
    float: right;
  }

  button:after {
    border: none;
  }

  .rb-list-title-box {
    width: calc(100% - 68px);
    height: 40px;
    margin-left: 34px;
    background: #F0F0F0;
  }

  .rb-list-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    float: left;
    font-size: 16px;
    color: #666666;
  }

  .title-number {
    width: 6.93%;
  }

  .title-theme {
    width: 13.78%;
  }

  .title-state {
    width: 10.88%;
  }

  .title-quantity {
    width: 13.52%;
  }

  .title-peoples {
    width: 13.16%;
  }

  .title-audit {
    width: 10.88%;
  }

  .title-show {
    width: 9.3%;
    overflow: visible !important;
    position: relative;
  }

 .el-switch__core {
    margin-top: 4px \9 !important;
  }

  .el-switch {
    height: 28px !important;
  }

  .title-operation {
    width: 21.55%;
  }

  .rb-list-detail-box {
    width: calc(100% - 68px);
    /* height: 28px; */
    margin-left: 34px;
    background: #FFFFFF;
    border-bottom: 1px dashed #E7E7E7;/* no */
  }

  .rb-list-detail {
    /* height: 28px; */
    line-height: 40px;
    text-align: center;
    float: left;
    font-size: 16px;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .rb-mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .rb-popup {
    width: 396px;
    height: 182px;
    background: #FFFFFF;
    box-shadow: 0 4px 13px 1px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
    position: fixed;
    right: 50%;
    bottom: 50%;
    margin-right: -198px;
    margin-bottom: -91px;
  }

  .rb_popup_show {
    width: 396px;
    height: 161px;
    background: #FFFFFF;
    box-shadow: 0 4px 13px 1px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
    position: fixed;
    right: 50%;
    bottom: 50%;
    margin-right: -198px;
    margin-bottom: -80.5px;
  }

  .rb-popup-titlebox {
    width: 352px;
    height: 47px;
    margin: 0 22px;
  }

  .rb-popup-title {
    float: left;
    height: 47px;
    line-height: 47px;
    font-size: 15px;
    color: #333333;
  }

  .rb-popup-close {
    float: right;
    width: 10px;
    height: 10px;
    margin-top: 18px;
  }

  .rb-popup-detailbox {
    width: 243px;
    height: 46px;
    margin-top: 3px;
    margin-left: 77px;
  }

  .rb-popup-detail {
    width: 328px;
    height: 34px;
    margin-top: 3px;
    margin-left: 34px;
    font-size: 13px;
    color: #333333;
    line-height: 23px;
  }

  .rb-popup-dt {
    width: 235px;
    height: 25px;
    line-height: 25px;
    padding-left: 4px;
    font-size: 11px;
    color: #666666;
  }

  .rb-popup-input {
    width: 243px;
    height: 21px;
    line-height: 21px;
    border-bottom: 1px solid #BDBDBD;/* no */
    font-size: 11px;
    color: #333333;
    padding-left: 5px;
  }

  .rb-popup-button {
    width: 85px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border: 1px solid #436EF3;/* no */
    background: #FFFFFF;
    font-size: 13px;
    color: #436EF3;
    margin-top: 30px;
    margin-left: 156px;
    border-radius: 14px;
  }

  .rb-paging{
    text-align: right;
    margin-top: 100px;
    margin-right: 30px;
    margin-bottom: 10px;
    /* position: absolute;
    bottom: 40px;
    right: 30px; */
  }

  .btn-prev {
    background-image: url("../assets/prev.png") !important;
    background-position: center !important;
    background-size: 15px 15px !important;
    background-repeat: no-repeat !important;
    padding-right: 6px !important;
  }

  .btn-prev i{
    display: none !important;
  }

  .btn-next {
    background-image: url("../assets/next.png") !important;
    background-position: center !important;
    background-size: 15px 15px !important;
    background-repeat: no-repeat !important;
    padding-left: 6px !important;
  }

  .btn-next i{
    display: none !important;
  }

  .el-pager li{
    width: 28px !important;
    padding: 0 !important;
  }

  .el-pager li.active{
    color: #3A6AEC !important;
  }

  .el-pager li:hover{
    color: #3A6AEC !important;
  }

  input::-webkit-input-placeholder{
    color: #999999;
  }

  @media screen and (max-width: 1600px) {
    .rb-list-title-box {
      width: calc(100% - 48px);
      height: 28px;
      margin-left: 24px;
      background: #EFEFEF;
    }

    .rb-list-title {
      height: 28px;
      line-height: 28px;
      text-align: center;
      float: left;
      font-size: 11px;
      color: #656565;
    }

    .rb-list-detail-box {
      width: calc(100% - 48px);
      /* height: 28px; */
      margin-left: 24px;
      background: #FFFFFF;
      border-bottom: 1px dashed #E7E7E7;/* no */
    }

    .rb-list-detail {
      /* height: 28px; */
      line-height: 28px;
      text-align: center;
      float: left;
      font-size: 11px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
