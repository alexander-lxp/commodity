import Vue from "vue";
import Vuex from "vuex";

//需要使用插件一次
Vue.use(Vuex);

//引入小仓库
import MyHome from "./home/MyHome";
import MySearch from "./search/MySearch";
import MyDetail from "./detail/MyDetail";
import MyShopCart from "./shopcart/MyShopCart";
import MyRegister from "./register/MyRegister";
import MyLogin from "./login/MyLogin";
import MyTrade from "./trade/MyTrade";

//对外暴露Store类的一个实例
export default new Vuex.Store({
    //实现Vuex仓库模块式开发存储数据
    modules: {
        MyHome,
        MySearch,
        MyDetail,
        MyShopCart,
        MyRegister,
        MyLogin,
        MyTrade
    }
})