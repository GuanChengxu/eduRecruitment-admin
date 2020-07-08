<template>
  <div class="homepage">
    <!-- 顶部header -->
    <div v-if="grade == null || grade == 'null'">
      <Header></Header>
    </div>
    <div v-else>
      <Header2></Header2>
    </div>
    <div class="detail clearfix">
      <!-- 左侧导航栏 -->
      <div class="leftlist" v-if="grade == null || grade == 'null'">
        <Leftlist @listenEvent="rightDetailNumber"></Leftlist>
      </div>
      <div class="leftlist" v-else>
        <Leftlist2 @listenEvent="rightDetailNumber"></Leftlist2>
      </div>
      <div v-if="grade == null || grade == 'null'">
        <div v-show="showRightDetail == 0" class="rightdetail">
          <Recruitment></Recruitment>
        </div>
        <div v-show="showRightDetail == 1" class="rightdetail">
          <MessageSearch></MessageSearch>
        </div>
      </div>
      <div v-else>
        <!-- 报名设置 -->
        <div v-if="showRightDetail == 0" class="rightdetail">
          <ApplicationSettings></ApplicationSettings>
        </div>
        <!-- 人员管理 -->
        <div v-else-if="showRightDetail == 1" class="rightdetail">
          <PeopleManagement></PeopleManagement>
        </div>
        <!-- 职位管理 -->
        <div v-else-if="showRightDetail == 2" class="rightdetail">
          <PositionManagement></PositionManagement>
        </div>
        <!-- 考试管理 -->
        <div v-else-if="showRightDetail == 3" class="rightdetail">
          <ExamManagement></ExamManagement>
        </div>
        <!-- 成绩管理 -->
        <div v-else-if="showRightDetail == 4" class="rightdetail">
          <GradeManagement></GradeManagement>
        </div>
        <!-- 账号管理 -->
        <div v-else-if="showRightDetail == 5" class="rightdetail">
          <AccountManagement></AccountManagement>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/header.vue'
  import Header2 from '@/components/header2.vue'
  import Leftlist from '@/components/leftlist.vue'
  import Leftlist2 from '@/components/leftlist2.vue'
  import Recruitment from '@/components/recruitment.vue'
  import MessageSearch from '@/components/messageSearch.vue'
  import ApplicationSettings from '@/components/applicationSettings.vue'
  import PeopleManagement from '@/components/peopleManagement.vue'
  import PositionManagement from '@/components/positionManagement.vue'
  import ExamManagement from '@/components/examManagement.vue'
  import GradeManagement from '@/components/gradeManagement.vue'
  import AccountManagement from '@/components/accountManagement.vue'
  export default {
    data () {
      return {
        clientHeight: 0, //屏幕高度
        showBack: 0,
        showRightDetail: 0,
        grade: ''
      }
    },
    created() {
    },
    mounted() {
      this.grade = localStorage.getItem('grade');
      if (this.grade == 2 || this.grade == 3) {
        this.showRightDetail = 1;
      }
    },
    methods: {
      rightDetailNumber(param) {
        this.showRightDetail = param;
      }
    },
    components: {
      Header,
      Header2,
      Leftlist,
      Recruitment,
      MessageSearch,
      Leftlist2,
      ApplicationSettings,
      PeopleManagement,
      PositionManagement,
      ExamManagement,
      GradeManagement,
      AccountManagement
    }
  }
</script>

<style lang="scss" scoped>
  .homepage {
    width: 100vw;
    height: 100vh;
    overflow: visible;
  }

  .detail {
    width: 100vw;
    height: calc(100vh - 57px);
  }

  .leftlist {
    float: left;
    width: 145px;
  }

  .rightdetail {
    float: left;
    width: calc(100vw - 145px);
    height: calc(100vh - 57px);
  }
</style>
