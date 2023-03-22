//引入路由组件
//一级路由组件
import MyHome from '../pages/Home/MyHome.vue';
import MySearch from '../pages/Search/MySearch.vue';
import MyLogin from '../pages/Login/MyLogin.vue';
import MyRegister from '../pages/Register/MyRegister.vue';
import MyDetail from '../pages/Detail/MyDetail.vue';
import MyAddCartSuccess from '../pages/AddCartSuccess/MyAddCartSuccess.vue';
import MyShopCart from '../pages/ShopCart/MyShopCart.vue';
import MyTrade from '../pages/Trade/MyTrade.vue';
import MyPay from '../pages/Pay/MyPay.vue';
import MyPaySuccess from '../pages/PaySuccess/MyPaySuccess.vue';
import MyCenter from '../pages/Center/MyCenter.vue';
//二级路由组件
import MyOrder from '../pages/Center/myOrder/MyOrder.vue';
import MyGroupOrder from '../pages/Center/groupOrder/MyGroupOrder.vue'

//路由懒加载
// const foo = () => {
//     console.log(111);
//     return import("../pages/Home/MyHome.vue");
// }

//配置路由信息
export default [
    {
        path: "/home",
        // component: () => import("../pages/Home/MyHome.vue"),
        component: MyHome,
        meta: { show: true }
    },
    {
        path: "/search/:keyword?",
        // component: () => import("../pages/Search/MySearch.vue"),
        component: MySearch,
        meta: { show: true },
        name: "search",
    },
    {
        path: "/login",
        component: MyLogin,
        meta: { show: false }
    },
    {
        path: "/register",
        component: MyRegister,
        meta: { show: false }
    },
    {
        path: "/detail/:skuId",
        component: MyDetail,
        meta: { show: true }
    },
    {
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: MyAddCartSuccess,
        meta: { show: true }
    },
    {
        path: "/shopcart",
        component: MyShopCart,
        meta: { show: true }
    },
    {
        path: "/trade",
        component: MyTrade,
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面，必须是从购物车而来
            if (from.path == "/shopcart") {
                next();
            } else {
                //其他的路由组件而来，停留在当前
                next(false);
            }
        }
    },
    {
        path: "/pay",
        component: MyPay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: "/paysuccess",
        component: MyPaySuccess,
        meta: { show: true }
    },
    {
        path: "/center",
        component: MyCenter,
        meta: { show: true },
        //二级路由组件
        children: [
            {
                path: "myorder",
                component: MyOrder
            },
            {
                path: "grouporder",
                component: MyGroupOrder
            },
            //重定向
            {
                path: "/center",
                redirect: "/center/myorder"
            }
        ]
    },
    //重定向
    {
        path: "*",
        redirect: "/home"
    }
]