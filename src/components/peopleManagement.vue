<template>
  <div>
    <div class="right-box">
      <!-- 报名人数 -->
      <div class="people-line"></div>
      <div class="clearfix">
        <div class="an-box">
          <div style="padding-top: 7px;margin-left: 15px;">
            <span class="an-number un">{{uncheckedNum}}</span>
          </div>
          <div style="margin-top: 7px;margin-left: 14px;">
            <span class="an-title un">未审核报名人数</span>
          </div>
        </div>
        <div class="an-box">
          <div style="padding-top: 7px;margin-left: 15px;">
            <span class="an-number">{{willNum}}</span>
          </div>
          <div style="margin-top: 7px;margin-left: 14px;">
            <span class="an-title">已通过报名人数</span>
          </div>
        </div>
      </div>
      <!-- 搜索栏 -->
      <div class="pm-search">
        <div class="pm-search-title">
          <span>职位筛选</span>
        </div>
        <el-dropdown v-if="grade != 2 && grade != 3 && grade != '2' && grade != '3'" class="pm-search-school pulldown"
          style="cursor: pointer;" trigger="click" @command="sdHandleCommand">
          <div class="pulldown-div pd-school">
            {{schoolName}}<img class="pulldown-img" src="../assets/down.png" />
          </div>
          <el-dropdown-menu class="ts1" slot="dropdown">
            <div class="scroll_box">
              <el-dropdown-item :command="null">全部</el-dropdown-item>
              <el-dropdown-item v-for="(sd,sdidx) in schoolData" :key="sdidx" :command="sd">{{sd.name}}</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <div v-else class="pm-search-school pulldown">{{schoolName}}</div>
        <el-dropdown class="pm-search-subject pulldown" style="cursor: pointer;" trigger="click" @command="pdHandleCommand">
          <div class="pulldown-div">
            <div class="hidden_name">{{postName}}</div>
            <img class="pulldown-img" src="../assets/down.png" />
          </div>
          <el-dropdown-menu class="ts1" slot="dropdown">
            <div class="scroll_box">
              <el-dropdown-item :command="null" v-if="grade != 3 || grade != '3'">全部</el-dropdown-item>
              <el-dropdown-item v-for="(pd,pdidx) in postData" :key="pdidx" :command="pd">{{pd.subjectName}}</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <input type="text" class="pm-search-name" v-model="recTeacher.name" placeholder="请输入姓名" @focus="recTeacher.name = ''" />
        <input type="text" class="pm-search-idcard" v-model="recTeacher.idNumber" placeholder="请输入身份证号" @focus="recTeacher.idNumber = ''" />
        <button class="pm-search-button" style="cursor: pointer;" @click="getPeopleList(1)">确认</button>
      </div>
      <div style="height: 33px;margin-top: 11px;">
        <!-- 标签 -->
        <div class="pm-scroll-view">
          <div v-for="(sl,slidx) in scrollList" :key="slidx">
            <div :class="[currentTab==slidx ? 'sv-div-act' : 'sv-div']" class="sv-div" style="cursor: pointer;" @click="swichMenu(slidx)">
              <div :class="[currentTab==slidx ? 'sv-div-text-act' : 'sv-div-text']" class="sv-div-text">
                {{sl.name}}({{sl.number}})
              </div>
            </div>
          </div>
        </div>
        <!-- 导出刷新按钮 -->
        <div class="sv-button">
          <button class="svb-button svb-refresh" style="cursor: pointer;" @click="refresh()">刷新</button>
          <button class="svb-button svb-derive" style="cursor: pointer;" @click="doExport()">导出</button>
          <button class="svb-button svb-export" v-if="grade != 2 && grade != 3 && grade != '2' && grade != '3'" style="cursor: pointer;" @click="showExport()">统计导出</button>
        </div>
      </div>
      <!-- 列表标题 -->
      <div class="pm-listtitle">
        <div class="pml-style pml-number">序号</div>
        <div class="pml-style pml-name xiaoshou" @click="paixu('name')">姓名<img src="../assets/sort.png" /></div>
        <div class="pml-style pml-photo">照片</div>
        <div class="pml-style pml-sex xiaoshou" @click="paixu('sex')">性别<img src="../assets/sort.png" /></div>
        <div class="pml-style pml-idcard xiaoshou" @click="paixu('idNumber')">身份证号<img src="../assets/sort.png" /></div>
        <div class="pml-style pml-phone xiaoshou" @click="paixu('mobile')">电话<img src="../assets/sort.png" /></div>
        <div class="pml-style pml-post xiaoshou" @click="paixu('unit')">报考岗位<img src="../assets/sort.png" /></div>
        <div class="pml-style pml-edu xiaoshou" @click="paixu('highEducation')">最高学历/毕业院校/专业<img src="../assets/sort.png" /></div>
        <div class="pml-style pml-date xiaoshou" @click="paixu('applyTime')">提交时间<img src="../assets/sort.png" /></div>
        <div class="pml-style pml-state xiaoshou" @click="paixu('isverify')">状态<img src="../assets/sort.png" /></div>
        <div class="pml-style pml-operation">操作</div>
      </div>
      <!-- 列表 -->
      <div class="pm-listdetail" v-for="(pd,pdidx) in peopleData" :key="pdidx">
        <div class="pmd-style pml-number">{{pdidx + 1}}</div>
        <div class="pmd-style pml-name">{{pd.name}}</div>
        <div class="pmd-style pml-photo">
          <img :src="commenUrl+'' + pd.photo" />
        </div>
        <div class="pmd-style pml-sex" v-if="pd.sex == 0">男</div>
        <div class="pmd-style pml-sex" v-else-if="pd.sex == 1">女</div>
        <div class="pmd-style pml-sex" v-else-if="pd.sex == 2">未知</div>
        <div class="pmd-style pml-idcard">{{pd.idNumber}}</div>
        <div class="pmd-style pml-phone">{{pd.mobile}}</div>
        <div class="pmd-style pml-post">{{pd.unit}}/{{pd.subject}}</div>
        <div class="pmd-style pml-edu" v-if="pd.certificationInfo.doctorAcademy != null">{{pd.certificationInfo.highestEducation}}/{{pd.certificationInfo.doctorAcademy}}/{{pd.certificationInfo.doctorSpecialty}}</div>
        <div class="pmd-style pml-edu" v-else-if="pd.certificationInfo.doctorAcademy == null && pd.certificationInfo.masterAcademy != null">{{pd.certificationInfo.highestEducation}}/{{pd.certificationInfo.masterAcademy}}/{{pd.certificationInfo.masterSpecialty}}</div>
        <div class="pmd-style pml-edu" v-else-if="pd.certificationInfo.doctorAcademy == null && pd.certificationInfo.masterAcademy == null && pd.certificationInfo.bachelorAcademy != null">{{pd.certificationInfo.highestEducation}}/{{pd.certificationInfo.bachelorAcademy}}/{{pd.certificationInfo.bachelorSpecialty}}</div>
        <div class="pmd-style pml-edu" v-else-if="pd.certificationInfo.doctorAcademy == null && pd.certificationInfo.masterAcademy == null && pd.certificationInfo.bachelorAcademy == null && pd.certificationInfo.specialtiesAcademy != null">{{pd.certificationInfo.highestEducation}}/{{pd.certificationInfo.specialtiesAcademy}}/{{pd.certificationInfo.specialtiesSpecialty}}</div>
        <div class="pmd-style pml-date">{{pd.applyTime}}</div>
        <div class="pmd-style pml-state" v-if="pd.isverify == 0">已保存未提交</div>
        <div class="pmd-style pml-state" v-else-if="pd.isverify == 1">待审核</div>
        <div class="pmd-style pml-state" v-else-if="pd.isverify == 2">已通过</div>
        <div class="pmd-style pml-state" v-else-if="pd.isverify == 3">未通过</div>
        <div class="pmd-style pml-operation" style="cursor: pointer;" @click="showPopup(pd)">查看详情</div>
      </div>
      <!-- 分页 -->
      <div class="rb-paging">
        <el-pagination small layout="prev, pager, next" :current-page="pageNum" :total="total" :page-size="15" @current-change='handleCurrentChange'></el-pagination>
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
            <button class="mspd-buttonstyle mspd-pass tgorjj" style="cursor: pointer;" @click="auditPass(popupData.teacherId)">通过</button>
            <button class="mspd-buttonstyle mspd-export tgorjj" style="cursor: pointer;" @click="exportPDF(popupData.teacherId)">导出</button>
          </div>
          <!-- 审核拒绝弹窗 -->
          <div class="mspd-rejectmemark" v-if="reject_popup == 1">
            <div class="mspdr-title clearfix">
              <div class="titleleft">拒绝理由</div>
              <img class="imageright" src="../assets/close.png" @click="hideReject()" />
            </div>
            <textarea class="mspdr-textarea" v-model="auditDto.isverifyRemark" placeholder="请输入拒绝理由(限40字以内)" @focus="auditDto.isverifyRemark = ''"></textarea>
            <button class="mr-true" style="cursor: pointer;" @click="auditReject(popupData.teacherId,auditDto)">确定</button>
          </div>
        </div>
      </div>
      <el-dialog
        title="选择时间"
        :visible.sync="exportVisible"
        class="ts2"
        width="30%">
          <div class="close clearfix">
            <p class="fl">请选择导出统计的结束时间</p>
            <img @click="exportVisible = false" src="../assets/close.png" alt="">
          </div>
          <div class="time clearfix">
            <div class="label fl">结束时间:</div>
            <el-date-picker
              class="fl"
              v-model="peoTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="exportVisible = false">取 消</el-button>
            <el-button type="primary" @click="peoExport()">导 出</el-button>
          </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  const axios = require('axios');

  export default {
    data() {
      return {
        right_height: '',
        right_width: '',
        pms_school: '全部',
        pms_subject: '语文老师',
        currentTab: 0,
        scrollList: [{
            name: '待审核',
            number: 0
          },
          {
            name: '已通过',
            number: 0
          },
          {
            name: '未通过',
            number: 0
          },
          {
            name: '已保存未提交',
            number: 0
          },
        ],
        pms_subject: '',
        recTeacher: {
          'recruitId': '',
          'unitId': '',
          'postId': '',
          'name': '',
          'idNumber': '',
          'isverify': '1'
        },
        peopleData: '',
        willNum: 0,
        uncheckedNum: 0,
        downListDto: {
          'applyId': ''
        },
        schoolData: '',
        postData: '',
        schoolName: '全部',
        postName: '全部',
        popup_height: '',
        pdetail_top: '',
        ms_popup: 0,
        popupData: '',
        auditDto: {
          'isverify': '',
          'teacherId': '',
          'isverifyRemark': ''
        },
        reject_popup: 0,
        grade: '0',
        sortNum: 0,
        picVisible:false,
        swiperOption:{},
        total:0,
        pageNum:1,
        //导出
        exportVisible:false,
        //导出时间
        peoTime:''
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
    async mounted() {
      this.recTeacher.recruitId = localStorage.getItem('applyId');
      this.downListDto.applyId = localStorage.getItem('applyId');
      this.grade = localStorage.getItem('grade');
      await this.getSchoolList();
      this.getPostList(1);
    },
    methods: {
      paixu(val) {
        if (this.sortNum == 0) {
          this.sortNum = 1;
          if (val == 'name' || val == 'unit' || val == 'highEducation') {
            this.zhongwenpaixu(this.peopleData, val);
          } else {
            this.shuzipaixu(this.peopleData, val);
          }
        } else if (this.sortNum == 1) {
          this.sortNum = 0;
          this.reverse();
        }
      },
      shuzipaixu(array, key) {
        return array.sort(function(a, b) {
          var x = a[key];
          var y = b[key];
          return ((x < y) ? -1 : (x > y) ? 1 : 0)
        })
      },
      zhongwenpaixu(array, key) {
        return array.sort(function(a, b) {
          var x = a[key];
          var y = b[key];
          return x.localeCompare(y)
        })
      },
      reverse() {
        this.peopleData.reverse();
      },
      popupTop() {
        var h1 = window.innerHeight;
        var h2 = this.$refs.msp_detailbox.offsetHeight;
        var h3 = (h1 - h2) / 2;
        this.pdetail_top = h3 + 'px';
      },
      showPopup(pd) {
        var that = this;
        axios({
          method:'post',
          url:this.commenUrl+'/edu/eduRear/eduPersonnelAllocation/detailById',
          data: qs.stringify({teacherId:pd.teacherId}),
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              that.popupData = res.data.data;
              that.ms_popup = 1;
              that.$nextTick(() => { // 页面渲染完成后的回调
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
      sdHandleCommand(command) {
        if (command == null) {
          this.recTeacher.unitId = '';
          this.schoolName = '全部';
        } else {
          this.recTeacher.unitId = command.unitId;
          this.schoolName = command.name;
        }
        this.getPostList();
      },
      pdHandleCommand(command) {
        if (command == null) {
          this.recTeacher.postId = '';
          this.postName = '全部';
        } else {
          this.recTeacher.postId = command.jobId;
          this.postName = command.subjectName;
        }
      },
      //分页
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getPeopleList();
      },
      swichMenu: async function(current) { //点击其中一个 menu
        if (this.currentTab == current) {
          return false;
        } else {
          this.currentTab = current;
        }
        if (current == 0) {
          this.recTeacher.isverify = '1';
        } else if (current == 1) {
          this.recTeacher.isverify = '2';
        } else if (current == 2) {
          this.recTeacher.isverify = '3';
        } else if (current == 3) {
          this.recTeacher.isverify = '0';
        }
        this.getPeopleList(1);
      },
      getPeopleList(val) {
        var that = this;
        let data = this.recTeacher;
        if(val == 1){
          this.pageNum = 1;
          data.pageNum = 1;
        }else {
          data.pageNum = this.pageNum;
        }
        data.pageSize = 15;
        axios({
            method: 'post',
            url: this.commenUrl+'/edu/eduRear/eduPersonnelAllocation/list',
            data: qs.stringify(data),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.list.code == 200) {
                that.scrollList[0].number = res.data.ISVERIFY_CHECKPENDING;
                that.scrollList[1].number = res.data.ISVERIFY_VERIFIED;
                that.scrollList[2].number = res.data.ISVERIFY_REJECT;
                that.scrollList[3].number = res.data.ISVERIFY_UNCOMMITTED;
                that.willNum = res.data.ISVERIFY_VERIFIED;
                that.uncheckedNum = res.data.ISVERIFY_CHECKPENDING;
                that.peopleData = res.data.list.rows;
                that.total = res.data.list.total;
                that.peopleData.forEach((val) => {
                  if (val.isverify != 0 && val.applyTime) {
                    val.applyTime = that.format(val.applyTime, 'yyyy-MM-dd HH:mm:ss');
                  }
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
          })
          .catch(function() {
            that.$message('失败');
          });
      },
      async getSchoolList() {
        var that = this;
        await axios({
            method: 'post',
            url: this.commenUrl+'/edu/eduRear/eduPersonnelAllocation/unitList',
            data: qs.stringify(this.downListDto),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                if (that.grade != 2 && that.grade != 3 && that.grade != '2' && that.grade != '3') {
                  that.schoolData = res.data.data;
                } else {
                  // that.recTeacher.unitId = res.data.data[0].unitId;
                  // that.schoolName = res.data.data[0].name;
                  that.recTeacher.unitId = localStorage.getItem('unitId');
                  that.schoolName = localStorage.getItem('unitName');
                }
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
          .catch(function() {
            that.$message('失败');
          });
      },
      getPostList(val) {
        var that = this;
        axios({
            method: 'post',
            url: this.commenUrl+'/edu/eduRear/eduPersonnelAllocation/subject',
            data:qs.stringify({applyId:this.downListDto.applyId, unitId:this.recTeacher.unitId}),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.postData = res.data.data;
                if (that.grade == 3 || that.grade == '3') {
                  that.postName = that.postData.length>0?that.postData[0].subjectName:'';
                  that.recTeacher.postId = that.postData.length>0?that.postData[0].jobId:'';
                }else {
                  that.recTeacher.postId = '';
                  that.postName = '全部';
                }
                if(val == 1){
                  that.getPeopleList();
                }
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
          .catch(function() {
            that.$message('失败');
          });
      },
      refresh() {
        var that = this;
        // that.recTeacher.unitId = '';
        // that.recTeacher.postId = '';
        // that.recTeacher.name = '';
        // that.recTeacher.idNumber = '';
        // that.recTeacher.isverify = '1';
        // that.schoolName = '全部';
        // that.postName = '全部';
        // that.currentTab = 0;
        axios({
            method: 'post',
            url: this.commenUrl+'/edu/eduRear/eduPersonnelAllocation/list',
            data: qs.stringify(this.recTeacher),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.list.code == 200) {
                that.scrollList[0].number = res.data.ISVERIFY_CHECKPENDING;
                that.scrollList[1].number = res.data.ISVERIFY_VERIFIED;
                that.scrollList[2].number = res.data.ISVERIFY_REJECT;
                that.scrollList[3].number = res.data.ISVERIFY_UNCOMMITTED;
                that.willNum = res.data.ISVERIFY_VERIFIED;
                that.uncheckedNum = res.data.ISVERIFY_CHECKPENDING;
                that.peopleData = res.data.list.rows;
                that.peopleData.forEach((val) => {
                  if(val.applyTime){
                    val.applyTime = that.format(val.applyTime, 'yyyy-MM-dd HH:mm:ss');
                  }
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
          })
          .catch(function() {
            that.$message('失败');
          });
      },
      showExport(){
        this.peoTime = '';
        this.exportVisible = true;
      },
      peoExport() {
        const that = this;
        if(this.peoTime){
          axios({
            method: 'post',
            url: this.commenUrl+'/edu/eduRear/eduApplySet/exportSize',
            data: qs.stringify({
              applyId:this.recTeacher.recruitId,
              date:new Date(this.peoTime).getTime()
            }),
            headers: {
              token: localStorage.getItem('token')
            },
          })
            .then(function(res) {
              console.log(res)
              if (res.status == 200) {
                if (res.data.code == 200) {
                  var rdm = res.data.msg;
                  var url = that.commenUrl+'/edu/common/download?fileName=' + rdm + '&delete=true';
                  window.open(url, 'top');
                  that.exportVisible = false;
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
            .catch(function() {
              that.$message('失败');
            });
        }else{
          that.$message('请选择结束时间');
        }
      },
      doExport() {
        const that = this;
        axios({
            method: 'post',
            url: this.commenUrl+'/edu/eduRear/eduPersonnelAllocation/export',
            data: qs.stringify(this.recTeacher),
            headers: {
              token: localStorage.getItem('token')
            },
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                var rdm = encodeURI(res.data.msg);
                var url = that.commenUrl+'/edu/common/download?fileName=' + rdm + '&delete=true';
                window.open(url, 'top');
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
          .catch(function() {
            that.$message('失败');
          });
      },
      auditPass(id) {
        var that = this;
        that.auditDto.teacherId = id;
        that.auditDto.isverify = '2';
        axios({
            method: 'post',
            url: this.commenUrl+'/edu/eduRear/eduPersonnelAllocation/audit',
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
                that.getPeopleList();
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
          .catch(function() {
            that.$message('失败');
          });
      },
      auditReject(id, keyVal) {
        var that = this;
        that.auditDto.teacherId = id;
        that.auditDto.isverify = '3';
        if (that.auditDto.isverifyRemark == '' || that.auditDto.isverifyRemark == null || keyVal.isverifyRemark.replace(
            /\s*/g, "") == "") {
          that.$message('请输入拒绝原因');
        } else if (that.auditDto.isverifyRemark.length > 40) {
          that.$message('拒绝原因不能超过40个字');
        } else {
          axios({
              method: 'post',
              url: this.commenUrl+'/edu/eduRear/eduPersonnelAllocation/audit',
              data: qs.stringify(this.auditDto),
              headers: {
                token: localStorage.getItem('token')
              },
            })
            .then(function(res) {
              if (res.status == 200) {
                if (res.data.code == 200) {
                  that.$message('已拒绝');
                  that.auditDto.isverifyRemark = '';
                  that.reject_popup = 0;
                  that.ms_popup = 0;
                  that.getPeopleList();
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
            .catch(function() {
              that.$message('失败');
            });
        }
      },
      exportPDF(id) {
        window.location.href = this.commenUrl+'/edu/recruitment/exportPDF?teacherId=' + id + '&tableInfo=all';
      },
      format(time, format) {
        var reg = new RegExp('T', 'g');
        time = time.replace(new RegExp(/-/gm), "/");
        time = time.replace(reg, ' ');
        var tarr = time.split('.');
        time = tarr[0];
        var t = new Date(time);
        var tf = function(i) {
          return (i < 10 ? '0' : '') + i
        };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
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
      },
    }
  }
</script>

<style>
  .right-box {
    width: calc(100vw - 145px - 34px);
    height: calc(100vh - 57px - 34px);
    min-width: calc(1200px - 145px - 34px);
    background: #FFFFFF;
    margin-top: 12px;
    margin-left: 9px;
  }

  .people-line {
    width: 100%;
    height: 14px;
    background: #FFFFFF;
  }

  .an-box {
    width: 121px;
    height: 64px;
    background: rgba(67, 110, 243, 0.1);
    margin-left: 16px;
    float: left;
  }

  .an-number {
    font-size: 30px;
    color: #436EF3;
    font-weight: 400;
  }

  .an-title {
    font-size: 13px;
    color: #436EF3;
    font-weight: 400;
  }

  .un {
    color: #FF3737 !important;
  }

  .pm-search {
    width: calc(100% - 32px);
    height: 21px;
    margin-left: 16px;
    margin-top: 11px;
  }

  .pm-search-title {
    margin-top: 5px;
    float: left;
  }

  .pm-search-title span {
    font-size: 11px;
    color: #333333;
  }

  .pulldown {
    width: 107px;
    height: 21px;
    line-height: 21px;
    float: left;
    border: 1px solid #C8CDD1;
    /* no */
    border-radius: 11px;
    padding-left: 5px;
    padding-right: 9px;
  }

  .pulldown-div {
    width: 98%;
    height: 21px;
    line-height: 21px;
    float: left;
    padding-left: 5px;
    text-align: left;
    font-size: 13px;
    color: #333333;
  }

  .pulldown-div .hidden_name{
    display: inline-block;
    width: calc(100% - 9px);
    height: 21px;
    line-height: 21px;
    text-align: left;
    font-size: 13px;
    color: #333333;
    margin-right: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space:nowrap;
  }

  .pd-school {
    width: 98%;
  }

  .pulldown-img {
    width: 9px;
    height: 5px;
    float: right;
    margin-top: 8px;
  }

  .pm-search-school {
    margin-left: 11px;
    width: 170px !important;
  }

  .pm-search-subject {
    margin-left: 6px;
  }

  .pm-search-name {
    width: 107px;
    height: 21px;
    margin-left: 14px;
    float: left;
    line-height: 21px;
    border: 1px solid #C8CDD1;
    /* no */
    border-radius: 11px;
    text-align: left;
    font-size: 13px;
    color: #333333;
    padding-left: 10px;
  }

  .pm-search-idcard {
    width: 162px;
    height: 21px;
    margin-left: 14px;
    float: left;
    line-height: 21px;
    border: 1px solid #C8CDD1;
    /* no */
    border-radius: 11px;
    text-align: left;
    font-size: 13px;
    color: #333333;
    padding-left: 10px;
  }

  .pm-search-button {
    width: 57px;
    height: 21px;
    line-height: 21px;
    background: #FFFFFF;
    border: 1px solid #436EF3;
    /* no */
    font-size: 13px;
    color: #436EF3;
    text-align: center;
    margin-left: 10px;
    float: left;
    border-radius: 11px;
  }

  .pm-scroll-view {
    width: 500px;
    height: 33px;
    margin-left: 16px;
    float: left;
  }

  .sv-div {
    height: 33px;
    margin-right: 9px;
    float: left;
  }

  .sv-div-act {
    border-bottom: 1px solid #436EF3;
    /* no */
  }

  .sv-div-text {
    height: 33px;
    line-height: 33px;
    font-size: 13px;
    color: #333333;
    padding: 0 7px;
    text-align: center;
  }

  .sv-div-text-act {
    color: #436EF3;
  }

  .sv-button {
    width: 300px;
    height: 33px;
    float: right;
    margin-right: 16px;
  }

  .svb-button {
    width: 63px;
    height: 21px;
    line-height: 21px;
    text-align: center;
    border: 1px solid #436EF3;
    /* no */
    font-size: 13px;
    color: #436EF3;
    font-weight: 400;
    border-radius: 11px;
    margin-top: 6px;
    margin-left: 20px;
  }

  .svb-derive {
    float: right;
  }

  .svb-refresh {
    float: right;
  }

  .svb-export{
    float: right;
  }

  .pm-listtitle {
    width: calc(100% - 32px);
    height: 28px;
    margin-top: 6px;
    margin-left: 16px;
    background: #F0F0F0;
  }

  .pml-style {
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 13px;
    color: #999999;
    float: left;
  }

  .pml-number {
    width: 5.88%;
  }

  .pml-name {
    width: 4.24%;
  }

  .pml-photo {
    width: 7.27%;
  }

  .pml-sex {
    width: 3.54%;
  }

  .pml-idcard {
    width: 11.51%;
  }

  .pml-phone {
    width: 7.96%;
  }

  .pml-post {
    width: 16.96%;
  }

  .pml-edu {
    width: 14.89%;
  }

  .pml-date {
    width: 11.86%;
  }

  .pml-state {
    width: 7.44%;
  }

  .pml-operation {
    width: 8.45%;
  }

  .xiaoshou img {
    width: 6px;
    height: 10px;
    margin-left: 6px;
  }

  .pml-photo img {
    width: 31px;
    height: 36px;
    background: #F0F0F0;
    vertical-align: top;
    margin-top: 5px;
  }

  .pm-listdetail {
    width: calc(100% - 32px);
    height: 46px;
    margin-left: 16px;
    background: #FFFFFF;
    border-bottom: 1px solid #E7E7E7;
    /* no */
  }

  .pmd-style {
    height: 46px;
    line-height: 46px;
    text-align: center;
    font-size: 11px;
    color: #333333;
    font-weight: 400;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ms-popup {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.8);
  }

  .msp-detailbox {
    width: 50%;
    min-width: 840px;
    height: 80%;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    background: #FFFFFF;
    box-shadow: 0 4px 13px 1px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
  }

  .mspd-title {
    width: calc(100% - 28px);
    margin-left: 14px;
    padding-bottom: 10px;
  }

  .mspdt-title {
    width: 474px;
    height: 32px;
    line-height: 26px;
    margin-top: 13px;
    font-size: 24px;
    color: #333333;
    font-weight: 400;
    float: left;
  }

  .mspd-title img {
    width: 10px;
    height: 10px;
    margin-top: 18px;
    float: right;
  }

  .mspd-detail {
    width: 100%;
    height: calc(100% - 55px - 28px - 23px - 30px);
    overflow-x: hidden;
  }

  .mspd-detail1 {
    width: calc(100% - 42px);
    min-height: 27px;
    margin-left: 21px;
  }

  .mspd-style {
    /*height: 27px;*/
    /*line-height: 27px;*/
    line-height: 16px;
    padding: 8px 0;
    font-size: 16px;
    font-weight: 400;
    float: left;
    word-wrap: break-word;
    word-break: normal;
  }

  .mspd-style2 {
    /*height: 25px;*/
    line-height: 16px;
    padding: 8px 0;
    font-size: 16px;
    font-weight: 400;
    float: left;
    word-wrap: break-word;
    word-break: normal;
  }

  .nr1 {
    width: calc(100% - 16px - 16px - 140px);
  }

  .nr2 {
    width: calc(100% - 60px);
  }

  .mspdtitle {
    color: #999999;
    text-align: justify;
  }

  .mspddetail {
    padding-left: 23px;
    padding-right: 23px;
    color: #333333;
  }

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

  .gx {
    width: 120px;
    text-align: center;
    padding: 4px 0 !important;
  }

  .xm {
    width: 150px;
    text-align: center;
    padding: 4px 0 !important;
  }

  .zzmm {
    width: 180px;
    text-align: center;
    padding: 4px 0 !important;
  }

  .gzdwjzw {
    width: 300px;
    text-align: center;
    padding: 4px 0 !important;
  }

  .shzt {
    width: 120px;
    text-align: center;
    padding: 4px 0 !important;
  }

  .shz {
    width: 150px;
    text-align: center;
    padding: 4px 0 !important;
  }

  .shsj {
    width: 180px;
    text-align: center;
    padding: 4px 0 !important;
  }

  .shly {
    width: 300px;
    text-align: center;
    padding: 4px 0 !important;
  }

  .mspd2l-4 {
    line-height: 25px;
  }

  .mspd-detail2 {
    width: calc(100% - 42px);
    /*height: 150px;*/
    margin-left: 21px;
  }

  .mspd-detail2-left {
    float: left;
    width: calc(100% - 208px);
  }

  .mspd-detail2-right {
    float: right;
    width: 108px;
    height: 138px;
    margin-top: 6px;
    margin-right: 7px;
    background: #C8CDD1;
    border-radius: 2px;
    /* no */
  }

  .mspd2l {
    width: 100%;
    /*height: 25px;*/
  }

  .mspd-buttonbox {
    width: 100%;
    height: 28px;
    margin-top: 23px;
  }

  .mspd-buttonstyle {
    width: 85px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 400;
    border-radius: 14px;
  }

  /*.tgorjj {*/
  /*  margin-left: 118px !important;*/
  /*}*/

  .mspd-reject {
    background: #FF9A2E;
    border: 1px solid #FF9A2E;
    /* no */
    margin-left: calc((100% - 85px - 85px - 85px - 38px - 38px) / 2);
  }

  .mspd-pass {
    background: #436EF3;
    border: 1px solid #436EF3;
    /* no */
    margin-left: 38px;
  }

  .mspd-export {
    background: #02A21C;
    border: 1px solid #436EF3;
    /* no */
    margin-left: 38px;
  }

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
    margin-left: 127px;
    margin-top: 11px;
  }

  input::-webkit-input-placeholder {
    color: #999999;
  }

  .xiaoshou {
    cursor: pointer;
  }
  .zmcl{
    margin-left: 21px;
  }
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
  .swiper_box{
    position: relative;
    overflow: hidden;
  }
  .tool{
    padding: 10px;
  }
  .tool .rotate{
    width: 32px !important;
    height: 32px !important;
    cursor: pointer;
  }
  .close{
    position: relative;
    padding: 10px 20px;
    text-align: right;
    z-index: 9;
  }
  .close img{
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
  .ts1{
    padding: 0px;
  }
  .ts1 .scroll_box{
    max-height: 206px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px 0;
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
  .rotate1{
    transform:rotate(90deg);
    -ms-transform:rotate(90deg); 	/* IE 9 */
    -moz-transform:rotate(90deg); 	/* Firefox */
    -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
    -o-transform:rotate(90deg); 	/* Opera */
  }
  .rotate2{
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);	/* IE 9 */
    -moz-transform:rotate(180deg); 	/* Firefox */
    -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
    -o-transform:rotate(180deg); 	/* Opera */
  }
  .rotate3{
    transform:rotate(270deg);
    -ms-transform:rotate(270deg); 	/* IE 9 */
    -moz-transform:rotate(270deg); 	/* Firefox */
    -webkit-transform:rotate(270deg); /* Safari 和 Chrome */
    -o-transform:rotate(270deg); 	/* Opera */
  }
</style>
