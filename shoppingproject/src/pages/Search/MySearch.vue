<template>
  <div>
    <!-- 商品三级分类列表 -->
    <MyTypeNav></MyTypeNav>

    <div class="main">
      <div class="py-container">
        <!--bread:面包屑，带有x的结构的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- <li class="with-x">手机</li> -->
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌面包屑的展示 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖的属性值展示 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
            <!-- <li class="with-x">华为<i>×</i></li>
            <li class="with-x">OPPO<i>×</i></li> -->
          </ul>
        </div>

        <!--selector-->
        <MySearchSelector
          @trademarkInfo="trademarkInfo"
          @attrInfo="attrInfo"
        ></MySearchSelector>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构(排序的结构) -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-jiantou_xiangxia': isDesc,
                        'icon-jiantou_xiangshang': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-jiantou_xiangxia': isDesc,
                        'icon-jiantou_xiangshang': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
                <!-- <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li> -->
              </ul>
            </div>
          </div>

          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 详情页导航 -->
                    <!-- 在路由跳转的时候切记别忘记带id（params）参数 -->
                    <router-link :to="`/detail/${good.id}`"
                      ><img v-lazy="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <!-- <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile02.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile03.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile04.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile05.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile06.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile01.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile02.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile03.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile04.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s
                      (A1699)</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li> -->
            </ul>
          </div>

          <!-- 分页组件 -->
          <MyPage
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          ></MyPage>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MySearchSelector from "./SearchSelector/MySearchSelector.vue";
//引入仓库辅助函数
import { mapGetters, mapState } from "vuex";
export default {
  name: "MySearch",
  data() {
    return {
      //search模块,带给服务器的参数
      searchParams: {
        //一级分类的Id
        category1Id: "",
        //二级分类的Id
        category2Id: "",
        //三级分类的Id
        category3Id: "",
        //用户点击分类的名字
        categoryName: "",
        //关键字
        keyword: "",
        //排序:初始状态应该是综合|降序
        order: "1:desc",
        //分页器:代表当前页是第几页
        pageNo: 1,
        //代表每一页展示的数据的个数
        pageSize: 5,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  components: {
    MySearchSelector,
  },
  //当组件挂载完毕之前执行一次[先与mounted之前]
  //在挂载之前调用一次，可以在发请求之前将带有参数进行修改
  beforeMount() {
    //search模块
    //复杂的写法
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.params.keyword;
    //简单写法
    //在发请求之前，把接口需要传递参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    //search模块
    //在服务器发请求之前带给服务器参数[searchParams参数发生变化有数值带给服务器]
    this.getSearchData();
  },
  computed: {
    //search模块（产品列表动态数据渲染）
    //mapGetters里面的写法，传递数组，因为getters计算属性是没有划分模块[home,search等模块]
    ...mapGetters(["goodsList"]),
    //search模块---综合和价格的active样式显示（排序功能）
    //综合样式显示
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    //价格样式显示
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    //综合和价格图标的降序显示
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    //综合和价格图标的升序显示
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    //search模块---获取分页器展示的产品一共有多少数据(分页功能)
    ...mapState({
      total: (state) => {
        return state.MySearch.searchList.total;
      },
    }),
  },
  methods: {
    //search模块
    //向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示）
    //把这次请求封装为一个函数：当你需要在调用的时候调用即可
    getSearchData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //search模块---删除分类的名字（面包屑功能）
    removeCategoryName() {
      //把带给服务器的参数清空了，还需要想服务器发请求
      this.searchParams.categoryName = undefined;
      //每一次请求完毕，应该把相应的商品分类的一级、二级、三级的Id清空，让它接收下一次的相应的商品分类的一级、二级、三级的Id
      //带给服务器参数说明可有可无：如果属性值为空的字符串还是会把相应的字段带给服务器
      //但是你把相应的字段变为undefined，当前这个字段不会带给服务器
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getSearchData();
      //search模块---删除分类的名字回到默认地址（面包屑路由功能）
      //地址栏也需要回到默认路由（进行路由跳转）---现在的路由跳转只是跳转到自己这里
      //严谨：本意是删除query，如果路径当中出现params不应该删除。路由跳转的时候应该带有
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //search模块---删除关键字的名字（面包屑功能）
    removeKeyword() {
      //给服务器带的参数searchParams的keyword清空
      this.searchParams.keyword = undefined;
      //再次发请求
      this.getSearchData();
      //通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");
      //清除掉面包屑、搜索栏的关键字，路由将进行跳转到默认路由组件
      //还得判断路由得保留三级分类的query参数存在
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    //search模块的子组件---自定义事件回调（品牌点击功能）
    trademarkInfo(trademark) {
      //1.整理品牌字段的参数
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //再次发请求获取search模块列表数据进行展示
      this.getSearchData();
    },
    //search模块的子组件---移除关键字的名字（品牌功能）
    removeTrademark() {
      //将品牌信息清空
      this.searchParams.trademark = undefined;
      //再次发请求
      this.getSearchData();
    },
    //search模块的子组件---收集平台属性地方回调函数---自定义事件（平台售卖属性功能）
    attrInfo(attr, attrValue) {
      //整理参数的格式
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props);
      }
      //再次发请求
      this.getSearchData();
    },
    //search模块的子组件---删除平台售卖属性的名字（平台售卖属性）
    removeAttr(index) {
      //再次整理参数
      this.searchParams.props.splice(index);
      //再次发请求
      this.getSearchData();
    },
    //search模块的子组件---点击改变图标的升降显示而改变数据显示(综合和价格排序功能)
    changeOrder(flag) {
      //flag这个形参：它是一个标记，代表用户点击的是综合（1）还是价格（2）[用户点击的时候传递进来的]
      let originOrder = this.searchParams.order;
      //这里获取到的是最开始的状态
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      //准备应该新的order属性值
      let newOrder = "";
      //点击的是综合
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === "desc" ? "asc" : "desc"}`;
      } else {
        //点击的是价格
        newOrder = `${flag}:${"desc"}`;
      }
      //将新的order赋予searchParams
      this.searchParams.order = newOrder;
      //再次发请求
      this.getSearchData();
    },
    //search模块---分页器的自定义当前第几页事件(分页功能)
    getPageNo(pageNo) {
      //整理带给服务器参数
      this.searchParams.pageNo = pageNo;
      //再次发请求
      this.getSearchData();
    },
  },
  //数据监听:监听组件实例身上的属性的属性值的变化
  watch: {
    //search模块
    //监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route(newValue, oldValue) {
      //再次发请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //再次发起ajax请求
      this.getSearchData();
      //每一次请求完毕，应该把相应的商品分类的一级、二级、三级的Id清空，让它接收下一次的相应的商品分类的一级、二级、三级的Id
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>