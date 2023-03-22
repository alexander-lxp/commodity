import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//三级联动组件---全局组件
import MyTypeNav from './components/TypeNav/MyTypeNav'
//注册 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(MyTypeNav.name, MyTypeNav);

//floor轮播（家用电器和手机）全局组件
import MyCarousel from './components/Carousel/MyCarousel'
//注册floor轮播---全局组件
Vue.component(MyCarousel.name, MyCarousel);

//Pagination分页组件---全局组件
import MyPage from './components/Pagination/MyPage'
//注册page分页---全局组件
Vue.component(MyPage.name, MyPage);

//引入element-ui---Button按钮组件---MessageBox弹窗组件
import { Button, MessageBox } from 'element-ui';
//注册element-ui组件---Button按钮组件---MessageBox弹窗组件
Vue.component(Button.name, Button);
//element-ui注册组件的时候，还有一种写法，挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from './router/index';

//引入仓库
import store from './store/vuex';

//引入MockServe.js----mock数据
import "./mock/mockServe";

//引入swiper样式
import "swiper/css/swiper.css";

//统一接收接口api文件夹里面全部请求函数
import * as API from "@/api";

//引入静态文件---图片
import gifImage from '@/assets/sanjiu.gif';

//引入图片懒加载的插件
import VueLazyload from 'vue-lazyload';
//注册和使用图片懒加载的插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: gifImage,
});

//引入自定义插件
// import myPlugins from '@/plugins/MyPlugins';
// //注册自定义插件
// Vue.use(myPlugins,{
//   name:"upper"
// });

//引入表单校验插件
import "@/plugins/MyValidate"

new Vue({
  render: h => h(App),
  //配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    //接收接口api文件夹里面全部请求函数
    Vue.prototype.$API = API;
  },
  //注册路由
  router,
  //注册仓库：组件实例身上会多个一个属性$store属性
  store,
}).$mount('#app')
