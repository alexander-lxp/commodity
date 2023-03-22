//引入获取用户地址信息的API
import { reqGetAddressInfo } from "@/api";

//引入获取商品清单信息的API
import { reqGetOrderInfo } from "@/api";

const state = {
    //交易组件---获取用户地址信息
    address: [],
    //交易组件---获取商品清单信息
    orderInfo: {}
};
const mutations = {
    //交易组件---获取用户地址信息
    GETUSERADDRESS(state, address) {
        state.address = address;
    },
    //交易组件---获取商品清单信息
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};
const actions = {
    //交易组件---获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqGetAddressInfo();
        if (result.code == 200) {
            commit("GETUSERADDRESS", result.data);
        }
    },
    //交易组件---获取商品清单信息
    async getOrderInfo({ commit }) {
        let result = await reqGetOrderInfo();
        if (result.code === 200) {
            commit("GETORDERINFO", result.data);
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