<template>
  <div>
    <div class="list-box">
      <div style="padding-top: 12px;">
        <div v-show="grade == 'null' || grade == '1'" :class="[currentTab==0 ? 'list-div-active' : 'list-div']" class="list-div" @click="clickListDiv(0)">
          <span :class="[currentTab==0 ? 'list-span-active' : 'list-span']" class="list-span">报名设置</span>
        </div>
        <div :class="[currentTab==1 ? 'list-div-active' : 'list-div']" class="list-div" @click="clickListDiv(1)">
          <span :class="[currentTab==1 ? 'list-span-active' : 'list-span']" class="list-span">人员管理</span>
        </div>
        <div v-show="grade == 'null' || grade == '1'" :class="[currentTab==2 ? 'list-div-active' : 'list-div']" class="list-div" @click="clickListDiv(2)">
          <span :class="[currentTab==2 ? 'list-span-active' : 'list-span']" class="list-span">职位管理</span>
        </div>
        <div style="display: none;" :class="[currentTab==3 ? 'list-div-active' : 'list-div']" class="list-div" @click="clickListDiv(3)">
          <span :class="[currentTab==3 ? 'list-span-active' : 'list-span']" class="list-span">考试管理</span>
        </div>
        <div style="display: none;" :class="[currentTab==4 ? 'list-div-active' : 'list-div']" class="list-div" @click="clickListDiv(4)">
          <span :class="[currentTab==4 ? 'list-span-active' : 'list-span']" class="list-span">成绩管理</span>
        </div>
        <div v-show="grade != '3'" :class="[currentTab==5 ? 'list-div-active' : 'list-div']" class="list-div" @click="clickListDiv(5)">
          <span :class="[currentTab==5 ? 'list-span-active' : 'list-span']" class="list-span">账号管理</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list_height: '', //列表高度
        currentTab: 0,
        grade: ''
      }
    },
    watch: {
      screenWidth() {
        if (localstorage.getItem("list_width") == null) {
          localStorage.setItem("list_width", this.list_width);
        } else {
          localstorage.removeItem("list_width");
          localStorage.setItem("list_width", this.list_width);
        }
      }
    },
    created() {},
    mounted() {
      this.grade = localStorage.getItem('grade');
      if (this.grade == "2" || this.grade == "3") {
        this.currentTab = 1;
      }
      this.$emit('listenEvent',this.currentTab);
    },
    methods: {
      clickListDiv(midx) {
        if (midx == 3 || midx == 4) {
          alert('该功能暂未开发');
        } else {
          this.currentTab = midx;
          this.$emit('listenEvent',this.currentTab);
        }
      }
    },
  }
</script>

<style>
  .list-box {
    background: #FFFFFF;
    width: 145px;
    box-shadow: 2px 0 4px 0 rgba(200,200,200,0.2);
    height: calc(100vh - 57px);
  }

  .list-div {
    width: 140px;
    height: 39px;
    line-height: 39px;
    background: #FFFFFF;
    text-align: center;
    cursor: pointer;
  }

  .list-div-active {
    background: #436EF3;
  }

  .list-span {
    font-size: 13px;
    color: #333333;
    font-weight:400;
  }

  .list-span-active {
    color: #FFFFFF;
  }
</style>
