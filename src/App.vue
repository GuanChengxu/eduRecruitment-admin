<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {

  },

}
</script>

<style>
  @import url("../static/kindeditor/themes/default/default.css");
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-width: 1200px;
}
body {
  margin: 0 !important;
}
</style>
