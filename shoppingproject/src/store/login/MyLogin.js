//引入登录接口的API
import { reqGetLogin } from "@/api";

//引入获取用户信息的API
import { reqGetUserInfo } from "@/api";

//引入utils文件夹中token.js
import { setToken, getToken, removeToken } from "@/utils/token";

//引入退出登录的API
import { reqGetLoginOut } from "@/api";

const state = {
    //登录组件---用户登录---token
    token: getToken(),
    //登录组件---获取用户信息
    userInfo: {}
};
const mutations = {
    //登录组件---用户登录---带token
    GETLOGIN(state, token) {
        state.token = token;
    },
    //登录组件---获取用户信息
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //登录组件---退出登录---清除本地数据
    GETUSERLOGINOUT(state) {
        //把仓库中先把用户信息清空
        state.token = "";
        state.userInfo = {};
        //本地存储数据清空
        removeToken();
    }
};
const actions = {
    //登录组件---用户登录
    async getLogin({ commit }, data) {
        let result = await reqGetLogin(data);
        //服务器下发token，用户唯一标识（uuid）
        //将来经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            //用户已经登录成功且获取到token
            commit("GETLOGIN", result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    //登录组件---获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo();
        if (result.code === 200) {
            //提交用户信息
            commit("GETUSERINFO", result.data);
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    //登录组件---退出登录---清除本地数据
    async getUserLoginOut({ commit }) {
        //只是向服务器发起一次请求，通知服务器清除token
        let result = await reqGetLoginOut();
        //action里面不能操作state，提交mutation修改state
        if (result.code === 200) {
            commit("GETUSERLOGINOUT");
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}