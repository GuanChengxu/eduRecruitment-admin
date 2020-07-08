<template>
  <div>
    <div class="right-box">
      <!-- 报名须知 -->
      <div class="nfa-box">
        <!-- 报名须知标题box -->
        <div class="nfa-title-box">
          <!-- 报名须知标题竖线 -->
          <div class="nfa-title-line"></div>
          <!-- 报名须知标题 -->
          <div class="nfa-title">报名须知</div>
        </div>
        <!-- 报名须知输入框 -->
        <editor ref="editor" id="editor_id" :content.sync="eduApplySet.applyNotice"
          :afterChange="afterChange()"
        uploadJson="http://154.8.201.198:8081/edu/eduRear/eduApplySet/upmethod"
        pluginsPath="../../static/kindeditor/plugins/"
        :loadStyleMode="true"
        :allowFileManager='false'
        :allowPreviewEmoticons='false'
        filePostName="imgFile"
        @on-content-change="onContentChange"></editor>
      </div>
      <!-- 招聘简章 -->
      <div class="nfa-box">
        <!-- 招聘简章标题box -->
        <div class="nfa-title-box">
          <!-- 招聘简章标题竖线 -->
          <div class="nfa-title-line"></div>
          <!-- 招聘简章标题 -->
          <div class="nfa-title">招聘简章</div>
        </div>
        <!-- 招聘简章输入框 -->
        <editor ref="editor2" id="editor_id2" :content.sync="eduApplySet.recruitmentBrochure"
          :afterChange="afterChange2()"
        uploadJson="http://154.8.201.198:8081/edu/eduRear/eduApplySet/upmethod"
        pluginsPath="../../static/kindeditor/plugins/"
        :loadStyleMode="true"
        :allowFileManager='false'
        :allowPreviewEmoticons='false'
        filePostName="imgFile"
        @on-content-change="onContentChange2"></editor>
        </editor>
      </div>
      <!-- 缴费 -->
      <div class="pf-box">
        <!-- 缴费标题box -->
        <div class="pf-title-box">
          <!-- 缴费标题竖线 -->
          <div class="pf-title-line"></div>
          <!-- 缴费标题 -->
          <div class="pf-title">缴费</div>
        </div>
        <div class="pf-radiobox">
          <input type="radio" id="falsePay" name="radios" value="0" v-model="eduApplySet.isPay" />
          <label for="falsePay" class="pay-fees">否</label>
          <input type="radio" id="truePay" name="radios" value="1" v-model="eduApplySet.isPay" />
          <label for="truePay" class="pay-fees pay-true">
            是
            <input v-show="eduApplySet.isPay == '1'" type="number" class="pay-true-input" v-model="eduApplySet.money"/>
            <span v-show="eduApplySet.isPay == '1'" class="pay-true-span">元/人</span>
          </label>
        </div>
      </div>
      <!-- 报名时间 -->
      <div class="rt-box">
        <!-- 报名时间标题box -->
        <div class="rt-title-box">
          <!-- 报名时间标题竖线 -->
          <div class="rt-title-line"></div>
          <!-- 报名时间标题 -->
          <div class="rt-title">报名时间</div>
        </div>
        <!-- 开始时间 -->
        <div class="datebox">
          <div class="datetitle">开始时间</div>
          <el-date-picker class="datepicker" v-model="eduApplySet.applyStartTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择开始时间" @focus="eduApplySet.applyStartTime = ''"></el-date-picker>
        </div>
        <!-- 结束时间 -->
        <div class="datebox datebox2">
          <div class="datetitle">结束时间</div>
          <el-date-picker class="datepicker" v-model="eduApplySet.applyEndTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择结束时间" @focus="eduApplySet.applyEndTime = ''"></el-date-picker>
        </div>
      </div>
      <!-- 查询时间 -->
      <div class="rt-box stbox">
        <!-- 查询时间标题box -->
        <div class="rt-title-box">
          <!-- 查询时间标题竖线 -->
          <div class="rt-title-line"></div>
          <!-- 查询时间标题 -->
          <div class="rt-title">查询时间</div>
        </div>
        <!-- 开始时间 -->
        <div class="datebox">
          <div class="datetitle">开始时间</div>
          <el-date-picker class="datepicker" v-model="eduApplySet.queryStartTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择开始时间" @focus="eduApplySet.queryStartTime = ''"></el-date-picker>
        </div>
        <!-- 结束时间 -->
        <div class="datebox datebox2">
          <div class="datetitle">结束时间</div>
          <el-date-picker class="datepicker" v-model="eduApplySet.queryEndTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择结束时间" @focus="eduApplySet.queryEndTime = ''"></el-date-picker>
        </div>
      </div>
      <button class="as-button" style="cursor: pointer;" @click="addApplication(eduApplySet)">确认</button>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  const axios = require('axios');
  export default {
    model: {
      prop: "content",
      event: "input"
    },
    props: {
      uploadImgHook: {
        type: Function,
        default() {
          return () => {
            console.error("undefined uploadImg Hook")
          }
        }
      }
    },
    computed: {
      contentData() {
        return this.content
      }
    },
    data() {
      return {
        //contentData:this.content,
        editorConfig: {
            language: "zh-cn",
            fontSize: {
                options: [8, 10, 'default', 14, 16, 18, 20, 22, 24, 26, 28, 32, 48]
            },
            fontFamily: {
                options: ["宋体", "仿宋", "微软雅黑", "黑体", "仿宋_GB2312", "楷体", "隶书", "幼圆"]
            }
        },
        right_height: '',
        right_width: '',
        show_popup: 0,
        radio: 0,
        eduApplySet: {
          'applyId': '',
          'applyNotice': '',
          'recruitmentBrochure': '',
          'isPay': '0',
          'money': 0,
          'applyStartJobId': '',
          'applyStartTime': '',
          'applyEndJobId': '',
          'applyEndTime': '',
          'queryStartJobId': '',
          'queryStartTime': '',
          'queryEndJobId': '',
          'queryEndTime': '',
          'createBy': '',
          'startTime': ''
        },
        detailDto: {
          'applyId': ''
        },
        editorTextCopy: ''  // content-change 事件回掉改变的对象
      }
    },
    created() {},
    mounted() {
      this.eduApplySet.applyId = localStorage.getItem('applyId');
      this.eduApplySet.createBy = localStorage.getItem('createBy');
      this.detailDto.applyId = localStorage.getItem('applyId');
      if (this.detailDto.applyId != null) {
        this.getDetail();
      }
    },
    methods: {
      onContentChange (val) {
        this.editorTextCopy = val;
      },
      onContentChange2 (val) {
        this.editorTextCopy = val;
      },
      afterChange () {
      },
      afterChange2 () {
      },
      onReady(editor) {
        // Insert the toolbar before the editable area.
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
        editor.plugins.get('FileRepository').createUploadAdapter = loader => {
            //let val = editor.getData();
            return {
                upload: async () => {
                    return await loader.file.then(f => {
                        const F = new FileReader();
                        F.readAsArrayBuffer(f);
                        return new Promise(resolve => {
                            F.onload = function () {
                                resolve({bufAsArray: F.result, file: f})
                            };
                        })
                    }).then(v => {
                        //执行上传上传
                        return this.uploadImgHook(v)
                        //返回标准格式
                        /*return {
                            default: 'http://mmcl.maoming.gov.cn/ys/css/img/BG.png'
                        }*/
                    });

                }
            }
        };
      },
      addApplication(keyVal) {
        var that = this;
        if (that.eduApplySet.applyNotice == '' || that.eduApplySet.applyNotice == null || keyVal.applyNotice.replace(/\s*/g, "") == "") {
          that.$message('请填写报名须知');
        } else if (that.eduApplySet.recruitmentBrochure == '' || that.eduApplySet.recruitmentBrochure == null || keyVal.recruitmentBrochure.replace(/\s*/g, "") == "") {
          that.$message('请填写招聘简章');
        } else if (that.eduApplySet.isPay == '1' && that.eduApplySet.money == null) {
          that.$message('请输入缴费金额');
        } else if (that.eduApplySet.isPay == '1' && that.eduApplySet.money <= 0) {
          that.$message('缴费金额必须大于0');
        } else if (that.eduApplySet.isPay == '1' && that.eduApplySet.money > 2147483647) {
          that.$message('缴费金额超过最大值');
        } else if (that.eduApplySet.applyStartTime =='' || that.eduApplySet.applyStartTime ==null) {
          that.$message('请选择报名开始时间');
        } else if (that.eduApplySet.applyEndTime =='' || that.eduApplySet.applyEndTime ==null) {
          that.$message('请选择报名结束时间');
        } else if (that.eduApplySet.queryStartTime =='' || that.eduApplySet.queryStartTime ==null) {
          that.$message('请选择查询开始时间');
        } else if (that.eduApplySet.queryEndTime =='' || that.eduApplySet.queryEndTime ==null) {
          that.$message('请选择查询结束时间');
        } else {
          var ast = that.eduApplySet.applyStartTime;
          var aet = that.eduApplySet.applyEndTime;
          var qst = that.eduApplySet.queryStartTime;
          var qet = that.eduApplySet.queryEndTime;
          var reg = new RegExp('T', 'g');
          ast = ast.replace(new RegExp(/-/gm), "/");
          ast = ast.replace(reg, ' ');
          var astarr = ast.split('.');
          ast = astarr[0];
          aet = aet.replace(new RegExp(/-/gm), "/");
          aet = aet.replace(reg, ' ');
          var aetarr = aet.split('.');
          aet = aetarr[0];
          qst = qst.replace(new RegExp(/-/gm), "/");
          qst = qst.replace(reg, ' ');
          var qstarr = qst.split('.');
          qst = qstarr[0];
          qet = qet.replace(new RegExp(/-/gm), "/");
          qet = qet.replace(reg, ' ');
          var qetarr = qet.split('.');
          qet = qetarr[0];
          if (ast > aet) {
            that.$message('报名开始时间必须小于报名结束时间');
          } else if (qst > qet) {
            that.$message('查询开始时间必须小于查询结束时间');
          } else if (qst < ast) {
            that.$message('查询开始时间不能小于报名开始时间');
          } else if (qst > aet) {
            that.$message('查询开始时间必须小于等于报名结束时间');
          } else if (qet < aet) {
            that.$message('查询结束时间必须大于等于报名结束时间');
          } else if (ast == aet) {
            that.$message('报名开始时间必须小于报名结束时间');
          } else if (qst == qet) {
            that.$message('查询开始时间必须小于查询结束时间');
          } else {
            axios({
              method:'post',
              url:'http://154.8.201.198:8081/edu/eduRear/eduApplySet/updateApplySet',
              data: qs.stringify(that.eduApplySet),
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(function(res) {
              if (res.status == 200) {
                if (res.data.code == 200) {
                  that.$message('保存成功!');
                  that.getDetail();
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
              localStorage.setItem('header_title',res.data.data.recruitTheme);
              that.eduApplySet.applyNotice = res.data.data.applyNotice;
              that.eduApplySet.recruitmentBrochure = res.data.data.recruitmentBrochure;
              that.eduApplySet.isPay = res.data.data.isPay;
              that.eduApplySet.money = res.data.data.money;
              that.eduApplySet.applyStartJobId = res.data.data.applyStartJobId;
              that.eduApplySet.applyStartTime = res.data.data.applyStartTime;
              that.eduApplySet.applyEndJobId = res.data.data.applyEndJobId;
              that.eduApplySet.applyEndTime = res.data.data.applyEndTime;
              that.eduApplySet.queryStartJobId = res.data.data.queryStartJobId;
              that.eduApplySet.queryStartTime = res.data.data.queryStartTime;
              that.eduApplySet.queryEndJobId = res.data.data.queryEndJobId;
              that.eduApplySet.queryEndTime = res.data.data.queryEndTime;
              that.eduApplySet.createBy = res.data.data.createBy;
              that.eduApplySet.startTime = res.data.data.startTime;
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
    min-width: calc(1366px - 145px - 34px);
    background: #FFFFFF;
    overflow-x: hidden;
    margin-top: 12px;
    margin-left: 9px;
  }

  .nfa-box {
    width: calc(100% - 42px);
    height: 300px;
    border-bottom: 1px dashed #C8CDD1;/* no */
    margin-left: 21px;
  }

  .nfa-title-box {
    width: 100%;
    height: 42px;
  }

  .nfa-title-line {
    width: 2px;
    height: 12px;
    background: #436DF3;
    margin-left: 1px;
    margin-top: 15px;
    float: left;
  }

  .nfa-title {
    width: 500px;
    height: 42px;
    line-height: 42px;
    margin-left: 7px;
    font-size: 12px;
    color: #333333;
    float: left;
    text-align: left;
  }

  .nfa-detail {
    width: 613px;
    height: 141px;
    border: 1px solid #C8CDD1;/* no */
    resize: none;
    overflow: hidden;
    margin-left: 1px;
    font-size: 11px;
    color: #333333;
    padding-left: 5px;
    padding-top: 5px;
  }

  .pf-box {
    width: calc(100% - 42px);
    height: 88px;
    border-bottom: 1px dashed #C8CDD1;/* no */
    margin-left: 21px;
  }

  .pf-title-box {
    width: 100%;
    height: 52px;
  }

  .pf-title-line {
    width: 2px;
    height: 12px;
    background: #436DF3;
    margin-left: 1px;
    margin-top: 20px;
    float: left;
  }

  .pf-title {
    width: 500px;
    height: 52px;
    line-height: 52px;
    margin-left: 7px;
    font-size: 12px;
    color: #333333;
    float: left;
    text-align: left;
  }

  .pf-radiobox {
    width: 100%;
    height: 21px;
  }

  .pay-fees {
    width: 32px;
    height: 21px;
    line-height: 21px;
    font-size: 11px;
    color: #333333;
  }

  .pay-true {
    margin-left: 38px;
  }

  .pay-true-input {
    width: 56px;
    height: 21px;
    border: 1px solid #C8CDD1;/* no */
    border-radius: 11px;
    text-align: center;
    margin-left: 27px;
    font-size: 11px;
    color: #333333;
  }

  .pay-true-span {
    font-size: 11px;
    color: #333333;
    margin-left: 7px;
  }

  .rt-box {
    width: calc(100% - 42px);
    height: 124px;
    border-bottom: 1px dashed #C8CDD1;/* no */
    margin-left: 21px;
  }

  .rt-title-box {
    width: 100%;
    height: 40px;
    margin-top: 9px;
  }

  .rt-title-line {
    width: 2px;
    height: 12px;
    background: #436DF3;
    margin-left: 1px;
    margin-top: 14px;
    float: left;
  }

  .rt-title {
    width: 500px;
    height: 40px;
    line-height: 40px;
    margin-left: 7px;
    font-size: 12px;
    color: #333333;
    float: left;
    text-align: left;
  }

  .datebox {
    height: 21px;
  }

  .datebox2 {
    margin-top: 14px;
  }

  .datetitle {
    height: 21px;
    line-height: 21px;
    font-size: 11px;
    color: #666666;
    float: left;
  }

  .datepicker {
    width: 136px;
    height: 21px;
    margin-left: 13px;
    font-size: 11px;
    padding-left: 11px;
    float: left;
    border: 1px solid #C8CDD1;/* no */
    border-radius: 11px;
    color: #333333;
  }

  input::-webkit-input-placeholder{
    color: #999999;
  }

  .stbox {
    border: none;
  }

  .as-button {
    width: 63px;
    height: 21px;
    line-height: 21px;
    text-align: center;
    border: 1px solid #436EF3;/* no */
    font-size: 13px;
    color: #436EF3;
    margin-left: 80px;
    margin-top: 28px;
    margin-bottom: 31px;
    border-radius: 11px;
    font-weight:400;
  }

  input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }

  input[type="radio"]+label::before {
    content: "\a0";
    /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    /* font-size: 1rem; */
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 1px solid #C8CDD1;/* no */
    line-height: 1;
    margin-right: 13px;
  }

  input[type="radio"]:checked+label::before {
    width: 7px;
    height: 7px;
    background-color: #436EF3;
    background-clip: content-box;
  }

  .el-icon-arrow-right {
    display: none;
  }

  .el-collapse-item__arrow::before {
    margin: 0 !important;
  }

  .el-input__prefix {
    display: none;
  }

  .el-input__suffix {
    display: none;
  }

  .el-input--prefix .el-input__inner {
    padding-left: 0 !important;
  }

  .el-input--suffix .el-input__inner {
    padding-right: 0 !important;
  }

  .el-input__inner {
    border: none !important;
    height: 21px !important;
    line-height: 21px !important;
    padding: 0 0 !important;
    background-color: rgba(255,255,255,0) !important;
  }

  .el-icon-d-arrow-left:before {
    display: none;
  }

  .el-icon-arrow-left:before {
    display: none;
  }

  .el-icon-d-arrow-right:before {
    display: none;
  }

  .el-icon-arrow-right:before {
    display: none;
  }

  .ck-editor__main {
    width: 622px;
    height: 141px;
  }

  .ke-edit {
    height: 185px !important;
  }

  .ke-edit-iframe {
    height: 185px !important;
  }

  .ke-inline-block {
    background-image: none !important;
    height: 1px !important;
  }

  .ke-statusbar {
    border: none !important;
  }

  .ck.ck-editor__editable_inline {
    height: 98px !important;
    font-size: 13px !important;
  }
</style>
