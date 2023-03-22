//引入api
//三级联动的API
import { reqCategoryList } from "@/api";
//轮播图的API
import { reqGetBannerList } from "@/api";
//Floor的API(家用电器和手机)
import { reqGetFloorList } from "@/api";

//home模块的小仓库
const state = {
    //state中数据默认初始值别瞎写，服务器返回对象，起始值就对象，服务器返回数组，起始值就数组
    //三级联动
    categoryList: [],
    //轮播图
    bannerList: [],
    //floor(家用电器和手机)
    floorList: []
};
//mutations:是唯一修改state的地方
const mutations = {
    //三级联动
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    //轮播图
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    //floor(家用电器和手机)
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
//action：用户处理派发action地方的，可以书写异步语句，自己逻辑地方
const actions = {
    //通过api里面的接口函数调用，想服务器发请求，获取服务器的数据
    //三级联动
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code === 200) {
            commit("CATEGORYLIST", result.data);
        }
    },
    //获取首页轮播图数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code === 200) {
            commit("GETBANNERLIST", result.data);
        }
    },
    //获取首页floor(家用电器和手机数据)
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code === 200) {
            //提交mutation
            commit("GETFLOORLIST", result.data);
        }
    }
};
//计算属性
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}