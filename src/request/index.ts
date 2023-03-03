import axios from 'axios'

// 创建axios实例
const service = axios.create({
    baseURL:"http://localhost:8888/api/private/v1/",
    timeout:5000,
    headers:{
        "Content-Type":"application/json;charset=utf-8",
    }
})
// 请求拦截
service.interceptors.request.use(config=>{
    config.headers = config.headers || {}
    if(localStorage.getItem('token')){
        config.headers.Authorization = localStorage.getItem('token') || ''
        // config.headers.token = localStorage.getItem('token') || ''
    }
    return config
})
// 响应拦截
service.interceptors.response.use(res=>{
    // debugger
    const code:number = res.data.meta.status
    if (code !== 200){
        return Promise.reject(res.data)
    }
    return res.data
},error=>{
    console.log(error)
})

export default service