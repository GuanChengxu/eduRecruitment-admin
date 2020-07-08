// import router from './router'
// import { Message } from 'element-ui'
// import { getUserId } from '@/utils/auth' // get userId from cookie
//
// const whiteList = ['/'] // no redirect whitelist
//
// router.beforeEach(async(to, from, next) => {
//
//   const hasUserID = getUserId()
//   console.log(getUserId())
//
//   if(whiteList.indexOf(to.path)<0){ // page not in whiteList
//     if(hasUserID){ // has been logined
//       next();
//     }else{
//       if(to.path=='/'){
//         next();
//       }else{
//         Message.error('请先登录')
//         next('/');
//         // next()
//       }
//     }
//   }
//   else{
//     next();
//   }
// })
//
// router.afterEach(() => {
// })
