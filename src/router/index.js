import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const newRoutes = [
  { // 登录页
    name: 'login',
    path: '/',
    component: () => import('@/views/login')
  },
  { // 首页
    name: 'index',
    path: '/index',
    component: () => import('@/views/index')
  },
  { // 首页
    name: 'index2',
    path: '/index2',
    component: () => import('@/views/index2')
  },
  { // 重定向
    name: 'redirect',
    path: '/redirect',
    component: () => import('@/components/redirect')
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: newRoutes
})

const router = createRouter()

export default router
