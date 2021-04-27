import axios from 'axios'
import { Toast } from 'vant'
axios.defaults.baseURL =
    process.env.NODE_ENV == 'development'
        ? '//localhost:8080/api/v1'
        : '//localhost:8080/api/v1'

// axios.defaults.baseURL =
// process.env.NODE_ENV == 'development'
//     ? '//121.43.231.185:8080/api/v1'
//     : '//121.43.231.185:8080/api/v1'

axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers['userId'] = localStorage.getItem('userId') || ''
axios.defaults.headers['platform'] = 'H5Mobile'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use((res) => {
    // console.log(res.data.resultCode)
    if (typeof res.data !== 'object') {
        Toast.fail('服务端异常！')
        return Promise.reject(res)
    }
    if (res.data.resultCode != 200) {
        if (res.data.message) Toast.fail(res.data.message)
        if (res.data.resultCode == 416) {
            window.vRouter.push({ path: '/login' })
        }
        return Promise.reject(res.data)
    }
    return res.data
})

export default axios