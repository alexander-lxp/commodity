//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';

//引入路由
import routers from './routers';

//引入仓库
import store from '../store/vuex'

//使用插件
Vue.use(VueRouter);

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace
//第一个参数：告诉原来push方法，你往哪跳转（传递哪些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call||apply区别
        /**
         * 相同点：都可以调用函数一次，都可以篡改函数的上下一次
         * 不同点：call与apply传递参数：call传递参数用多个逗号隔开，apply方法执行，传递数组
         */
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

//配置路由
let router = new VueRouter({
    //配置路由
    routes: routers,
    //滚动条行为(详情页功能)
    scrollBehavior(to, from, savedPosition) {
        //返回的这个y=0，代表的滚动条在最上方
        return {
            y: 0
        }
    }
})

//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    /**
     * to:可以获取到你要跳转到那个路由信息
     * from:可以获取到你从哪个路由而来的信息
     * next:放行函数---写法
     * 1.next();---直接放行
     * 2.next("/home");---放行到指定的路由
     * 3.next(false);
     */
    //用户登录了，才会有token，未登录，一定不会有token
    let token = store.state.MyLogin.token;
    //登录组件---获取用户信息
    let name = store.state.MyLogin.userInfo.name;
    if (token) {
        //用户已经登录，还想去登录页[不能去，停留在首页]
        if (to.path == "/login" || to.path == "/register") {
            next("/home");
        } else {
            //登录了，但是去的不是登录页，可能去[home，search，detail，shopcart]
            //如果用户信息存在,放行
            if (name) {
                next();
            } else {
                //没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    //获取用户信息成功
                    //登录组件---获取用户信息在首页展示
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    //token失效了，获取不到用户信息，重新存储---清除token
                    await store.dispatch("getUserLoginOut");
                    next("/login");
                }
            }
        }
    } else {
        //未登录不能去交易相关的页面||不能去支付相关的页面
        //未登录去上面这些路由---登录
        let toPath = to.path;
        if (toPath.indexOf("/trade") !== -1 || toPath.indexOf("/pay") != -1 || toPath.indexOf("/center") != -1) {
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next("/login?redirect=" + toPath);
        } 
        
        //去的不是上面的这些路由(home|search|shopCart)---放行
        next();
    }
});

export default router;