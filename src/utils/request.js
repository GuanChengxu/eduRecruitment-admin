import axios from 'axios'
import qs from 'qs'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import router from '../router'

const service = axios.create({
  baseURL: 'http://sw.sdrhup.com:8080/standrad', // 接口地址
  timeout: 10000
})
// service.interceptors.request.use(
//   config => {
//     // 每个请求均携带token
//     if (getToken()) {
//       config.data.token = getToken()
//     }
//     if (config.method === 'post') {
//       config.data = qs.stringify(config.data)
//     }
//     return config
//   },
//   error => {
//     console.log(error)
//     return Promise.reject(error)
//   }
// )

// service.interceptors.response.use(
//   response => {
//     const res = response.data
//     if (res.code !== 1) {
//       Message({
//         message: res.msg,
//         type: 'error',
//         duration: 5 * 1000
//       })
//       router.push(`/login`)
//       return Promise.reject(new Error(res.msg || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

export default service
