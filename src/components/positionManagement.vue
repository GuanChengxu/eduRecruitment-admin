<template>
  <div>
    <div class="right-box">
      <!-- 标签 -->
      <div class="pom-scroll-view">
        <div v-for="(sl,slidx) in scrollList" :key="slidx">
          <div :class="[currentTab==slidx ? 'psv-div-act' : 'psv-div']" class="psv-div" @click="swichMenu(slidx)">
            <div class="psv-div-text">
              {{sl.name}}
            </div>
          </div>
        </div>
      </div>
      <!-- 备注 -->
      <div class="pom-rdiv">
        <span class="pom-remake" v-show="currentTab == 2">备注：创建相应的科目和单位/学校后，才能创建新的职位</span>
        <span class="pom-remake" v-show="currentTab == 1">备注：创建相应的科目给创建职位选择</span>
        <span class="pom-remake" v-show="currentTab == 0">备注：创建相应的单位学校给创建职位选择</span>
      </div>
      <!-- 职位管理 -->
      <div v-show="currentTab == 2">
        <div class="pom-box">
          <div style="float: left;">
            <!-- 职位列表 -->
            <div class="pom-title-box">
              <div class="pom-title-line"></div>
              <div class="pom-title">职位列表</div>
            </div>
            <!-- 温馨提示 -->
            <div class="pom-hdiv">
              <span class="pom-hint">*温馨提示：创建的岗位供报名人员选择，请谨慎创建和编辑</span>
            </div>
          </div>
          <div style="float: right;">
            <button class="pom-button" @click="showPopup()">新建岗位</button>
            <div v-if="ifIE == false" style="float: left;">
              <button class="pom-button" @click="clickPostFile()">导入</button>
              <input ref="postFile" type="file" class="input_file" @change="getPostFile()">
            </div>
            <div v-else style="float: left;">
              <form id="jobForm" enctype="multipart/form-data" action='http://154.8.201.198:8081/edu/eduRear/eduJob/IEimportData' method='post'
                target='jobIframe' @submit="return saveReport()">
                <span class="pom-button pbs">
                  <input type="hidden" name="token" :value="token" />
                  <input type="hidden" name="applyId" :value="selectListDto.applyId" />
                  <input type="file" name="file" @change="jobSubmit()">
                  导入
                </span>
              </form>
              <iframe name='jobIframe' @load="reloadJob" id="jobIframe" style="display: none;"></iframe>
            </div>
            <button class="pom-button" @click="postExport()">下载模板</button>
          </div>
        </div>
        <!-- 列表标题 -->
        <div class="pom-listtitle">
          <div class="pom-liststyle pom-list-number">序号</div>
          <div class="pom-liststyle pom-list-unit">招聘单位</div>
          <div class="pom-liststyle pom-list-post">招聘岗位</div>
          <div class="pom-liststyle pom-list-nop">招聘人数</div>
          <div class="pom-liststyle pom-list-edu">学历限制</div>
          <div class="pom-liststyle pom-list-operation">操作</div>
        </div>
        <!-- 列表内容 -->
        <div class="pom-listdetail" v-for="(jd,jdidx) in jobData" :key="jdidx">
          <div class="pom-listdstyle pom-list-number">{{jdidx + 1}}</div>
          <div class="pom-listdstyle pom-list-unit">{{jd.unitName}}</div>
          <div class="pom-listdstyle pom-list-post">{{jd.subjectName}}</div>
          <div class="pom-listdstyle pom-list-nop">{{jd.num}}</div>
          <div class="pom-listdstyle pom-list-edu">{{jd.educationName}}</div>
          <div class="pom-listdstyle pom-list-operation">
            <span style="cursor: pointer;" @click="showUpdatePopup(jd)">编辑</span>
            <span @click="deleteJob(jd.jobId)" style="margin-left: 20px;cursor: pointer;">删除</span>
          </div>
        </div>
      </div>
      <!-- 科目管理 -->
      <div v-show="currentTab == 1">
        <div class="pom-box">
          <div style="float: left;">
            <!-- 职位列表 -->
            <div class="pom-title-box">
              <div class="pom-title-line"></div>
              <div class="pom-title">科目列表</div>
            </div>
          </div>
          <div style="float: right;">
            <button class="pom-button" @click="showSubjectPopup()">新建科目</button>
            <div v-if="ifIE == false" style="float: left;">
              <button class="pom-button" @click="clickSubjectFile()">导入</button>
              <input ref="subjectFile" type="file" class="input_file" @change="getSubjectFile()">
            </div>
            <div v-else style="float: left;">
              <form id="subjectForm" enctype="multipart/form-data" action='http://154.8.201.198:8081/edu/eduRear/eduSubject/IEimportData' method='post'
                target='subjectIframe' @submit="return saveReport()">
                <span class="pom-button pbs">
                  <input type="hidden" name="token" :value="token" />
                  <input type="hidden" name="applyId" :value="selectListDto.applyId" />
                  <input type="file" name="file" @change="subjectSubmit()">
                  导入
                </span>
              </form>
              <iframe name='subjectIframe' @load="reloadSubject" id="subjectIframe" style="display: none;"></iframe>
            </div>
            <button class="pom-button" @click="subjectExport()">下载模板</button>
          </div>
        </div>
        <!-- 列表标题 -->
        <div class="pom-listtitle">
          <div class="pom-liststyle pom-km-list-number">序号</div>
          <div class="pom-liststyle pom-km-list-subject">科目</div>
          <div class="pom-liststyle pom-km-list-operation">操作</div>
        </div>
        <!-- 列表内容 -->
        <div class="pom-listdetail" v-for="(sd,sdidx) in subjectData" :key="sdidx">
          <div class="pom-listdstyle pom-km-list-number">{{sdidx + 1}}</div>
          <div class="pom-listdstyle pom-km-list-subject">{{sd.name}}</div>
          <div class="pom-listdstyle pom-km-list-operation">
            <span style="cursor: pointer;" @click="showSubjectUpdatePopup(sd)">编辑</span>
            <span @click="deleteSubject(sd.subjectId)" style="margin-left: 20px;cursor: pointer;">删除</span>
          </div>
        </div>
      </div>
      <!-- 单位/学校 -->
      <div v-show="currentTab == 0">
        <div class="pom-box">
          <div style="float: left;">
            <!-- 职位列表 -->
            <div class="pom-title-box">
              <div class="pom-title-line"></div>
              <div class="pom-title">单位/学校列表</div>
            </div>
          </div>
          <div style="float: right;">
            <button class="pom-button pom-unit-button" @click="showUnitPopup()">新建单位/学校</button>
            <div v-if="ifIE == false" style="float: left;">
              <button class="pom-button" @click="clickUnitFile()">导入</button>
              <input ref="unitFile" type="file" class="input_file" @change="getUnitFile()">
            </div>
            <div v-else style="float: left;">
              <form id="unitForm" enctype="multipart/form-data" action='http://154.8.201.198:8081/edu/eduRear/eduUnit/IEimportData' method='post'
                target='unitIframe' @submit="return saveReport()">
                <span class="pom-button pbs">
                  <input type="hidden" name="token" :value="token" />
                  <input type="hidden" name="applyId" :value="selectListDto.applyId" />
                  <input type="file" name="file" @change="unitSubmit()">
                  导入
                </span>
              </form>
              <iframe name='unitIframe' @load="reloadUser" id="unitIframe" style="display: none;"></iframe>
            </div>
            <button class="pom-button" @click="unitExport()">下载模板</button>
          </div>
        </div>
        <!-- 列表标题 -->
        <div class="pom-listtitle">
          <div class="pom-liststyle pom-ut-list-number">序号</div>
          <div class="pom-liststyle pom-ut-list-unit">单位/学校</div>
          <div class="pom-liststyle pom-ut-list-operation">操作</div>
        </div>
        <!-- 列表内容 -->
        <div class="pom-listdetail" v-for="(ud,udidx) in unitData" :key="udidx">
          <div class="pom-listdstyle pom-ut-list-number">{{udidx + 1}}</div>
          <div class="pom-listdstyle pom-ut-list-unit">{{ud.name}}</div>
          <div class="pom-listdstyle pom-ut-list-operation">
            <span style="cursor: pointer;" @click="showUnitUpdatePopup(ud)">编辑</span>
            <span @click="deleteUnit(ud.unitId)" style="margin-left: 20px;cursor: pointer;">删除</span>
          </div>
        </div>
      </div>
      <!-- 新建职位弹窗 -->
      <div class="pom-mask" v-show="show_popup == 1">
        <div ref="pom_popup" class="pom-popup">
          <!-- 弹窗title -->
          <div class="pom-popup-titlebox">
            <div class="pom-popup-title">{{aoru}}岗位</div>
            <img class="pom-popup-close" src="@/assets/close.png" @click="hidePopup()" />
          </div>
          <!-- 弹窗内容 -->
          <div class="pom-popup-detailbox">
            <div class="ppd-box">
              <div class="ppd-title">招聘单位/学校</div>
              <el-dropdown class="ppd-down" trigger="click" @command="udlHandleCommand">
                <div class="ppddown-div">
                  {{jobUnitName}}<img class="ppddown-img" src="../assets/down.png" />
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(udl,udlidx) in unitDownData" :key="udlidx" :command="udl">{{udl.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="ppd-box">
              <div class="ppd-title">招聘岗位</div>
              <el-dropdown class="ppd-down" trigger="click" @command="sdlHandleCommand">
                <div class="ppddown-div">
                  {{jobSubjectName}}<img class="ppddown-img" src="../assets/down.png" />
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(sdl,sdlidx) in subjectDownData" :key="sdlidx" :command="sdl">{{sdl.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="ppd-box">
              <div class="ppd-title">招聘人数</div>
              <input type="number" class="ppd-down ppd-down-input" v-model="insertJobDto.num" placeholder="请输入招聘人数"
                @focus="insertJobDto.num = ''" />
            </div>
            <div class="ppd-box">
              <div class="ppd-title">学历限制</div>
              <el-dropdown class="ppd-down" trigger="click" @command="cdlHandleCommand">
                <div class="ppddown-div">
                  {{jobCationName}}<img class="ppddown-img" src="../assets/down.png" />
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(cdl,cdlidx) in cationDownData" :key="cdlidx" :command="cdl">{{cdl.education}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <!-- 弹窗按钮 -->
          <button class="pom-popup-botton" @click="insertJob()">确认</button>
        </div>
      </div>
      <!-- 新建学校/单位弹窗 -->
      <div class="pom-mask" v-show="show_unit_popup == 1">
        <div ref="pom_popup2" class="pom-popup2">
          <!-- 弹窗title -->
          <div class="pom-popup-titlebox">
            <div class="pom-popup-title">{{aoru}}单位/学校</div>
            <img class="pom-popup-close" src="@/assets/close.png" @click="hideUnitPopup()" />
          </div>
          <!-- 弹窗内容 -->
          <div class="pom-popup-detailbox2">
            <div class="ppd-box">
              <div class="ppd-title">招聘单位/学校</div>
              <input type="text" class="ppd-down ppd-down-input" v-model="insertUnitDto.name" placeholder="请输入学校名称"
                @focus="insertUnitDto.name = ''" />
            </div>
          </div>
          <!-- 弹窗按钮 -->
          <button class="pom-popup-botton" @click="insertUnit()">确认</button>
        </div>
      </div>
      <!-- 新建科目弹窗 -->
      <div class="pom-mask" v-show="show_subject_popup == 1">
        <div ref="pom_popup3" class="pom-popup2">
          <!-- 弹窗title -->
          <div class="pom-popup-titlebox">
            <div class="pom-popup-title">{{aoru}}科目</div>
            <img class="pom-popup-close" src="@/assets/close.png" @click="hideSubjectPopup()" />
          </div>
          <!-- 弹窗内容 -->
          <div class="pom-popup-detailbox2">
            <div class="ppd-box">
              <div class="ppd-title">科目名称</div>
              <input type="text" class="ppd-down ppd-down-input" v-model="insertSubjectDto.name" placeholder="请输入科目名称"
                @focus="insertSubjectDto.name = ''" />
            </div>
          </div>
          <!-- 弹窗按钮 -->
          <button class="pom-popup-botton" @click="insertSubject()">确认</button>
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
        right_height: '',
        right_width: '',
        currentTab: 0,
        scrollList: [{
            name: '单位/学校管理'
          },
          {
            name: '科目管理'
          },
          {
            name: '职位管理'
          }
        ],
        show_popup: 0,
        pms_subject: '',
        selectListDto: {
          applyId: ''
        },
        jobData: '',
        subjectData: '',
        unitData: '',
        unitDownData: '',
        subjectDownData: '',
        cationDownData: '',
        jobUnitName: '请选择招聘单位/学校',
        jobSubjectName: '请选择招聘岗位',
        jobCationName: '请选择相应的学历限制',
        insertJobDto: {
          'applyId': '',
          'jobId': '',
          'unitId': '',
          'unitName': '',
          'subjectId': '1',
          'subjectName': '',
          'educationId': '1',
          'educationName': '不限',
          'num': 0
        },
        show_unit_popup: 0,
        show_subject_popup: 0,
        insertUnitDto: {
          'applyId': '',
          'unitId': '',
          'name': ''
        },
        insertSubjectDto: {
          'applyId': '',
          'subjectId': '',
          'name': ''
        },
        update_job: 0,
        update_subject: 0,
        update_unit: 0,
        deleteDto: {
          'id': ''
        },
        aoru: '新建',
        ifIE: false,
        token: ''
      }
    },
    created() {},
    mounted() {
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        this.ifIE = true;
      } else {
        this.ifIE = false;
      }
      this.selectListDto.applyId = localStorage.getItem('applyId');
      this.insertJobDto.applyId = localStorage.getItem('applyId');
      this.insertUnitDto.applyId = localStorage.getItem('applyId');
      this.insertSubjectDto.applyId = localStorage.getItem('applyId');
      this.token = localStorage.getItem('token');
      // this.eduApplySet.createBy = this.$route.params.createBy;
      this.getUnitList();
    },
    methods: {
      unitSubmit() {
        var form = document.getElementById("unitForm");
        form.submit();
        form.reset();
        var iframe = document.getElementById("unitIframe");
        var iwindow = iframe.contentWindow;
        var idoc = iwindow.document;
      },
      subjectSubmit() {
        var form = document.getElementById("subjectForm");
        form.submit();
        form.reset();
        var iframe = document.getElementById("subjectIframe");
        var iwindow = iframe.contentWindow;
        var idoc = iwindow.document;
      },
      jobSubmit() {
        var form = document.getElementById("jobForm");
        form.submit();
        form.reset();
        var iframe = document.getElementById("jobIframe");
        var iwindow = iframe.contentWindow;
        var idoc = iwindow.document;
      },
      reloadUser() {
        var content = document.getElementById('unitIframe').contentDocument.body.innerHTML;
        if (content == '' || content == null || content == undefined) {
          
        } else {
          var obj = JSON.parse(content);
          if (obj.code == '200') {
            this.$message('上传成功');
            this.getUnitList();
          } else if (obj.code == '500') {
            if (obj.msg == '您的Session时效性已过，请重新登录!') {
              this.$message(obj.msg);
              localStorage.removeItem('token');
              this.$router.replace('/');
            } else {
              this.$message(obj.msg);
            }
          }
        }
      },
      reloadSubject() {
        var content = document.getElementById('subjectIframe').contentDocument.body.innerHTML;
        if (content == '' || content == null || content == undefined) {
          
        } else {
          var obj = JSON.parse(content);
          if (obj.code == '200') {
            this.$message('上传成功');
            this.getSubjectList();
          } else if (obj.code == '500') {
            if (obj.msg == '您的Session时效性已过，请重新登录!') {
              this.$message(obj.msg);
              localStorage.removeItem('token');
              this.$router.replace('/');
            } else {
              this.$message(obj.msg);
            }
          }
        }
      },
      reloadJob() {
        var content = document.getElementById('jobIframe').contentDocument.body.innerHTML;
        if (content == '' || content == null || content == undefined) {
          
        } else {
          var obj = JSON.parse(content);
          if (obj.code == '200') {
            this.$message('上传成功');
            this.getPostList();
          } else if (obj.code == '500') {
            if (obj.msg == '您的Session时效性已过，请重新登录!') {
              this.$message(obj.msg);
              localStorage.removeItem('token');
              this.$router.replace('/');
            } else {
              this.$message(obj.msg);
            }
          }
        }
      },
      swichMenu: async function(current) { //点击其中一个 menu
        if (this.currentTab == current) {

        } else {
          this.currentTab = current;
        }
        if (this.currentTab == 2) {
          this.getPostList();
        } else if (this.currentTab == 1) {
          this.getSubjectList();
        } else if (this.currentTab == 0) {
          this.getUnitList()
        }
      },
      showPopup() {
        this.getUnitDownList();
        this.getSubjectDownList();
        this.getCationDownList();
        this.show_popup = 1;
        this.update_job = 0;
        this.insertJobDto.jobId = '';
        this.insertJobDto.unitId = '';
        this.insertJobDto.unitName = '';
        this.insertJobDto.subjectId = '';
        this.insertJobDto.subjectName = '';
        this.insertJobDto.educationId = '1';
        this.insertJobDto.educationName = '不限';
        this.insertJobDto.num = 0;
        this.jobCationName = '请选择相应的学历限制';
        this.jobUnitName = '请选择招聘单位/学校';
        this.jobSubjectName = '请选择招聘岗位';
        this.aoru = '新建';
      },
      hidePopup() {
        this.show_popup = 0;
      },
      showUnitPopup() {
        this.show_unit_popup = 1;
        this.update_unit = 0;
        this.insertUnitDto.unitId = '';
        this.insertUnitDto.name = '';
        this.jobUnitName = '请选择招聘单位/学校';
        this.aoru = '新建';
      },
      hideUnitPopup() {
        this.show_unit_popup = 0;
      },
      showSubjectPopup() {
        this.show_subject_popup = 1;
        this.update_subject = 0;
        this.insertSubjectDto.subjectId = '';
        this.insertSubjectDto.name = '';
        this.jobSubjectName = '请选择招聘岗位';
        this.aoru = '新建';
      },
      hideSubjectPopup() {
        this.show_subject_popup = 0;
      },
      showUpdatePopup(jd) {
        this.getUnitDownList();
        this.getSubjectDownList();
        this.getCationDownList();
        this.show_popup = 1;
        this.insertJobDto.jobId = jd.jobId;
        this.insertJobDto.unitId = jd.unitId;
        this.insertJobDto.unitName = jd.unitName;
        this.insertJobDto.subjectId = jd.subjectId;
        this.insertJobDto.subjectName = jd.subjectName;
        this.insertJobDto.educationId = jd.educationId
        this.insertJobDto.educationName = jd.educationName
        this.insertJobDto.num = jd.num;
        this.jobUnitName = jd.unitName;
        this.jobSubjectName = jd.subjectName;
        this.jobCationName = jd.educationName;
        this.update_job = 1;
        this.aoru = '修改';
      },
      showSubjectUpdatePopup(sd) {
        this.show_subject_popup = 1;
        this.insertSubjectDto.name = sd.name;
        this.insertSubjectDto.subjectId = sd.subjectId;
        this.update_subject = 1;
        this.aoru = '修改';
      },
      showUnitUpdatePopup(ud) {
        this.show_unit_popup = 1;
        this.insertUnitDto.name = ud.name;
        this.insertUnitDto.unitId = ud.unitId;
        this.update_unit = 1;
        this.aoru = '修改';
      },
      udlHandleCommand(command) {
        this.insertJobDto.unitId = command.unitId;
        this.insertJobDto.unitName = command.name;
        this.jobUnitName = command.name;
      },
      sdlHandleCommand(command) {
        this.insertJobDto.subjectId = command.subjectId;
        this.insertJobDto.subjectName = command.name;
        this.jobSubjectName = command.name;
      },
      cdlHandleCommand(command) {
        this.insertJobDto.educationId = command.educationId;
        this.insertJobDto.educationName = command.education;
        this.jobCationName = command.education;
      },
      // 职位管理
      getPostList() {
        var that = this;
        axios({
            method: 'post',
            url: 'http://154.8.201.198:8081/edu/eduRear/eduJob/list',
            data: qs.stringify(that.selectListDto),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.jobData = res.data.data.rows;
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
      // 科目管理
      getSubjectList() {
        var that = this;
        axios({
            method: 'post',
            url: 'http://154.8.201.198:8081/edu/eduRear/eduSubject/list',
            data: qs.stringify(that.selectListDto),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.subjectData = res.data.rows;
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
      // 单位/学校管理
      getUnitList() {
        var that = this;
        axios({
            method: 'post',
            url: 'http://154.8.201.198:8081/edu/eduRear/eduUnit/list',
            data: qs.stringify(that.selectListDto),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.unitData = res.data.rows;
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
      // 导出职位模板
      postExport() {
        axios({
            method: 'post',
            url: 'http://154.8.201.198:8081/edu/eduRear/eduJob/export',
            headers: {
              token: localStorage.getItem('token')
            },
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                var rdm = encodeURI(res.data.msg);
                var url = 'http://154.8.201.198:8081/edu/common/download?fileName=' + rdm + '&delete=true';
                window.location.href = url;
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
      // 导出科目模板
      subjectExport() {
        axios({
            method: 'post',
            url: 'http://154.8.201.198:8081/edu/eduRear/eduSubject/export',
            headers: {
              token: localStorage.getItem('token')
            },
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                var rdm = encodeURI(res.data.msg);
                var url = 'http://154.8.201.198:8081/edu/common/download?fileName=' + rdm + '&delete=true';
                window.location.href = url;
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
      // 导出学校模板
      unitExport() {
        axios({
            method: 'post',
            url: 'http://154.8.201.198:8081/edu/eduRear/eduUnit/export',
            headers: {
              token: localStorage.getItem('token')
            },
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                var rdm = encodeURI(res.data.msg);
                var url = 'http://154.8.201.198:8081/edu/common/download?fileName=' + rdm + '&delete=true';
                window.location.href = url;
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
      // 点击职位导入
      clickPostFile() {
        this.$refs.postFile.dispatchEvent(new MouseEvent('click'))
      },
      // 导入职位
      getPostFile() {
        var that = this;
        var inputFile = this.$refs.postFile.files[0];
        var formData = new FormData()
        formData.append('applyId', localStorage.getItem('applyId'));
        formData.append('file', inputFile);
        axios({
            method: 'post',
            url: 'http://154.8.201.198:8081/edu/eduRear/eduJob/importData',
            data: formData,
            headers: {
              token: localStorage.getItem('token')
            },
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.$refs.postFile.value = '';
                that.$message('导入成功');
                that.getPostList();
              } else if (res.data.code == 500) {
                if (res.data.msg == '您的Session时效性已过，请重新登录!') {
                  that.$message(res.data.msg);
                  localStorage.removeItem('token');
                  that.$router.replace('/');
                } else {
                  that.$refs.postFile.value = '';
                  that.$message(res.data.msg);
                }
              }
            }
          })
          .catch(function() {
            that.$message('导入失败，请检查文件是否大于50M或内容是否有误');
          });
      },
      // 点击科目导入
      clickSubjectFile() {
        this.$refs.subjectFile.dispatchEvent(new MouseEvent('click'))
      },
      // 导入科目
      getSubjectFile() {
        var that = this;
        var inputFile = this.$refs.subjectFile.files[0];
        var formData = new FormData()
        formData.append('applyId', localStorage.getItem('applyId'));
        formData.append('file', inputFile);
        axios({
            method: 'post',
            url: 'http://154.8.201.198:8081/edu/eduRear/eduSubject/importData',
            data: formData,
            headers: {
              token: localStorage.getItem('token')
            },
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.$refs.subjectFile.value = '';
                that.$message('导入成功');
                that.getSubjectList();
              } else if (res.data.code == 500) {
                if (res.data.msg == '您的Session时效性已过，请重新登录!') {
                  that.$message(res.data.msg);
                  localStorage.removeItem('token');
                  that.$router.replace('/');
                } else {
                  that.$refs.subjectFile.value = '';
                  that.$message(res.data.msg);
                }
              }
            }
          })
          .catch(function() {
            that.$message('导入失败，请检查文件是否大于50M或内容是否有误');
          });
      },
      // 点击单位/学校导入
      clickUnitFile() {
        if (this.ifIE == false) {
          this.$refs.unitFile.dispatchEvent(new MouseEvent('click'))
        } else {

        }
      },
      // 导入单位/学校
      getUnitFile() {
        var that = this;
        var inputFile = this.$refs.unitFile.files[0];
        var formData = new FormData()
        formData.append('applyId', localStorage.getItem('applyId'));
        formData.append('file', inputFile);
        axios({
            method: 'post',
            url: 'http://154.8.201.198:8081/edu/eduRear/eduUnit/importData',
            data: formData,
            headers: {
              token: localStorage.getItem('token')
            },
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.$refs.unitFile.value = '';
                that.$message('导入成功');
                that.getUnitList();
              } else if (res.data.code == 500) {
                if (res.data.msg == '您的Session时效性已过，请重新登录!') {
                  that.$message(res.data.msg);
                  localStorage.removeItem('token');
                  that.$router.replace('/');
                } else {
                  that.$refs.unitFile.value = '';
                  that.$message(res.data.msg);
                }
              }
            }
          })
          .catch(function() {
            that.$message('导入失败，请检查文件是否大于50M或内容是否有误');
          });
      },
      // 获取单位/学校下拉列表
      getUnitDownList() {
        var that = this;
        axios({
            method: 'post',
            url: 'http://154.8.201.198:8081/edu/eduRear/eduUnit/selectEduUnitList',
            data: qs.stringify(that.selectListDto),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.unitDownData = res.data.data;
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
      // 获取科目下拉列表
      getSubjectDownList() {
        var that = this;
        axios({
            method: 'post',
            url: 'http://154.8.201.198:8081/edu/eduRear/eduSubject/selectEduSubjectList',
            data: qs.stringify(that.selectListDto),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.subjectDownData = res.data.data;
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
      getCationDownList() {
        var that = this;
        axios({
            method: 'post',
            url: 'http://154.8.201.198:8081/edu/eduRear/eduJob/eduCationList',
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.cationDownData = res.data.data;
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
      insertJob() {
        var that = this;
        if (that.update_job == 0) {
          if (that.insertJobDto.unitId == '') {
            that.$message('请选择招聘单位/学校');
          } else if (that.insertJobDto.subjectId == '') {
            that.$message('请选择岗位');
          } else if (that.insertJobDto.educationId == '') {
            that.$message('请选择学历');
          } else if (that.insertJobDto.num <= 0) {
            that.$message('招聘人数不能小于0');
          } else if (that.insertJobDto.num > 2147483647) {
            that.$message('招聘人数超过最大值');
          } else if ((that.insertJobDto.num + '').indexOf('.') != -1) {
            that.$message('招聘人数必须是整数');
          } else {
            axios({
                method: 'post',
                url: 'http://154.8.201.198:8081/edu/eduRear/eduJob/insertEduJob',
                data: qs.stringify(that.insertJobDto),
                headers: {
                  token: localStorage.getItem('token')
                }
              })
              .then(function(res) {
                if (res.status == 200) {
                  if (res.data.code == 200) {
                    that.$message('添加成功');
                    that.getPostList();
                    that.show_popup = 0;
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
        } else if (that.update_job == 1) {
          if (that.insertJobDto.unitId == '') {
            that.$message('请选择招聘单位/学校');
          } else if (that.insertJobDto.subjectId == '') {
            that.$message('请选择岗位');
          } else if (that.insertJobDto.educationId == '') {
            that.$message('请选择学历');
          } else if (that.insertJobDto.num <= 0) {
            that.$message('招聘人数不能小于0');
          } else if (that.insertJobDto.num > 2147483647) {
            that.$message('招聘人数超过最大值');
          } else if ((that.insertJobDto.num + '').indexOf('.') != -1) {
            that.$message('招聘人数必须是整数');
          } else {
            axios({
                method: 'post',
                url: 'http://154.8.201.198:8081/edu/eduRear/eduJob/updateEduJob',
                data: qs.stringify(that.insertJobDto),
                headers: {
                  token: localStorage.getItem('token')
                }
              })
              .then(function(res) {
                if (res.status == 200) {
                  if (res.data.code == 200) {
                    that.$message('修改成功');
                    that.getPostList();
                    that.show_popup = 0;
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
        }
      },
      // 新增单位/学校
      insertUnit() {
        var that = this;
        if (that.update_unit == 0) {
          if (that.insertUnitDto.name == '' || that.insertUnitDto.name == null || that.insertUnitDto.name.replace(
              /\s*/g, "") == "") {
            that.$message('请输入招聘单位/学校');
          } else if (that.insertUnitDto.name.indexOf(" ") != -1) {
            that.$message('单位/学校名称不能包含空格')
          } else if (that.insertUnitDto.name.length > 50) {
            that.$message('招聘单位/学校名称只能在50字以内');
          } else {
            axios({
                method: 'post',
                url: 'http://154.8.201.198:8081/edu/eduRear/eduUnit/insertEduUnit',
                data: qs.stringify(that.insertUnitDto),
                headers: {
                  token: localStorage.getItem('token')
                }
              })
              .then(function(res) {
                if (res.status == 200) {
                  if (res.data.code == 200) {
                    that.$message('添加成功');
                    that.getUnitList();
                    that.show_unit_popup = 0;
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
        } else if (that.update_unit == 1) {
          if (that.insertUnitDto.name == '' || that.insertUnitDto.name == null || that.insertUnitDto.name.replace(
              /\s*/g, "") == "") {
            that.$message('请输入招聘单位/学校');
          } else if (that.insertUnitDto.name.indexOf(" ") != -1) {
            that.$message('单位/学校名称不能包含空格')
          } else if (that.insertUnitDto.name.length > 50) {
            that.$message('招聘单位/学校名称只能在50字以内');
          } else {
            axios({
                method: 'post',
                url: 'http://154.8.201.198:8081/edu/eduRear/eduUnit/updateEduUnit',
                data: qs.stringify(that.insertUnitDto),
                headers: {
                  token: localStorage.getItem('token')
                }
              })
              .then(function(res) {
                if (res.status == 200) {
                  if (res.data.code == 200) {
                    that.$message('修改成功');
                    that.getUnitList();
                    that.show_unit_popup = 0;
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
        }

      },
      // 新增科目
      insertSubject() {
        var that = this;
        if (that.update_subject == 0) {
          if (that.insertSubjectDto.name == '' || that.insertSubjectDto.name == null || that.insertSubjectDto.name.replace(
              /\s*/g, "") == "") {
            that.$message('请输入科目名称');
          } else if (that.insertSubjectDto.name.indexOf(" ") != -1) {
            that.$message('科目名称不能包含空格')
          } else if (that.insertSubjectDto.name.length > 50) {
            that.$message('科目名称只能在50字以内')
          } else {
            axios({
                method: 'post',
                url: 'http://154.8.201.198:8081/edu/eduRear/eduSubject/insertSubject',
                data: qs.stringify(that.insertSubjectDto),
                headers: {
                  token: localStorage.getItem('token')
                }
              })
              .then(function(res) {
                if (res.status == 200) {
                  if (res.data.code == 200) {
                    that.$message('添加成功');
                    that.getSubjectList();
                    that.show_subject_popup = 0;
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
        } else if (that.update_subject == 1) {
          if (that.insertSubjectDto.name == '' || that.insertSubjectDto.name == null || that.insertSubjectDto.name.replace(
              /\s*/g, "") == "") {
            that.$message('请输入科目名称');
          } else if (that.insertSubjectDto.name.indexOf(" ") != -1) {
            that.$message('科目名称不能包含空格')
          } else if (that.insertSubjectDto.name.length > 50) {
            that.$message('科目名称只能在50字以内')
          } else {
            axios({
                method: 'post',
                url: 'http://154.8.201.198:8081/edu/eduRear/eduSubject/updateSubject',
                data: qs.stringify(that.insertSubjectDto),
                headers: {
                  token: localStorage.getItem('token')
                }
              })
              .then(function(res) {
                if (res.status == 200) {
                  if (res.data.code == 200) {
                    that.$message('修改成功');
                    that.getSubjectList();
                    that.show_subject_popup = 0;
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
        }
      },
      deleteJob(id) {
        var that = this;
        that.deleteDto.id = id;
        that.$confirm('是否要删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
              method: 'post',
              url: 'http://154.8.201.198:8081/edu/eduRear/eduJob/delEduJob',
              data: qs.stringify(that.deleteDto),
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(function(res) {
              if (res.status == 200) {
                if (res.data.code == 200) {
                  that.$message('删除成功');
                  that.getPostList();
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
        }).catch(() => {});
      },
      deleteSubject(id) {
        var that = this;
        that.deleteDto.id = id;
        that.$confirm('是否要删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
              method: 'post',
              url: 'http://154.8.201.198:8081/edu/eduRear/eduSubject/delEduSubject',
              data: qs.stringify(that.deleteDto),
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(function(res) {
              if (res.status == 200) {
                if (res.data.code == 200) {
                  that.$message('删除成功');
                  that.getSubjectList();
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
        }).catch(() => {});
      },
      deleteUnit(id) {
        var that = this;
        that.deleteDto.id = id;
        that.$confirm('是否要删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
              method: 'post',
              url: 'http://154.8.201.198:8081/edu/eduRear/eduUnit/delEduUnit',
              data: qs.stringify(that.deleteDto),
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(function(res) {
              if (res.status == 200) {
                if (res.data.code == 200) {
                  that.$message('删除成功');
                  that.getUnitList();
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
        }).catch(() => {});
      }
    }
  }
</script>

<style>
  .right-box {
    width: calc(100vw - 145px - 34px);
    height: calc(100vh - 57px - 34px);
    min-width: calc(1366px - 145px - 34px);
    background: #FFFFFF;
    margin-top: 12px;
    margin-left: 9px;
  }

  .pom-scroll-view {
    width: calc(100% - 32px);
    height: 26px;
    margin-left: 16px;
    margin-top: 14px;
  }

  .psv-div {
    height: 26px;
    margin-right: 44px;
    float: left;
    cursor: pointer;
  }

  .psv-div-act {
    border-bottom: 1px solid #436EF3;
    /* no */
  }

  .psv-div-text {
    height: 26px;
    line-height: 26px;
    font-size: 13px;
    color: #333333;
    text-align: center;
    font-weight: 400;
  }

  .pom-rdiv {
    width: calc(100% - 32px);
    margin-top: 12px;
    margin-left: 16px;
  }

  .pom-remake {
    font-size: 10px;
    color: #FF3838;
  }

  .pom-box {
    width: calc(100% - 32px);
    height: 54px;
    margin-top: 5px;
    margin-left: 16px;
  }

  .pom-title-box {
    height: 54px;
    float: left;
  }

  .pom-title-line {
    width: 2px;
    height: 12px;
    background: #436DF3;
    float: left;
    margin-top: 20px;
  }

  .pom-title {
    height: 54px;
    line-height: 54px;
    margin-left: 7px;
    font-size: 13px;
    color: #333333;
    float: left;
    text-align: left;
  }

  .pom-hdiv {
    height: 54px;
    line-height: 54px;
    margin-left: 20px;
    float: left;
  }

  .pom-hint {
    font-size: 10px;
    color: #666666;
  }

  .pom-button {
    width: 72px;
    /* height: 21px; */
    line-height: 21px;
    text-align: center;
    border-radius: 11px;
    border: 1px solid #436EF3;
    /* no */
    font-size: 13px;
    color: #436EF3;
    float: left;
    margin-left: 9px;
    margin-top: 16px;
    font-weight: 400;
    cursor: pointer;
  }

  .pbs {
    position: relative;
  }

  .pbs input {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    font-size: 13px;
    width: 100%;
    height: 100%;
  }

  .pom-listtitle {
    width: calc(100% - 32px);
    height: 28px;
    margin-left: 16px;
    background: #F0F0F0;
  }

  .pom-liststyle {
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 13px;
    font-weight: 400;
    color: #999999;
    float: left;
  }

  .pom-listdetail {
    width: calc(100% - 32px);
    height: 28px;
    margin-left: 16px;
    border-bottom: 1px dashed #E7E7E7;
    /* no */
  }

  .pom-listdstyle {
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 11px;
    font-weight: 400;
    color: #333333;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pom-list-number {
    width: 5.88%;
  }

  .pom-list-unit {
    width: 26.58%;
  }

  .pom-list-post {
    width: 20.69%;
  }

  .pom-list-nop {
    width: 15.32%;
  }

  .pom-list-edu {
    width: 16.7%;
  }

  .pom-list-operation {
    width: 14.83%;
  }

  .pom-km-list-number {
    width: 6.83%;
  }

  .pom-km-list-subject {
    width: 42.51%;
  }

  .pom-km-list-operation {
    width: 21.21%;
    float: right !important;
  }

  .pom-unit-button {
    width: 101px;
  }

  .pom-ut-list-number {
    width: 7.35%;
  }

  .pom-ut-list-unit {
    width: 42.16%;
  }

  .pom-ut-list-operation {
    width: 20.86%;
    float: right !important;
  }

  .pom-popup {
    width: 455px;
    height: 356px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -178px;
    margin-left: -227.5px;
    background: #FFFFFF;
    box-shadow: 0 4px 13px 1px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
  }

  .pom-popup2 {
    width: 455px;
    height: 191px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -95.5px;
    margin-left: -227.5px;
    background: #FFFFFF;
    box-shadow: 0 4px 13px 1px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
  }

  .pom-popup-titlebox {
    width: 421px;
    height: 41px;
    margin: 0 17px;
    margin-top: 8px;
  }

  .pom-popup-title {
    float: left;
    height: 41px;
    line-height: 41px;
    font-size: 15px;
    margin-left: 3px;
    color: #333333;
  }

  .pom-popup-close {
    float: right;
    width: 10px;
    height: 10px;
    margin-top: 16px;
    cursor: pointer;
  }

  .pom-popup-detailbox {
    width: 243px;
    height: 220px;
    margin-left: 112px;
  }

  .pom-popup-detailbox2 {
    width: 243px;
    height: 55px;
    margin-left: 112px;
  }

  .ppd-box {
    width: 243px;
    height: 55px;
  }

  .ppd-title {
    width: 235px;
    height: 23px;
    line-height: 23px;
    margin-left: 4px;
    padding-top: 8px;
    font-size: 11px;
    font-weight: 300;
    color: #666666;
  }

  .ppd-down {
    width: 243px;
    height: 23px;
    line-height: 23px;
    font-size: 11px;
    font-weight: 300;
    color: #333333;
    border-bottom: 1px solid #BDBDBD;
    /* no */
  }

  input::-webkit-input-placeholder {
    color: #999999;
  }

  .ppddown-div {
    width: 243px;
    height: 23px;
    line-height: 23px;
    float: left;
    padding-left: 4px;
  }

  .ppddown-img {
    width: 10px;
    height: 6px;
    float: right;
    margin-right: 4px;
    margin-top: 8px;
  }

  .ppd-down-input {
    padding-left: 4px;
  }

  .pom-popup-botton {
    width: 85px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border: 1px solid #436EF3;
    /* no */
    background: #FFFFFF;
    font-size: 13px;
    color: #436EF3;
    margin-top: 26px;
    margin-left: 190px;
    border-radius: 14px;
    cursor: pointer;
  }

  .pom-mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .input_file {
    display: none;
  }
</style>
