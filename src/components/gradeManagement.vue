<template>
  <div>
    <div class="right-box" :style="{height: right_height,width: right_width}">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        right_height: '',
        right_width: ''
      }
    },
    created() {},
    mounted() {
      this.right_height = localStorage.getItem('right_height') + 'px';
      this.right_width = localStorage.getItem('right_width') + 'px';
    },
    methods: {
    },
  }
</script>

<style>
  .right-box {
    background: #FFFFFF;
    margin-top: 12px;
    margin-left: 9px;
  }
</style>
