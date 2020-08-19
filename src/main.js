// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import * as filters from './utils'
import '@/permission' // permission control
import 'babel-polyfill'
import 'ie-placeholder'
import 'es6-promise/auto'
import promise from 'es6-promise'
//swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import VueClipboard from 'vue-clipboard2';
import '@/styles/index.scss' // global scss
import axios from 'axios'
import VueKindEditor from './plugin/kindeditor.js'
import '../static/kindeditor/kindeditor-all-min.js'
import '../static/kindeditor/lang/zh-CN.js'
import App from './App'


Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

if (Number.parseInt === undefined) Number.parseInt = window.parseInt;
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;

promise.polyfill()

Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.use(VueKindEditor)

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.commenUrl = 'https://ystwx.yantai.gov.cn/jneduapi2'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
