<template>
  <div>
    <!-- <h1 v-upper="msg"></h1> -->
    <MyHeader></MyHeader>
    <!-- 路由出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、search显示的，在登录、注册隐藏 -->
    <MyFooter v-show="$route.meta.show"></MyFooter>
  </div>
</template>

<script>
//引入组件
import MyHeader from "./components/Header/MyHeader.vue";
import MyFooter from "./components/Footer/MyFooter.vue";
export default {
  name: "App",
  data() {
    return {
      msg: "abc",
    };
  },
  components: {
    MyHeader,
    MyFooter,
  },
  mounted() {
    //通知Vuex发请求，获取数据，存储于仓库
    //三级联动
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
