import axios from 'axios';

// 请求拦截器 发起请求时对请求参数进行拦截处理
axios.interceptors.request.use((config)=>{
    return config;
},(error)=>{
    return Promise.reject(error);
})


// 响应拦截器 接收到数据前对数据进行拦截处理
axios.interceptors.response.use((response)=>{
    return response.data;
},(error)=>{
    return Promise.reject(error);
})


export default axios;