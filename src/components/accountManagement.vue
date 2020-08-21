<template>
  <div>
    <div class="right-box">
      <!-- title -->
      <div class="am-box" style="width: 100%;">
        <div class="am-title-box">
          <div class="am-title-line"></div>
          <div class="am-title">账号列表</div>
        </div>
      </div>
      <!-- 标签 -->
      <div style="height: 25px;margin-top: 11px;width: 100%;">
        <!-- 标签 -->
        <div class="am-scroll-view">
          <div v-show="grade == null || grade == 'null' || grade == ''" :class="[currentTab==0 ? 'amsv-div-act' : 'amsv-div']" class="amsv-div" @click="swichMenu(0)">
            <div class="amsv-div-text">本次招聘一级管理账号</div>
          </div>
          <div v-show="grade == '1' || grade == null || grade == 1 || grade == 'null'" :class="[currentTab==1 ? 'amsv-div-act' : 'amsv-div']" class="amsv-div" @click="swichMenu(1)">
            <div class="amsv-div-text">各单位/学校二级账号</div>
          </div>
          <div v-show="grade != 3 || grade != '3'" :class="[currentTab==2 ? 'amsv-div-act' : 'amsv-div']" class="amsv-div" @click="swichMenu(2)">
            <div class="amsv-div-text">三级普通管理账号</div>
          </div>
        </div>
        <!-- 创建账号按钮 -->
        <div class="amsv-button">
          <button class="amsvb-button" @click="showPopup()">创建账号</button>
        </div>
      </div>
      <!-- 一级账号管理 -->
      <div v-show="currentTab == 0 && grade == 'null'">
        <!-- 列表title -->
        <div class="am-listtitle">
          <div class="am-liststyle am-list-number">序号</div>
          <div class="am-liststyle am-list-user">账号</div>
          <div class="am-liststyle am-list-pwd">密码</div>
          <div class="am-liststyle am-list-operation">操作</div>
        </div>
        <!-- 列表详情 -->
        <div class="am-listdetail" v-for="(first,firstidx) in firstData" :key="firstidx">
          <div class="am-listdstyle am-list-number">{{firstidx + 1}}</div>
          <div class="am-listdstyle am-list-user">{{first.name}}</div>
          <div class="am-listdstyle am-list-pwd">{{first.password}}</div>
          <div class="am-listdstyle am-list-operation">
            <span style="cursor: pointer;" @click="updatePopup(first)">账号修改</span>
            <span style="margin-left: 20px;cursor: pointer;" @click="deleteUser(first.userId,first.grade)">删除</span>
          </div>
        </div>
      </div>
      <!-- 二级账号管理 -->
      <div v-show="currentTab == 1 && (grade == '1' || grade == 'null')">
        <!-- 列表title -->
        <div class="am-listtitle">
          <div class="am-liststyle am-list-number2">序号</div>
          <div class="am-liststyle am-list-user2">账号</div>
          <div class="am-liststyle am-list-pwd2">密码</div>
          <div class="am-liststyle am-list-school2">学校</div>
          <div class="am-liststyle am-list-creator2">创建者</div>
          <div class="am-liststyle am-list-operation2">操作</div>
        </div>
        <!-- 列表详情 -->
        <div class="am-listdetail" v-for="(second,secondidx) in secondData" :key="secondidx">
          <div class="am-listdstyle am-list-number2">{{secondidx + 1}}</div>
          <div class="am-listdstyle am-list-user2">{{second.name}}</div>
          <div class="am-listdstyle am-list-pwd2">{{second.password}}</div>
          <div class="am-listdstyle am-list-school2">{{second.unitName}}</div>
          <div class="am-listdstyle am-list-creator2">{{second.createName}}</div>
          <div class="am-listdstyle am-list-operation2">
            <span style="cursor: pointer;" @click="updatePopup(second)">账号修改</span>
            <span style="margin-left: 20px;cursor: pointer;" @click="deleteUser(second.userId,second.grade)">删除</span>
          </div>
        </div>
      </div>
      <div v-show="currentTab == 2 && grade != '3'">
        <!-- 列表title -->
        <div class="am-listtitle">
          <div class="am-liststyle am-list-number3">序号</div>
          <div class="am-liststyle am-list-user3">账号</div>
          <div class="am-liststyle am-list-pwd3">密码</div>
          <div class="am-liststyle am-list-creator3">创建者</div>
          <div class="am-liststyle am-list-school3">所属单位/学校</div>
          <div class="am-liststyle am-list-post3">管理报名职位</div>
          <div class="am-liststyle am-list-operation3">操作</div>
        </div>
        <!-- 列表详情 -->
        <div class="am-listdetail" v-for="(third,thirdidx) in thirdData" :key="thirdidx">
          <div class="am-listdstyle am-list-number3">{{thirdidx + 1}}</div>
          <div class="am-listdstyle am-list-user3">{{third.name}}</div>
          <div class="am-listdstyle am-list-pwd3">{{third.password}}</div>
          <div class="am-listdstyle am-list-creator3">{{third.createName}}</div>
          <div class="am-listdstyle am-list-school3">{{third.unitName}}</div>
          <div class="am-listdstyle am-list-post3">{{third.unitName}} <span v-for="(subjectName,snidx) in third.subjectName1" :key="snidx">{{subjectName}}<span v-if="snidx < third.subjectLength-1">,</span></span></div>
          <div class="am-listdstyle am-list-operation3">
            <span style="cursor: pointer;" @click="updatePopup(third)">账号修改</span>
            <span style="margin-left: 20px;cursor: pointer;" @click="deleteUser(third.userId,third.grade)">删除</span>
          </div>
        </div>
      </div>
      <!-- 弹窗1 -->
      <div class="am-mask" v-show="show_popup0 == 1">
        <div ref="am_popup" class="am-popup">
          <!-- 弹窗title -->
          <div class="am-popup-titlebox">
            <div class="am-popup-title">{{aoru}}一级管理账号</div>
            <img class="am-popup-close" src="@/assets/close.png" @click="hidePopup()"/>
          </div>
          <!-- 弹窗内容 -->
          <div class="am-popup-detail">
            <div class="am-popup-dbox">
              <div class="am-popup-dboxtitle">账号</div>
              <input class="am-popup-dboxinput" type="text" v-model="addDto.name" placeholder="请输入账号" @focus="addDto.name = ''"/>
            </div>
            <div class="am-popup-dbox">
              <div class="am-popup-dboxtitle">密码</div>
              <input class="am-popup-dboxinput" type="text" v-model="addDto.password" placeholder="请输入密码" @focus="addDto.password = ''"/>
            </div>
          </div>
          <!-- 弹窗按钮 -->
          <button class="am-popup-botton" @click="addUser(addDto)">确认</button>
        </div>
      </div>
      <!-- 弹窗2 -->
      <div class="am-mask" v-show="show_popup1 == 1">
        <div ref="am_popup2" class="am-popup2">
          <!-- 弹窗title -->
          <div class="am-popup-titlebox">
            <div class="am-popup-title">{{aoru}}二级管理账号</div>
            <img class="am-popup-close" src="@/assets/close.png" @click="hidePopup()"/>
          </div>
          <!-- 弹窗内容 -->
          <div class="am-popup-detail2">
            <div class="am-popup-dbox">
              <div class="am-popup-dboxtitle">账号</div>
              <input class="am-popup-dboxinput" type="text" v-model="addDto.name" placeholder="请输入账号" @focus="addDto.name = ''"/>
            </div>
            <div class="am-popup-dbox">
              <div class="am-popup-dboxtitle">密码</div>
              <input class="am-popup-dboxinput" type="text" v-model="addDto.password" placeholder="请输入密码" @focus="addDto.password = ''"/>
            </div>
            <div class="am-popup-dbox">
              <div class="am-popup-dboxtitle">选择分配学校/单位</div>
              <el-dropdown class="am-popup-dboxinput" trigger="click" @command="secondHandleCommand">
                <div class="amdown-div">
                  {{secondUnitName}}<img class="amdown-img" src="../assets/down.png" />
                </div>
                <el-dropdown-menu class="ts1" slot="dropdown">
                  <div class="scroll_box">
                    <el-dropdown-item v-for="(unit,uidx) in unitListData" :key="uidx" :command="unit">{{unit.unitName}}</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <!-- 弹窗按钮 -->
          <button class="am-popup-botton" @click="addUser(addDto)">确认</button>
        </div>
      </div>
      <!-- 弹窗3 -->
      <div class="am-mask" v-show="show_popup2 == 1">
        <div ref="am_popup3" class="am-popup3">
          <!-- 弹窗title -->
          <div class="am-popup-titlebox">
            <div class="am-popup-title">{{aoru}}三级普通账号</div>
            <img class="am-popup-close" src="@/assets/close.png" @click="hidePopup()"/>
          </div>
          <!-- 弹窗内容 -->
          <div class="am-popup-detail3" v-show="grade != 2 || grade != '2'">
            <div class="am-popup-dbox">
              <div class="am-popup-dboxtitle">账号</div>
              <input class="am-popup-dboxinput" type="text" v-model="addDto.name" placeholder="请输入账号" @focus="addDto.name = ''"/>
            </div>
            <div class="am-popup-dbox">
              <div class="am-popup-dboxtitle">密码</div>
              <input class="am-popup-dboxinput" type="text" v-model="addDto.password" placeholder="请输入密码" @focus="addDto.password = ''"/>
            </div>
            <div class="am-popup-dbox">
              <div class="am-popup-dboxtitle">选择分配学校/单位</div>
              <el-dropdown class="am-popup-dboxinput" trigger="click" @command="thirdHandleCommand">
                <div class="amdown-div">
                  {{thirdUnitName}}<img class="amdown-img" src="../assets/down.png" />
                </div>
                <el-dropdown-menu class="ts1" slot="dropdown">
                  <div class="scroll_box">
                    <el-dropdown-item v-for="(unit,uidx) in unitListData" :key="uidx" :command="unit">{{unit.unitName}}</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="am-popup-dbox noheight" v-show="addDto.unitId != ''">
              <div class="am-popup-dboxtitle">选择分配职位</div>
              <el-checkbox-group v-model="checkboxGroup1">
                <el-checkbox-button class="am-popup-checkbox" @change="clickJobButton()" v-for="(subject,subidx) in subjectListData" :label="subject"  :key="subidx">{{subject.subjectName}}</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </div>
          <div class="am-popup-detail3" v-show="grade == 2 || grade == '2'">
            <div class="am-popup-dbox">
              <div class="am-popup-dboxtitle">账号</div>
              <input class="am-popup-dboxinput" type="text" v-model="addDto.name" placeholder="请输入账号" @focus="addDto.name = ''"/>
            </div>
            <div class="am-popup-dbox">
              <div class="am-popup-dboxtitle">密码</div>
              <input class="am-popup-dboxinput" type="text" v-model="addDto.password" placeholder="请输入密码" @focus="addDto.password = ''"/>
            </div>
            <div class="am-popup-dbox noheight">
              <div class="am-popup-dboxtitle">选择分配职位</div>
              <el-checkbox-group v-model="checkboxGroup1">
                <el-checkbox-button class="am-popup-checkbox" @change="clickJobButton()" v-for="(subject,subidx) in subjectListData" :label="subject"  :key="subidx">{{subject.subjectName}}</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </div>
          <!-- 弹窗按钮 -->
          <button class="am-popup-botton am-popup-botton3" @click="addUser(addDto)">确认</button>
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
        scrollList: [
          {
            name: '本次招聘一级管理账号'
          },
          {
            name: '各单位/学校二级账号'
          },
          {
            name: '三级普通管理账号'
          }
        ],
        show_popup0: 0,
        show_popup1: 0,
        show_popup2: 0,
        pms_subject: '',
        checkboxGroup1: [],
        grade: '',
        ulDto: {
          'grade': '',
          'applyId': ''
        },
        addDto: {
          'userId': '',
          'applyId': '',
          'grade': '',
          'name': '',
          'password': '',
          'unitId': '',
          'unitName': '',
          'subjectId': '',
          'subjectName': '',
          'createTime': ''
        },
        firstData: '',
        secondData: '',
        thirdData: '',
        unitListData: '',
        secondUnitName: '请选择学校/单位',
        thirdUnitName: '请选择学校/单位',
        subjectListData: '',
        ifUpdate: 0,
        deleteDto: {
          'id': '',
          'grade': ''
        },
        aoru: '创建',
      }
    },
    created() {},
    mounted() {
      this.grade = localStorage.getItem('grade');
      this.ulDto.applyId = localStorage.getItem('applyId');
      this.addDto.applyId = localStorage.getItem('applyId');
      if (this.grade == null || this.grade == 'null') {
        this.currentTab = 0;
      } else if (this.grade == 1 || this.grade == '1') {
        this.currentTab = 1;
      } else if (this.grade == 2 || this.grade == '2') {
        this.currentTab = 2;
      }
      this.getUserList();
      this.maskWidth = window.innerWidth + 'px';
      this.maskHeight = window.innerHeight + 'px';
    },
    methods: {
      clickJobButton() {
        if (this.checkboxGroup1.length == 0) {
          this.addDto.subjectId = '';
          this.addDto.subjectName = '';
        } else {
          this.addDto.subjectId = '';
          this.addDto.subjectName = '';
          for (var i = 0 ; i < this.checkboxGroup1.length ; i ++) {
            if (this.addDto.subjectId == '' && this.addDto.subjectName == '') {
              this.addDto.subjectId = this.checkboxGroup1[i].jobId;
              this.addDto.subjectName = this.checkboxGroup1[i].subjectName;
            } else {
              this.addDto.subjectId = this.addDto.subjectId + ',' + this.checkboxGroup1[i].jobId;
              this.addDto.subjectName = this.addDto.subjectName + ',' + this.checkboxGroup1[i].subjectName;
            }
          }
        }
      },
      swichMenu: async function(current) { //点击其中一个 menu
        if (this.currentTab == current) {
          return false;
        } else {
          this.currentTab = current;
        }
        this.show_popup0 = 0;
        this.show_popup1 = 0;
        this.show_popup2 = 0;
        this.getUserList();
      },
      secondHandleCommand(command) {
        this.secondUnitName = command.unitName;
        this.addDto.unitName = command.unitName;
        this.addDto.unitId = command.unitId;
      },
      thirdHandleCommand(command) {
        this.thirdUnitName = command.unitName;
        this.addDto.unitName = command.unitName;
        this.addDto.unitId = command.unitId;
        this.getSubjectList();
      },
      showPopup() {
        if (this.currentTab == 0) {
          this.show_popup0 = 1;
          this.show_popup1 = 0;
          this.show_popup2 = 0;
        } else if (this.currentTab == 1) {
          this.show_popup0 = 0;
          this.show_popup1 = 1;
          this.show_popup2 = 0;
          this.secondUnitName = '请选择学校/单位';
          this.getUnitList();
        } else if (this.currentTab == 2) {
          this.show_popup0 = 0;
          this.show_popup1 = 0;
          this.show_popup2 = 1;
          this.thirdUnitName = '请选择学校/单位';
          if (this.grade != 2 || this.grade != '2') {
            this.getUnitList();
          } else {
            this.getSubjectList();
          }
        }
        this.addDto.userId = '';
        this.addDto.name = '';
        this.addDto.password = '';
        this.addDto.unitId = '';
        this.addDto.unitName = '';
        this.addDto.subjectId = '';
        this.addDto.subjectName = '';
        this.ifUpdate = 0;
        this.aoru = '创建';
      },
      hidePopup() {
        if (this.currentTab == 0) {
          this.show_popup0 = 0;
          this.show_popup1 = 0;
          this.show_popup2 = 0;
        } else if (this.currentTab == 1) {
          this.show_popup0 = 0;
          this.show_popup1 = 0;
          this.show_popup2 = 0;
        } else if (this.currentTab == 2) {
          this.show_popup0 = 0;
          this.show_popup1 = 0;
          this.show_popup2 = 0;
        }
      },
      updatePopup(data) {
        if (this.currentTab == 0) {
          this.show_popup0 = 1;
          this.show_popup1 = 0;
          this.show_popup2 = 0;
          this.addDto.userId = data.userId;
          this.addDto.name = data.name;
          this.addDto.password = data.password;
          this.addDto.createTime = data.createTime;
        } else if (this.currentTab == 1) {
          this.show_popup0 = 0;
          this.show_popup1 = 1;
          this.show_popup2 = 0;
          this.addDto.userId = data.userId;
          this.secondUnitName = data.unitName;
          this.addDto.name = data.name;
          this.addDto.password = data.password;
          this.addDto.unitId = data.unitId;
          this.addDto.unitName = data.unitName;
          this.addDto.createTime = data.createTime;
          this.getUnitList();
        } else if (this.currentTab == 2) {
          this.show_popup0 = 0;
          this.show_popup1 = 0;
          this.show_popup2 = 1;
          this.thirdUnitName = data.unitName;
          this.addDto.userId = data.userId;
          this.addDto.name = data.name;
          this.addDto.password = data.password;
          this.addDto.unitId = data.unitId;
          this.addDto.unitName = data.unitName;
          this.thirdUnitName = data.unitName;
          this.addDto.subjectId = data.subjectId;
          this.addDto.subjectName = data.subjectName;
          this.addDto.createTime = data.createTime;
          this.getUnitList();
          this.getSubjectList(1,data.subjectId);
        }
        this.ifUpdate = 1;
        this.aoru = '修改';
      },
      getUnitList() {
        var that = this;
        axios({
          method:'get',
          url:this.commenUrl+'/edu/recruitment/queryRecruitmentSchool?recruitId=' + localStorage.getItem('applyId'),
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              that.unitListData = res.data.data;
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
      async getSubjectList(state,array) {
        var that = this;
        if (that.grade != 2 || that.grade != '2') {
          axios({
            method:'get',
            url:this.commenUrl+'/edu/recruitment/queryRecruitmentJob?recruitId=' + localStorage.getItem('applyId') + '&unitId=' + that.addDto.unitId,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.subjectListData = res.data.data;
                if (state == 1) {
                  var arr = array.split(',');
                  that.checkboxGroup1 = []
                  for (var i = 0;i < that.subjectListData.length; i ++) {
                    if (arr.length > 0) {
                      if (that.subjectListData[i].jobId == arr[0]) {
                        that.checkboxGroup1.push(that.subjectListData[i]);
                        arr.splice(0,1);
                        i = -1;
                      }
                    }
                  }
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
          .catch(function () {
            that.$message('失败');
          });
        } else {
          await axios({
            method:'get',
            url:this.commenUrl+'/edu/recruitment/queryRecruitmentJob?recruitId=' + localStorage.getItem('applyId') + '&unitId=' + localStorage.getItem('unitId'),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.subjectListData = res.data.data;
                if (state == 1) {
                  var arr = array.split(',');
                  that.checkboxGroup1 = []
                  for (var i = 0;i < that.subjectListData.length; i ++) {
                    if (arr.length > 0) {
                      if (that.subjectListData[i].jobId == arr[0]) {
                        that.checkboxGroup1.push(that.subjectListData[i]);
                        arr.splice(0,1);
                        i = -1;
                      }
                    }
                  }
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
          .catch(function () {
            that.$message('失败');
          });
        }
      },
      getUserList() {
        var that = this;
        if (that.currentTab == 0) {
          that.ulDto.grade = '1';
          axios({
            method:'post',
            url:this.commenUrl+'/edu/eduRear/user/selectEduUserList',
            data: qs.stringify(this.ulDto),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.firstData = res.data.data.rows;
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
        } else if (that.currentTab == 1) {
          that.ulDto.grade = '2';
          axios({
            method:'post',
            url:this.commenUrl+'/edu/eduRear/user/selectEduUserList',
            data: qs.stringify(this.ulDto),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.secondData = res.data.data.rows;
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
        } else if (that.currentTab == 2) {
          that.ulDto.grade = '3';
          axios({
            method:'post',
            url:this.commenUrl+'/edu/eduRear/user/selectEduUserList',
            data: qs.stringify(this.ulDto),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.thirdData = res.data.data.rows;
                that.thirdData.forEach((val,index) => {
                	val.subjectName1 = val.subjectName.split(',');
                  val.subjectLength = val.subjectName1.length;
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
          .catch(function () {
            that.$message('失败');
          });
        }
      },
      addUser(keyVal) {
        var that = this;
        if (that.addDto.name == '' || that.addDto.name == null || keyVal.name.replace(/\s*/g, "") == "") {
          that.$message('请输入账号');
        } else if (that.addDto.password == '' || that.addDto.password == null || keyVal.password.replace(/\s*/g, "") == "") {
          that.$message('请输入密码');
        } else if (keyVal.name.indexOf(" ") != -1) {
          that.$message('账号不能包含空格');
        } else if (keyVal.password.indexOf(" ") != -1) {
          that.$message('密码不能包含空格');
        } else if (!(/^(?=.*[a-z])(?=.*[A-Z])[^]{8,16}$/g.test(keyVal.password))) {
          that.$message('密码格式不正确，密码必须包含大写字母和小写字母，长度在8-16位并且不能包含汉字');
        } else if (/[\u4E00-\u9FA5]/g.test(keyVal.password)) {
          that.$message('密码不能包含汉字');
        } else if (keyVal.name.length > 20) {
          that.$message('账号只能在20个字符以内');
        } else if (keyVal.password.length > 16) {
          that.$message('密码只能在16个字符以内');
        } else {
          if (that.currentTab == 0 && that.ifUpdate == 0) {
            that.addDto.grade = '1';
            axios({
              method:'post',
              url:this.commenUrl+'/edu/eduRear/user/addUser',
              data: qs.stringify(this.addDto),
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(function(res) {
              if (res.status == 200) {
                if (res.data.code == 200) {
                  that.$message('添加成功');
                  that.show_popup0 = 0;
                  that.getUserList();
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
          } else if (that.currentTab == 1 && that.ifUpdate == 0) {
            that.addDto.grade = '2';
            if (that.addDto.unitId == '') {
              that.$message('请选择单位/学校');
            } else {
              axios({
                method:'post',
                url:this.commenUrl+'/edu/eduRear/user/addUser',
                data: qs.stringify(this.addDto),
                headers: {
                  token: localStorage.getItem('token')
                }
              })
              .then(function(res) {
                if (res.status == 200) {
                  if (res.data.code == 200) {
                    that.show_popup1 = 0;
                    that.getUserList();
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
          } else if (that.currentTab == 2 && that.ifUpdate == 0) {
            that.addDto.grade = '3';
            if (that.grade == 2 || that.grade == '2') {
              that.addDto.unitId = localStorage.getItem('unitId');
              that.addDto.unitName = localStorage.getItem('unitName');
            }
            if (that.addDto.unitId == '') {
              that.$message('请选择单位/学校');
            } else if (that.addDto.subjectId == '') {
              that.$message('请选择分配职位');
            } else {
              axios({
                method:'post',
                url:this.commenUrl+'/edu/eduRear/user/addUser',
                data: qs.stringify(this.addDto),
                headers: {
                  token: localStorage.getItem('token')
                }
              })
              .then(function(res) {
                if (res.status == 200) {
                  if (res.data.code == 200) {
                    that.show_popup2 = 0;
                    that.getUserList();
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
          } else if (that.currentTab == 0 && that.ifUpdate == 1) {
            that.addDto.grade = '1';
            axios({
              method:'post',
              url:this.commenUrl+'/edu/eduRear/user/updateEduUserList',
              data: qs.stringify(this.addDto),
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(function(res) {
              if (res.status == 200) {
                if (res.data.code == 200) {
                  that.show_popup0 = 0;
                  that.getUserList();
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
          } else if (that.currentTab == 1 && that.ifUpdate == 1) {
            that.addDto.grade = '2';
            if (that.addDto.unitId == '') {
              that.$message('请选择单位/学校');
            } else {
              axios({
                method:'post',
                url:this.commenUrl+'/edu/eduRear/user/updateEduUserList',
                data: qs.stringify(this.addDto),
                headers: {
                  token: localStorage.getItem('token')
                }
              })
              .then(function(res) {
                if (res.status == 200) {
                  if (res.data.code == 200) {
                    that.show_popup1 = 0;
                    that.getUserList();
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
          } else if (that.currentTab == 2 && that.ifUpdate == 1) {
            that.addDto.grade = '3';
            if (that.addDto.unitId == '') {
              that.$message('请选择单位/学校');
            } else if (that.addDto.subjectId == '') {
              that.$message('请选择分配职位');
            } else {
              axios({
                method:'post',
                url:this.commenUrl+'/edu/eduRear/user/updateEduUserList',
                data: qs.stringify(this.addDto),
                headers: {
                  token: localStorage.getItem('token')
                }
              })
              .then(function(res) {
                if (res.status == 200) {
                  if (res.data.code == 200) {
                    that.show_popup2 = 0;
                    that.getUserList();
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
          }
        }
      },
      deleteUser(id,grade) {
        var that = this;
        that.deleteDto.id = id;
        that.deleteDto.grade = grade;
        that.$confirm('是否要删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            method:'post',
            url:this.commenUrl+'/edu/eduRear/user/delEduUser',
            data: qs.stringify(this.deleteDto),
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(function(res) {
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.getUserList();
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
        }).catch(() => {
          that.$message('取消删除');
        });
      }
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

  .am-box {
    width: calc(100% - 32px);
    height: 34px;
    margin-left: 16px;
    padding-top: 10px;
  }

  .am-title-box {
    width: calc(100% - 32px);
    height: 34px;
  }

  .am-title-line {
    width: 2px;
    height: 12px;
    background: #436DF3;
    margin-top: 11px;
    float: left;
  }

  .am-title {
    width: 500px;
    height: 34px;
    line-height: 34px;
    margin-left: 7px;
    font-size: 13px;
    color: #333333;
    float: left;
    text-align: left;
  }

  .am-scroll-view {
    width: 600px;
    height: 25px;
    margin-left: 16px;
    float: left;
  }

  .amsv-div {
    height: 25px;
    margin-right: 47px;
    float: left;
    cursor: pointer;
  }

  .amsv-div-act {
    border-bottom: 1px solid #436EF3;/* no */
  }

  .amsv-div-text {
    height: 25px;
    line-height: 25px;
    font-size: 13px;
    color: #333333;
    text-align: center;
  }

  .amsv-button {
    width: 140px;
    height: 25px;
    float: right;
    margin-right: 16px;
  }

  .amsvb-button {
    width: 85px;
    height: 21px;
    line-height: 21px;
    text-align: center;
    border: 1px solid #436EF3;/* no */
    font-size: 13px;
    color: #436EF3;
    font-weight: 400;
    border-radius: 11px;
    margin-top: 1px;/* no */
    float: right;
    cursor: pointer;
  }

  .am-listtitle {
    width: calc(100% - 32px);
    height: 28px;
    background: #F0F0F0;
    margin-top: 6px;
    margin-left: 16px;
  }

  .am-liststyle {
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 13px;
    font-weight: 400;
    color: #999999;
    float: left;
  }

  .am-listdetail {
    width: calc(100% - 32px);
    height: 28px;
    margin-left: 16px;
    border-bottom: 1px dashed #E7E7E7;/* no */
  }

  .am-listdstyle {
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

  .am-list-number {
    width: 5.88%;
  }

  .am-list-user {
    width: 16.45%;
  }

  .am-list-pwd {
    width: 15.41%;
  }

  .am-list-operation {
    width: 15.58%;
    float: right !important;
  }

  .am-popup {
    width: 455px;
    height: 287px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -143.5px;
    margin-left: -227.5px;
    background: #FFFFFF;
    box-shadow: 0 4px 13px 1px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
  }

  .am-popup-titlebox {
    width: 421px;
    height: 45px;
    margin: 0 17px;
    margin-top: 6px;
  }

  .am-popup-title {
    float: left;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    margin-left: 3px;
    color: #333333;
  }

  .am-popup-close {
    float: right;
    width: 10px;
    height: 10px;
    margin-top: 18px;
    cursor: pointer;
  }

  .am-popup-detail {
    width: 243px;
    height: 106px;
    margin-left: 112px;
  }

  .am-popup-dbox {
    width: 243px;
    height: 53px;
  }
  .am-popup-dbox.noheight{
    height: auto;
  }

  .am-popup-dboxtitle {
    width: 233px;
    height: 23px;
    line-height: 23px;
    margin-left: 5px;
    font-size: 11px;
    font-weight: 300;
    color: #666666;
  }

  .am-popup-dboxinput {
    width: 243px;
    height: 22px;
    line-height: 22px;
    padding-left: 5px;
    font-size: 11px;
    font-weight: 300;
    color: #333333;
    border-bottom: 1px solid #BDBDBD;/* no */
  }

  input::-webkit-input-placeholder{
    color: #999999;
  }

  .am-popup-botton {
    width: 85px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border: 1px solid #436EF3;/* no */
    background: #FFFFFF;
    font-size: 13px;
    color: #436EF3;
    margin-top: 38px;
    margin-left: 190px;
    border-radius: 14px;
    cursor: pointer;
  }

  .am-list-number2 {
    width: 5.88%;
  }

  .am-list-user2 {
    width: 16.79%;
  }

  .am-list-pwd2 {
    width: 12.64%;
  }

  .am-list-school2 {
    width: 14.71%;
  }

  .am-list-creator2 {
    width: 9%;
  }

  .am-list-operation2 {
    width: 14.02%;
    float: right;
  }

  .am-popup2 {
    width: 455px;
    height: 324px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -162px;
    margin-left: -227.5px;
    background: #FFFFFF;
    box-shadow: 0 4px 13px 1px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
  }

  .am-popup-detail2 {
    width: 243px;
    height: 159px;
    margin-left: 112px;
  }

  .amdown-div {
    width: 243px;
    height: 23px;
    line-height: 23px;
    float: left;
  }

  .amdown-img {
    width: 10px;
    height: 6px;
    float: right;
    margin-right: 4px;
    margin-top: 8px;
  }

  .am-list-number3 {
    width: 6.06%;
  }

  .am-list-user3 {
    width: 16.62%;
  }

  .am-list-pwd3 {
    width: 12.81%;
  }

  .am-list-creator3 {
    width: 15.06%;
  }

  .am-list-school3 {
    width: 18.09%;
  }

  .am-list-post3 {
    width: 18.09%;
  }

  .am-list-operation3 {
    width: 13.27%;
    float: right;
  }

  .am-popup3 {
    width: 455px;
    min-height: 309px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -154.5px;
    margin-left: -227.5px;
    background: #FFFFFF;
    box-shadow: 0 4px 13px 1px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
  }
  .am-popup3 .el-checkbox-group{
    max-height: 150px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .am-popup-detail3 {
    width: 243px;
    min-height: 159px;
    margin-left: 112px;
  }

  .am-mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .am-popup-botton3 {
    margin-bottom: 20px;
  }

  .am-popup-checkbox,
  .el-checkbox-button__inner {
    /* width: 61px !important; */
    height: 21px !important;
    line-height: 21px !important;
    font-size: 11px !important;
    color: #999999 !important;
    /* text-align: center !important; */
    border-radius: 12px !important;
    /* margin-right: 16px !important; */
    margin-bottom: 11px !important;
    font-weight: 300 !important;
  }

  .am-popup-checkbox {
    margin-right: 16px !important;
  }

  .el-checkbox-button__inner {
    padding: 0 10px !important;
    border: none;
    background: none;
  }

  .am-popup-checkbox {
    border: 1px solid #C1C1C1;/* no */
  }

  .el-checkbox-button.is-checked .el-checkbox-button__inner {
    background: #436DF3 !important;
    color: #FFFFFF !important;
    border-color: #436DF3 !important;
  }

  .el-checkbox-button:first-child .el-checkbox-button__inner {
    border-left: none;
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
</style>
