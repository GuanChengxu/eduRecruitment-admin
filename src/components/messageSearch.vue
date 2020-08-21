<template>
  <div>
    <div ref="right_box" class="right-box">
      <div v-show="search_anything == 0">
        <div class="mss-box">
          <!-- 搜索框 -->
          <div class="ms-searchbox">
            <img src="@/assets/search.png" />
            <input type="text" placeholder="请输入身份证号或姓名查询" v-model="searchDto.dim" @focus="searchDto.dim = ''"/>
          </div>
          <button class="ms-searchbutton" style="cursor: pointer;" @click="search()">搜索</button>
        </div>
      </div>
      <div v-show="search_anything == 1">
        <div class="mss-box1">
          <!-- 搜索框 -->
          <div class="ms-searchbox1">
            <img src="@/assets/search.png" />
            <input type="text" placeholder="请输入身份证号或姓名查询" v-model="searchDto.dim" @focus="searchDto.dim = ''"/>
          </div>
          <button class="ms-searchbutton1" style="cursor: pointer;" @click="search()">搜索</button>
        </div>
        <!-- 搜索内容 -->
        <div class="ms-search-title">
          <div class="ms-st-detail">
            <span>{{searchName}}</span>
          </div>
          <div class="ms-st-number">
            <span>{{searchTotal}}条相关报名记录信息</span>
          </div>
        </div>
        <!-- 报名记录 -->
        <div class="ms-bmjl">
          <div class="mst-line"></div>
          <div class="mst-title">报名记录</div>
        </div>
        <!-- 列表标题 -->
        <div class="ms-listtitle">
          <div class="ms-liststyle msl-number">序号</div>
          <div class="ms-liststyle msl-theme">报名主题</div>
          <div class="ms-liststyle msl-name">姓名</div>
          <div class="ms-liststyle msl-sex">性别</div>
          <div class="ms-liststyle msl-idcard">身份证号</div>
          <div class="ms-liststyle msl-phone">手机号</div>
          <div class="ms-liststyle msl-post">报考岗位</div>
          <div class="ms-liststyle msl-date">报考时间</div>
          <div class="ms-liststyle msl-operation">操作</div>
        </div>
        <!-- 列表详情 -->
        <div class="ms-listdetail" v-for="(sld,sldidx) in searchListData" :key="sldidx">
          <div class="ms-listdstyle msl-number">{{sldidx + ((pageNum - 1) * 15) + 1}}</div>
          <div class="ms-listdstyle msl-theme" style="cursor: pointer;" @click="showPopup(sld)">{{sld.recruitTheme}}</div>
          <div class="ms-listdstyle msl-name">{{sld.name}}</div>
          <div class="ms-listdstyle msl-sex" v-if="sld.sex == 0">男</div>
          <div class="ms-listdstyle msl-sex" v-else-if="sld.sex == 1">女</div>
          <div class="ms-listdstyle msl-sex" v-else-if="sld.sex == 2">未知</div>
          <div class="ms-listdstyle msl-idcard">{{sld.idNumber}}</div>
          <div class="ms-listdstyle msl-phone">{{sld.mobile}}</div>
          <div class="ms-listdstyle msl-post">{{sld.unit}} {{sld.subject}}</div>
          <div class="ms-listdstyle msl-date">{{sld.applyTime}}</div>
          <div class="ms-listdstyle msl-operation" style="cursor: pointer;" @click="showPopup(sld)">查看详情</div>
        </div>
      </div>
      <!-- 分页 -->
      <div class="rb-paging" v-show="search_anything == 1">
        <el-pagination small layout="prev, pager, next" :total="total" :current-page="pageNum" :page-size="15" @current-change='handleCurrentChange'></el-pagination>
      </div>
      <!-- 弹窗 -->
      <div class="ms-popup" v-if="ms_popup == 1">
        <div ref="msp_detailbox" class="msp-detailbox">
          <div class="mspd-title clearfix">
            <div class="mspdt-title">{{popupData.name}}报名表</div>
            <img src="@/assets/close.png" style="cursor: pointer;" @click="hidePopup()" />
          </div>
          <div class="mspd-detail">
            <div class="mspd-detail1 clearfix">
              <div class="mspd-style mspdtitle">报考岗位</div>
              <div class="mspd-style mspddetail">{{popupData.unit}}<span style="margin-left: 10px;">{{popupData.subject}}</span></div>
              <div class="mspd-style mspdtitle">报考序号</div>
              <div class="mspd-style mspddetail">{{popupData.serialNum}}</div>
            </div>
            <div class="mspd-detail2 clearfix">
              <div class="mspd-detail2-left">
                <div class="mspd2l clearfix">
                  <div class="mspd-style2 mspdtitle">姓名</div>
                  <div class="mspd-style2 mspddetail">{{popupData.name}}</div>
                  <div class="mspd-style2 mspdtitle">性别</div>
                  <div class="mspd-style2 mspddetail" v-if="popupData.sex == 0">男</div>
                  <div class="mspd-style2 mspddetail" v-if="popupData.sex == 1">女</div>
                  <div class="mspd-style2 mspddetail" v-if="popupData.sex == 2">未知</div>
                  <div class="mspd-style mspdtitle">政治面貌</div>
                  <div class="mspd-style mspddetail">{{popupData.politicsStatus}}</div>
                </div>
                <div class="mspd2l clearfix">
                  <div class="mspd-style2 mspdtitle">民族</div>
                  <div class="mspd-style2 mspddetail">{{popupData.nation}}</div>
                  <div class="mspd-style2 mspdtitle">身份证号</div>
                  <div class="mspd-style2 mspddetail">{{popupData.idNumber}}</div>
                </div>
                <div class="mspd2l clearfix">
                  <div class="mspd-style2 mspdtitle">手机</div>
                  <div class="mspd-style2 mspddetail">{{popupData.mobile}}</div>
                  <div class="mspd-style2 mspdtitle">电子邮箱</div>
                  <div class="mspd-style2 mspddetail">{{popupData.email}}</div>
                </div>
                <div class="mspd2l clearfix">
                  <div class="mspd-style2 mspdtitle">生源地</div>
                  <div class="mspd-style2 mspddetail">{{popupData.birthplace}}</div>
                  <div class="mspd-style2 mspdtitle">家庭地址</div>
                  <div class="mspd-style2 mspddetail">{{popupData.address}}</div>
                </div>
                <div class="mspd2l clearfix">
                  <div class="mspd-style2 mspdtitle">教师资格证</div>
                </div>
                <div class="mspd2l clearfix">
                  <div class="mspd-style2 mspdtitle">种类</div>
                  <div class="mspd-style2 mspddetail">{{popupData.certificationInfo.kind}}</div>
                  <div class="mspd-style2 mspdtitle">编号</div>
                  <div class="mspd-style2 mspddetail">{{popupData.certificationInfo.serialNumber}}</div>
                </div>
              </div>
              <img class="mspd-detail2-right" :src="commenUrl+'' + popupData.photo" />
            </div>
            <div class="mspd-detail3">
              <div class="mspd-detail1 clearfix">
                <div class="mspd-style mspdtitle">毕业年份</div>
                <div class="mspd-style mspddetail">{{popupData.graduateTime}}</div>
                <div class="mspd-style mspdtitle">最高学位</div>
                <div class="mspd-style mspddetail">{{popupData.maxDegree}}</div>
                <div class="mspd-style mspdtitle">最高学历</div>
                <div class="mspd-style mspddetail">{{popupData.certificationInfo.highestEducation}}</div>
              </div>
              <div class="mspd-detail1 clearfix" v-if="popupData.certificationInfo.doctorAcademy != null">
                <div class="mspd-style mspdtitle">博士院校</div>
                <div class="mspd-style mspddetail">{{popupData.certificationInfo.doctorAcademy}}</div>
                <div class="mspd-style mspdtitle">博士专业</div>
                <div class="mspd-style mspddetail">{{popupData.certificationInfo.doctorSpecialty}}</div>
                <div class="mspd-style mspdtitle">学历性质</div>
                <div class="mspd-style mspddetail">{{popupData.certificationInfo.doctorEducationNature}}</div>
              </div>
              <div class="mspd-detail1 clearfix" v-if="popupData.certificationInfo.masterAcademy != null">
                <div class="mspd-style mspdtitle">硕士院校</div>
                <div class="mspd-style mspddetail">{{popupData.certificationInfo.masterAcademy}}</div>
                <div class="mspd-style mspdtitle">硕士专业</div>
                <div class="mspd-style mspddetail">{{popupData.certificationInfo.masterSpecialty}}</div>
                <div class="mspd-style mspdtitle">学历性质</div>
                <div class="mspd-style mspddetail">{{popupData.certificationInfo.masterEducationNature}}</div>
              </div>
              <div class="mspd-detail1 clearfix" v-if="popupData.certificationInfo.bachelorAcademy != null">
                <div class="mspd-style mspdtitle">本科院校</div>
                <div class="mspd-style mspddetail">{{popupData.certificationInfo.bachelorAcademy}}</div>
                <div class="mspd-style mspdtitle">本科专业</div>
                <div class="mspd-style mspddetail">{{popupData.certificationInfo.bachelorSpecialty}}</div>
                <div class="mspd-style mspdtitle">学历性质</div>
                <div class="mspd-style mspddetail">{{popupData.certificationInfo.bachelorEducationNature}}</div>
              </div>
              <div class="mspd-detail1 clearfix" v-if="popupData.certificationInfo.specialtiesAcademy != null">
                <div class="mspd-style mspdtitle">专科院校</div>
                <div class="mspd-style mspddetail">{{popupData.certificationInfo.specialtiesAcademy}}</div>
                <div class="mspd-style mspdtitle">专科专业</div>
                <div class="mspd-style mspddetail">{{popupData.certificationInfo.specialtiesSpecialty}}</div>
                <div class="mspd-style mspdtitle">学历性质</div>
                <div class="mspd-style mspddetail">{{popupData.certificationInfo.specialtiesEducationNature}}</div>
              </div>
              <div class="mspd-detail1 clearfix">
                <div class="mspd-style mspdtitle">现工作单位</div>
                <div class="mspd-style mspddetail">{{popupData.currentWorkingUnit}}</div>
              </div>
            </div>
            <div class="mspd-detail4">
              <div class="mspd-detail1 clearfix">
                <div class="mspd-style mspdtitle">个人简历（从高中阶段填起）</div>
              </div>
              <div class="mspd-detail1 clearfix" v-for="(resumes,ridx) in popupData.resumes" :key="ridx">
                <div class="mspd-style mspdtitle">从</div>
                <div class="mspd-style mspddetail">{{resumes.entryTime}}</div>
                <div class="mspd-style mspdtitle">到</div>
                <div class="mspd-style mspddetail">{{resumes.dimissionTime}}</div>
                <div class="mspd-style mspddetail">{{resumes.work}}</div>
              </div>
            </div>
            <div class="mspd-detail5">
              <div class="mspd-detail1 clearfix">
                <div class="mspd-style mspdtitle">家庭主要成员</div>
              </div>
              <div class="mspd-detail1 clearfix">
                <div class="mspd-style mspdtitle5 gx">关系</div>
                <div class="mspd-style mspdtitle5 xm">姓名</div>
                <div class="mspd-style mspdtitle5 zzmm">政治面貌</div>
                <div class="mspd-style mspdtitle5 gzdwjzw">工作单位及职务</div>
              </div>
              <div class="mspd-detail1 clearfix" v-for="(familyMembers,fidx) in popupData.familyMembers" :key="fidx">
                <div class="mspd-style mspddetail gx">{{familyMembers.relation}}</div>
                <div class="mspd-style mspddetail xm">{{familyMembers.familyMemberName}}</div>
                <div class="mspd-style mspddetail zzmm">{{familyMembers.familyMemberPoliticsStatus}}</div>
                <div class="mspd-style mspddetail gzdwjzw">{{familyMembers.works}}</div>
              </div>
            </div>
            <div class="mspd-detail5">
              <div class="mspd-detail1 clearfix">
                <div class="mspd-style mspdtitle5">备注</div>
              </div>
              <div class="mspd-detail1 clearfix">
                <div class="mspd-style mspddetail" v-if="popupData.remark == null">无</div>
                <div class="mspd-style mspddetail" v-else>{{popupData.remark}}</div>
              </div>
            </div>
            <div class="zmcl">
              <div class="zmcl_tle">证明材料</div>
              <div class="zmcl_pic clearfix" v-viewer.rebuild="{movable: true}">
                <img v-for="(item,index) in popupData.credentials" :key="index" class="fl" :src="commenUrl+''+item.url" alt="">
              </div>
            </div>
            <div style="width: calc(100% - 42px);height: 1px;background: #D7D7D7;margin: 5px 21px;"></div>
            <div class="mspd-title clearfix">
              <div class="mspdt-title">审核记录</div>
            </div>
            <div class="mspd-detail5">
              <div class="mspd-detail1 clearfix">
                <div class="mspd-style mspdtitle5 shzt">审核状态</div>
                <div class="mspd-style mspdtitle5 shz">审核者</div>
                <div class="mspd-style mspdtitle5 shsj">审核时间</div>
                <div class="mspd-style mspdtitle5 shly">审核理由</div>
              </div>
              <div class="mspd-detail1 clearfix" v-for="(pt,ptidx) in popupData.teacherAuditList">
                <div class="mspd-style mspddetail shzt" style="color: #436DF3 !important;" v-if="pt.auditStatus == 2">已通过</div>
                <div class="mspd-style mspddetail shzt" style="color: #FF3737 !important;" v-else-if="pt.auditStatus == 3">已拒绝</div>
                <div class="mspd-style mspddetail shz">{{pt.auditBy}}</div>
                <div class="mspd-style mspddetail shsj">{{pt.createTime}}</div>
                <div class="mspd-style mspddetail shly" v-if="pt.auditStatus == 2 || pt.auditStatus == '2'"></div>
                <div class="mspd-style mspddetail shly" v-else-if="pt.auditStatus == 3 || pt.auditStatus == '3'">{{pt.auditRemark}}</div>
              </div>
            </div>
          </div>
          <!-- 待审核 -->
          <div class="mspd-buttonbox" v-if="popupData.isverify == '1'">
            <button class="mspd-buttonstyle mspd-reject" style="cursor: pointer;" @click="showReject()">拒绝</button>
            <button class="mspd-buttonstyle mspd-pass" style="cursor: pointer;" @click="auditPass(popupData.teacherId)">通过</button>
            <button class="mspd-buttonstyle mspd-export" style="cursor: pointer;" @click="exportPDF(popupData.teacherId)">导出</button>
          </div>
          <!-- 通过 -->
          <div class="mspd-buttonbox" v-else-if="popupData.isverify == '2'">
            <button class="mspd-buttonstyle mspd-reject tgorjj" style="cursor: pointer;" @click="showReject()">拒绝</button>
            <button class="mspd-buttonstyle mspd-export tgorjj" style="cursor: pointer;" @click="exportPDF(popupData.teacherId)">导出</button>
          </div>
          <!-- 拒绝 -->
          <div class="mspd-buttonbox" v-else-if="popupData.isverify == '3'">
            <button class="mspd-buttonstyle mspd-pass tgorjj" style="cursor: pointer;margin-left: calc((100% - 85px - 85px - 85px - 38px - 38px) / 2);" @click="auditPass(popupData.teacherId)">通过</button>
            <button class="mspd-buttonstyle mspd-export tgorjj" style="cursor: pointer;" @click="exportPDF(popupData.teacherId)">导出</button>
          </div>
          <!-- 审核拒绝弹窗 -->
          <div class="mspd-rejectmemark" v-if="reject_popup == 1">
            <div class="mspdr-title clearfix">
              <div class="titleleft">拒绝理由</div>
              <img class="imageright" src="../assets/close.png" @click="hideReject()"/>
            </div>
            <textarea class="mspdr-textarea" v-model="auditDto.isverifyRemark" placeholder="请输入拒绝理由(限40字以内)" @focus="auditDto.isverifyRemark = ''"></textarea>
            <button class="mr-true" style="cursor: pointer;" @click="auditReject(popupData.teacherId,auditDto)">确定</button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog class="ts" :visible.sync="picVisible">
      <div class="close" @click="hideVisible">
        <img src="../assets/tcclose.png" alt="">
      </div>
      <div class="swiper_box">
        <swiper :options="swiperOption" ref="myswiper">
          <swiper-slide class="swiper-slide" v-for="(item,index) in popupData.credentials" :key="index">
            <img :src="commenUrl+''+item.url"/>
          </swiper-slide>
        </swiper>
        <!-- 左右箭头 -->
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  const axios = require('axios');
  export default {
    data() {
      return {
        search_anything: 0,
        popup_height: '',
        pdetail_top: '',
        ms_popup: 0,
        searchDto: {
          'dim': ''
        },
        searchListData: '',
        popupData: '',
        reject_popup: 0,
        auditDto: {
          'isverify': '',
          'teacherId': '',
          'isverifyRemark': ''
        },
        searchName: '',
        searchTotal: 0,
        picVisible:false,
        swiperOption:{},
        total:0,
        pageNum:1
      }
    },
    created() {
      this.swiperOption = {
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,
        autoHeight:true,
        //设置点击箭头
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        buttonDisabledClass: 'my-button-disabled',
        //自动轮播
        autoplay:false,
        //开启循环模式
        loop: false
      }
    },
    mounted() {
      this.popup_height = window.innerHeight + 'px';
    },
    methods: {
      search() {
        if (this.searchDto.dim == '' || this.searchDto.dim.replace(/\s*/g, "") == "") {
          this.$message('必填项不能为空');
        } else {
          this.search_anything = 1;
          this.searchList();
        }
      },
      showPopup(sld) {
        var that = this;
        axios({
          method:'post',
          url:this.commenUrl+'/edu/eduRear/eduPersonnelAllocation/detailById',
          data: qs.stringify({teacherId:sld.teacherId}),
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              that.popupData = res.data.data;
              that.ms_popup = 1;
              that.$nextTick(()=>{ // 页面渲染完成后的回调
                that.popupTop();
              })
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
        });
      },
      hidePopup() {
        this.ms_popup = 0;
      },
      showVisible(num){
        this.picVisible = true;
      },
      hideVisible(){
        this.picVisible = false;
      },
      showReject() {
        this.reject_popup = 1;
      },
      hideReject() {
        this.auditDto.isverifyRemark = '';
        this.reject_popup = 0;
      },
      popupTop() {
        var h1 = window.innerHeight;
        var h2 = this.$refs.msp_detailbox.offsetHeight;
        var h3 = (h1 - h2) / 2;
        this.pdetail_top = h3 + 'px';
      },
      //分页
      handleCurrentChange(val) {
        this.pageNum = val;
        this.searchList();
      },
      searchList() {
        var that = this;
        let data = this.searchDto;
        data.pageNum = this.pageNum;
        data.pageSize = 15;
        axios({
          method:'post',
          url:this.commenUrl+'/edu/eduRear/eduPersonnelAllocation/list',
          data: qs.stringify(data),
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.list.code == 200) {
              that.searchListData = res.data.list.rows;
              that.searchName = that.searchDto.dim;
              that.searchTotal = res.data.list.total;
              that.total = res.data.list.total;
              that.searchListData.forEach((val) => {
                val.applyTime = that.format(val.applyTime,'yyyy-MM-dd HH:mm:ss');
              })
              // that.searchDto.dim = '';
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
      },
      auditPass(id) {
        var that = this;
        that.auditDto.teacherId = id;
        that.auditDto.isverify = '2';
        axios({
          method:'post',
          url:this.commenUrl+'/edu/eduRear/eduPersonnelAllocation/audit',
          data: qs.stringify(this.auditDto),
          headers: {
            token: localStorage.getItem('token')
          },
        })
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              that.$message('审核已通过');
              that.ms_popup = 0;
              that.searchList();
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
      },
      auditReject(id,keyVal) {
        var that = this;
        that.auditDto.teacherId = id;
        that.auditDto.isverify = '3';
        if (that.auditDto.isverifyRemark == '' || that.auditDto.isverifyRemark == null || keyVal.isverifyRemark.replace(/\s*/g, "") == "") {
          that.$message('请输入拒绝原因');
        } else if (that.auditDto.isverifyRemark.length > 40) {
          that.$message('拒绝原因不能超过40个字');
        } else {
          axios({
            method:'post',
            url:this.commenUrl+'/edu/eduRear/eduPersonnelAllocation/audit',
            data: qs.stringify(this.auditDto),
            headers: {
              token: localStorage.getItem('token')
            },
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.$message('已拒绝');
                that.reject_popup = 0;
                that.ms_popup = 0;
                that.searchList();
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
      exportPDF(id) {
        window.location.href = this.commenUrl+'/edu/recruitment/exportPDF?teacherId=' + id + '&tableInfo=all';
      },
      format(time, format) {
        var t = new Date(time);
        var tf = function (i) { return (i < 10 ? '0' : '') + i };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
            switch (a) {
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        })
      }
    },
  }
</script>

<style>
  body {
    scrollbar-arrow-color: #333333;
    scrollbar-face-color: #FFFFFF;
    scrollbar-3dlight-color: #FFFFFF;
    scrollbar-highlight-color: #FFFFFF;
    scrollbar-shadow-color: #FFFFFF;
    scrollbar-darkshadow-color: #FFFFFF;
    scrollbar-track-color: #FFFFFF;
    scrollbar-base-color: #FFFFFF;
  }

  .right-box {
    width: calc(100vw - 145px - 34px);
    height: calc(100vh - 57px - 34px);
    min-width: calc(1200px - 145px - 34px);
    background: #FFFFFF;
    overflow-x: hidden;
    margin-top: 12px;
    margin-left: 9px;
  }

  .mss-box {
    width: 306px;
    height: 24px;
    margin-left: 376px;
    padding-top: 142px;
  }

  .ms-searchbox {
    width: 256px;
    height: 24px;
    border: 1px solid #E6E6E6;/* no */
    float: left;
  }

  .ms-searchbox img {
    width: 12px;
    height: 12px;
    margin-top: 6px;
    margin-left: 7px;
    float: left;
  }

  .ms-searchbox input {
    width: 223px;
    height: 24px;
    line-height: 24px;
    font-size: 11px;
    font-weight: 400;
    color: #333333;
    float: left;
    margin-left: 7px;
  }

  .ms-searchbutton {
    width: 43px;
    height: 24px;
    position: absolute;
    margin-left: 7px;
    line-height: 24px;
    text-align: center;
    background: #436EF3;
    font-size: 13px;
    font-weight: 400;
    color: #FFFFFF;
    float: left;
  }

  .mss-box1 {
    width: calc(100% - 42px);
    height: 38px;
    margin-left: 21px;
    padding-top: 14px;
  }

  .ms-searchbox1 {
    width: 256px;
    height: 24px;
    border: 1px solid #E6E6E6;/* no */
    float: left;
  }

  .ms-searchbox1 img {
    width: 12px;
    height: 12px;
    margin-top: 6px;
    margin-left: 7px;
    float: left;
  }

  .ms-searchbox1 input {
    width: 223px;
    height: 24px;
    line-height: 24px;
    font-size: 11px;
    font-weight: 400;
    color: #333333;
    float: left;
    margin-left: 7px;
  }

  .ms-searchbutton1 {
    width: 43px;
    height: 24px;
    margin-left: 7px;
    line-height: 24px;
    text-align: center;
    background: #436EF3;
    font-size: 13px;
    font-weight: 400;
    color: #FFFFFF;
    float: left;
  }

  .ms-search-title {
    width: calc(100% - 42px);
    height: 50px;
    margin-left: 21px;
  }

  .ms-st-detail {
    float: left;
    height: 50px;
    line-height: 50px;
  }

  .ms-st-detail span {
    font-size: 15px;
    color: #436DF3;
    font-weight: 400;
  }

  .ms-st-number {
    float: left;
    height: 50px;
    line-height: 50px;
    margin-left: 11px;
  }

  .ms-st-number span {
    font-size: 11px;
    color: #666666;
    font-weight: 400;
  }

  .ms-bmjl {
    width: calc(100% - 42px);
    height: 12px;
    margin-left: 21px;
  }

  .mst-line {
    width: 2px;
    height: 12px;
    background: #436EF3;
    float: left;
  }

  .mst-title {
    height: 12px;
    line-height: 12px;
    font-size: 13px;
    color: #333333;
    margin-left: 7px;
  }

  .ms-listtitle {
    width: calc(100% - 42px);
    height: 28px;
    margin-left: 20px;
    margin-top: 14px;
    background: #F0F0F0;
  }

  .ms-listdetail {
    width: calc(100% - 42px);
    height: 41px;
    margin-left: 20px;
    background: #FFFFFF;
    border-bottom: 1px solid #E7E7E7;/* no */
  }

  .ms-liststyle {
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 13px;
    color: #999999;
    float: left;
  }

  .ms-listdstyle {
    height: 41px;
    line-height: 41px;
    text-align: center;
    font-size: 13px;
    color: #333333;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .msl-number {
    width: 5.18%;
  }

  .msl-theme {
    width: 16.68%;
  }

  .msl-name {
    width: 7.9%;
  }

  .msl-sex {
    width: 3.33%;
  }

  .msl-idcard {
    width: 16.85%;
  }

  .msl-phone {
    width: 8.81%;
  }

  .msl-post {
    width: 17.02%;
  }

  .msl-date {
    width: 12.18%;
  }

  .msl-operation {
    width: 12.05%;
  }

  .ms-popup {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255,255,255,0.8);
  }

  /*.msp-detailbox {*/
  /*  width: 726px;*/
  /*  height: 576px;*/
  /*  position: absolute;*/
  /*  top: 50%;*/
  /*  left: 50%;*/
  /*  margin-top: -288px;*/
  /*  margin-left: -263px;*/
  /*  background: #FFFFFF;*/
  /*  box-shadow: 0 4px 13px 1px rgba(0, 0, 0, 0.1);*/
  /*  border-radius: 7px;*/
  /*}*/

  /*.mspd-title {*/
  /*  width: 498px;*/
  /*  height: 39px;*/
  /*  margin-left: 14px;*/
  /*}*/

  /*.mspdt-title {*/
  /*  width: 474px;*/
  /*  height: 26px;*/
  /*  line-height: 26px;*/
  /*  margin-top: 13px;*/
  /*  font-size: 15px;*/
  /*  color: #333333;*/
  /*  font-weight: 400;*/
  /*  float: left;*/
  /*}*/

  /*.mspd-title img {*/
  /*  width: 10px;*/
  /*  height: 10px;*/
  /*  margin-top: 18px;*/
  /*  float: left;*/
  /*}*/

  /*.mspd-detail {*/
  /*  width: 726px;*/
  /*  height: 449px;*/
  /*  overflow-x: hidden;*/
  /*}*/

  /*.mspd-detail1 {*/
  /*  width: 484px;*/
  /*  !*height: 27px;*!*/
  /*  margin-left: 21px;*/
  /*}*/

  /*.mspd-style {*/
  /*  !*height: 27px;*!*/
  /*  !*line-height: 27px;*!*/
  /*  line-height: 16px;*/
  /*  padding: 5.5px 0;*/
  /*  font-size: 11px;*/
  /*  font-weight: 400;*/
  /*  float: left;*/
  /*  word-wrap:break-word;*/
  /*  word-break:normal;*/
  /*}*/

  /*.mspd-style2 {*/
  /*  !*height: 25px;*!*/
  /*  line-height: 16px;*/
  /*  padding: 5.5px 0;*/
  /*  font-size: 11px;*/
  /*  font-weight: 400;*/
  /*  float: left;*/
  /*  word-wrap:break-word;*/
  /*  word-break:normal;*/
  /*}*/

  .nr1{
    width: calc(100% - 16px - 16px - 140px);
  }
  .nr2{
    width: calc(100% - 60px);
  }

  .mspdtitle {
    color: #999999;
    text-align: justify;
  }

  /*.mspddetail {*/
  /*  padding-left: 8px;*/
  /*  padding-right: 8px;*/
  /*  color: #333333;*/
  /*}*/

  .mspdtitle2 {
    width: 50px;
    color: #999999;
    text-align: justify;
  }

  .mspddetail2 {
    /*padding: 0 8px;*/
    padding-left: 8px;
    padding-right: 8px;
    color: #333333;
  }

  .mspdtitle5 {
    color: #999999;
    /* text-align: justify; */
  }

  /*.gx {*/
  /*  width: 60px;*/
  /*  text-align: center;*/
  /*  padding: 4px 0 !important;*/
  /*}*/

  /*.xm {*/
  /*  width: 100px;*/
  /*  text-align: center;*/
  /*  padding: 4px 0 !important;*/
  /*}*/

  /*.zzmm {*/
  /*  width: 90px;*/
  /*  text-align: center;*/
  /*  padding: 4px 0 !important;*/
  /*}*/

  /*.gzdwjzw {*/
  /*  width: 200px;*/
  /*  text-align: center;*/
  /*  padding: 4px 0 !important;*/
  /*}*/

  .mspd2l-4 {
    line-height: 25px;
  }

  /*.mspd-detail2 {*/
  /*  width: 484px;*/
  /*  !*height: 150px;*!*/
  /*  margin-left: 21px;*/
  /*}*/

  /*.mspd-detail2-left {*/
  /*  float: left;*/
  /*}*/

  .mspd-detail2-right {
    float: right;
    width: 108px;
    height: 138px;
    margin-top: 6px;
    margin-right: 7px;
    background: #C8CDD1;
    border-radius: 2px;/* no */
  }

  /*.mspd2l {*/
  /*  width: 369px;*/
  /*  !*height: 25px;*!*/
  /*}*/

  /*.mspd-buttonbox {*/
  /*  width: 526px;*/
  /*  height: 28px;*/
  /*  margin-top: 23px;*/
  /*}*/

  /*.mspd-buttonstyle {*/
  /*  width: 85px;*/
  /*  height: 28px;*/
  /*  line-height: 28px;*/
  /*  text-align: center;*/
  /*  font-size: 13px;*/
  /*  color: #FFFFFF;*/
  /*  font-weight: 400;*/
  /*  border-radius: 14px;*/
  /*}*/

  /*.tgorjj {*/
  /*  margin-left: 118px !important;*/
  /*}*/

  /*.mspd-reject {*/
  /*  background: #FF9A2E;*/
  /*  border: 1px solid #FF9A2E; !* no *!*/
  /*  margin-left: 97px;*/
  /*}*/

  /*.mspd-pass {*/
  /*  background: #436EF3;*/
  /*  border: 1px solid #436EF3; !* no *!*/
  /*  margin-left: calc((100% - 85px - 85px - 85px - 38px - 38px) / 2);*/
  /*}*/

  /*.mspd-export {*/
  /*  background: #02A21C;*/
  /*  border: 1px solid #436EF3; !* no *!*/
  /*  margin-left: 38px;*/
  /*}*/

  .mspd-rejectmemark {
    width: 339px;
    height: 175px;
    box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -169.5px;
    margin-top: -87.5px;
    z-index: 9999999;
    background: #FFFFFF;
  }

  .mspdr-title {
    width: calc(100% - 28px);
    height: 34px;
    margin-top: 6px;
    margin-left: 14px;
  }

  .titleleft {
    float: left;
    height: 34px;
    line-height: 34px;
    font-size: 15px;
    color: #333333;
    font-weight: 400;
    margin-left: 8px;
  }

  .imageright {
    width: 10px;
    height: 10px;
    float: right;
    margin-top: 12px;
  }

  .mspdr-textarea {
    width: 285px;
    height: 74px;
    margin-left: 22px;
    font-size: 11px;
    color: #333333;
    border: 1px solid #BDBDBD;
    border-radius: 2px;
    padding-left: 10px;
    padding-top: 10px;
    resize: none;
  }

  textarea[class='mspdr-textarea']:-ms-input-placeholder {
    color: #999999;
  }

  textarea[class='mspdr-textarea']:-moz-placeholder {
    color: #999999;
  }

  .mr-false {
    width: 85px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    background: #FF3838;
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 400;
    border-radius: 14px;
    margin-left: 90px;
    margin-top: 10px;
  }

  .mr-true {
    width: 85px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    background: #436DF3;
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 400;
    border-radius: 14px;
    margin-left: 20px;
    margin-top: 10px;
  }

  input::-webkit-input-placeholder{
    color: #999999;
  }

  /*.shzt {*/
  /*  width: 60px;*/
  /*  text-align: center;*/
  /*  padding: 4px 0 !important;*/
  /*}*/

  /*.shz {*/
  /*  width: 94px;*/
  /*  text-align: center;*/
  /*  padding: 4px 0 !important;*/
  /*}*/

  /*.shsj {*/
  /*  width: 114px;*/
  /*  text-align: center;*/
  /*  padding: 4px 0 !important;*/
  /*}*/

  /*.shly {*/
  /*  width: 194px;*/
  /*  text-align: center;*/
  /*  padding: 4px 0 !important;*/
  /*}*/
  /*.zmcl{*/
  /*  margin-left: 21px;*/
  /*}*/
  .zmcl .zmcl_tle{
    display: block;
    line-height: 16px;
    padding: 5.5px 0;
    font-size: 16px;
    font-weight: 400;
    word-wrap:break-word;
    word-break:normal;
    color: #999999;
  }
  .zmcl_pic img{
    width: 150px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .swiper-button-prev{
    position: absolute;
    left: 10px !important;
    width: 54px !important;
    height: 54px !important;
    background: url("../assets/left.png") !important;
    background-size: 54px 54px !important;
    background-repeat: no-repeat !important;
  }
  .swiper-button-prev.my-button-disabled{
    background: url("../assets/left_b.png") !important;
    background-size: 54px 54px !important;
    background-repeat: no-repeat !important;
  }
  .swiper-button-prev:focus{
    outline: none;
  }
  .swiper-button-prev:after{
    display: none;
  }
  .swiper-button-next{
    position: absolute;
    right: 10px;
    width: 54px !important;
    height: 54px !important;
    background: url("../assets/right.png") !important;
    background-size: 54px 54px !important;
    background-repeat: no-repeat !important;
  }
  .swiper-button-next.my-button-disabled{
    background: url("../assets/right_b.png") !important;
    background-size: 54px 54px !important;
    background-repeat: no-repeat !important;
  }
  .swiper-button-next:focus{
    outline: none;
  }
  .swiper-button-next:after{
    display: none;
  }
  .close{
    padding: 10px 20px;
    text-align: right;
  }
  .close img{
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
  .rb-paging{
    text-align: right;
    margin-top: 20px;
    margin-right: 30px;
    margin-bottom: 10px;
    /* position: absolute;
    bottom: 40px;
    right: 30px; */
  }
  .rb-paging .el-icon:before{
    content: '···' !important;
    display: block !important;
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
</style>
