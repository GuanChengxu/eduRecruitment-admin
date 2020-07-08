<template>
  <div>
    <div class="list-box">
      <div style="padding-top: 12px;">
        <div v-for="(menuTab,midx) in menuTabs" :key="midx">
          <div :class="[currentTab==midx ? 'list-div-active' : 'list-div']" class="list-div" @click="clickListDiv(midx)">
            <span :class="[currentTab==midx ? 'list-span-active' : 'list-span']" class="list-span">{{menuTab.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menuTabs: [{
          name: '招聘管理'
        },
        {
          name: '信息检索'
        }],
        currentTab: 0
      }
    },
    created() {},
    mounted() {
      this.$emit('listenEvent',this.currentTab);
    },
    methods: {
      clickListDiv(midx) {
        this.currentTab = midx;
        this.$emit('listenEvent',this.currentTab);
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
    width: 145px;
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
