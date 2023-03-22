<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要再引入 -->
    <MyTypeNav></MyTypeNav>
    <MyList></MyList>
    <MyRecommended></MyRecommended>
    <MyRanking></MyRanking>
    <MyLike></MyLike>
    <MyFloor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :list="floor"
    ></MyFloor>
    <MyTrademark></MyTrademark>
  </div>
</template>

<script>
//引入其余的组件
import MyList from "./ListContainer/MyList.vue";
import MyRecommended from "./RecommendedToday/MyRecommended.vue";
import MyRanking from "./ProductRanking/MyRanking.vue";
import MyLike from "./GuessLike/MyLike.vue";
import MyFloor from "./Floor/MyFloor.vue";
import MyTrademark from "./Trademark/MyTrademark.vue";
//引入仓库数据
import { mapState } from "vuex";
export default {
  name: "MyHome",
  components: {
    MyList,
    MyRecommended,
    MyRanking,
    MyLike,
    MyFloor,
    MyTrademark,
  },
  mounted() {
    //floor(家用电器和手机)
    //派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList");
  },
  computed: {
    //floor(家用电器和手机)
    ...mapState({
      floorList: (state) => {
        return state.MyHome.floorList;
      },
    }),
  },
};
</script>

<style scoped>
</style>