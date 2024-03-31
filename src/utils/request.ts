import axios from 'axios';
import logout from './logout';

import { ElMessage } from 'element-plus';
//引入用户相关仓库
import useUserStore from '@/store/modules/user';
const request=axios.create({
    //baseURL:import.meta.env.VITE_APP_BASE_API, //基础路径
    baseURL:'/api',
    timeout:5000   //超时限制
});
//请求拦截器携带token头
request.interceptors.request.use((config)=>{
      //获取用户相关小仓库:获取仓库内部token，登录成功后携带给服务器
      let userStore=useUserStore();
      if(userStore.token){
            config.headers.Authorization = userStore.token; 
      }
    return config;
})

//响应拦截器
request.interceptors.response.use((response) => {
    //响应拦截器成功的回调,一般会进行简化数据
    console.log(response);
    if(response.data.code==-1){
      logout();
      ElMessage({
            type: 'error',
            message: '您的身份信息已过期，请重新登录'
      })
    }
    return response.data;
}, (error) => {
    //处理http网络错误
    let status = error.response.status;
//     console.log(status);
    switch (status) {
          case 404:
                //错误提示信息
                ElMessage({
                      type: 'error',
                      message: '请求失败路径出现问题'
                })
                break;
          case 500 | 501 | 502 | 503 | 504 | 505:
                ElMessage({
                      type: 'error',
                      message: '服务器挂了'
                })
                break;
          case 401:
                ElMessage({
                      type: 'error',
                      message: '参数有误'
                })
                
                break;
    }
    return Promise.reject(new Error(error.message))
});

export default request;