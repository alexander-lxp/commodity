//引入获取验证码接口的API
import { reqGetSendCode } from "@/api";

//引入用户注册接口的API
import { reqGetRegister } from "@/api";

const state = {
    //注册组件---获取验证码数据
    code: ""
};
const mutations = {
    //注册组件---获取验证码数据
    GETSENDCODE(state, code) {
        state.code = code;
    }
};
const actions = {
    //注册组件---获取验证码数据
    async getSendCode({ commit }, phone) {
        //获取验证码的这个接口，把验证码返回，但是正常情况，后台把验证码发到用户手机上[省钱]
        let result = await reqGetSendCode(phone);
        if (result.code === 200) {
            commit("GETSENDCODE", result.data);
            return "ok"
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    //注册组件---用户注册
    async getRegister({ commit }, user) {
        let result = await reqGetRegister(user);
        if (result.code === 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("fail"));
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