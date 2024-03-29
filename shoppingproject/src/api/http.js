//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nProgress from "nprogress";

//在当前模块中引入store
import store from "../store/vuex"

//引入进度条样式
import "nprogress/nprogress.css"

//1:利用axios对象的方法create，去创建一个axios实例
//2:request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发送请求的时候，路径当中会出现api
    baseURL: "/api",
    //代表请求超时的时间5s
    timeout: 5000,
})

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    //config：配置对象，对象里面有一个属性很重要，header请求头
    //进度条开始动
    nProgress.start();
    //判断仓库数据是否带过去
    if (store.state.MyDetail.uuid_token) {
        //请求头添加一个字段(userTempId)：和后台老师商量好了
        config.headers.userTempId = store.state.MyDetail.uuid_token;
    }
    //登录组件---获取用户信息
    if (store.state.MyLogin.token) {
        config.headers.token = store.state.MyLogin.token;
    }
    return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    //进度条结束
    nProgress.done();
    return res.data;
}, (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})

//对外暴露
export default requests;