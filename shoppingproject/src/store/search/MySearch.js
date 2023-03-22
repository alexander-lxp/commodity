//引入API
//search模块的API
import { reqGetSearchInfo } from "@/api";

//search模块的小仓库
const state = {
    //Search模块
    searchList: {}
};
const mutations = {
    //Search模块
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    //获取Search模块的数据
    async getSearchList({ commit }, params = {}) {
        //当前这个reqGetSearchInfo这个函数调用获取服务器数据的时候，至少传递一个参数（空对象）
        //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if (result.code === 200) {
            commit("GETSEARCHLIST", result.data)
        }
    }
};
//计算属性(在项目当中，是为了简化仓库中的数据)
//可以把我们将来在组件当中需要用的数据简化一下[将来组件在获取数据的时候就方便]
const getters = {
    //search模块（产品列表动态数据渲染）
    //当前形参state，当前仓库中的state，并非大仓库中的那个state
    //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
    //假如网络不给力或者没有网state.searchList.goodsList应该返回的是undefined
    goodsList(state) {
        return state.searchList.goodsList;
    },
    //search模块（商标动态数据渲染）
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    //search模块（产品分类动态数据渲染）
    attrsList(state) {
        return state.searchList.attrsList;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}