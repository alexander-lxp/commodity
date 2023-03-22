//引入详情页的API
import { reqGetGoodsInfo } from "@/api"
//引入加入购物车的API
import { reqGetAddOrUpdateShopCart } from "@/api";

//封装游客身份模块uuid--->生成一个随机字符串（不能再变）
import { getUUID } from "@/utils/uuid_token"

const state = {
    //详情页
    goodInfo: {},
    //游客临时身份
    uuid_token: getUUID()
}
const mutations = {
    //详情页
    //获取产品信息的mutations
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
}
const actions = {
    //详情页
    //获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGetGoodsInfo(skuId);
        if (result.code === 200) {
            commit("GETGOODINFO", result.data);
        }
    },
    //加入购物车模块
    //将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //加入购物车返回的解构
        //加入购物车以后（发请求），前台将参数带给服务器
        //服务器写入数据成功，并没有返回其他数据，只返回code==200，代表这次操作成功
        //因为服务器没有返回其余数据，因此我们不需要三连环存储数据
        let result = await reqGetAddOrUpdateShopCart(skuId, skuNum);
        //当前的这个函数如果执行返回Promise
        //代表服务器加入购物车成功
        if (result.code === 200) {
            return "ok"
        } else {
            //代表加入购物车失败
            return Promise.reject(new Error("faile"));
        }
    }
}
//简化数据
const getters = {
    //详情页---动态数据渲染简化---三级联动路由导航数据
    categoryView(state) {
        //比如：state.goodInfo初始状态是空对象，空对象的categoryView属性值是undefined
        //当前计算出的categoryView属性值至少是一个空对象，假的报错不会有了
        return state.goodInfo.categoryView || {};
    },
    //详情页---动态数据渲染简化---产品展示信息数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //详情页---动态数据简化---产品售卖属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}