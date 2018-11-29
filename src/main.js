import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
//导入element-ui框架
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI); //注册到Vue上
//导入放大镜
import ProductZoomer from "vue-product-zoomer";
Vue.use(ProductZoomer);
//导入iv写完了框架
import iView from "iview";
import "iview/dist/styles/iview.css";
Vue.use(iView);
//导入aios
//类似于 vue-resource this.$http
import axios from "axios";
Vue.prototype.$axios = axios;
//设置带上cookie
axios.defaults.withCredentials = true;
//使用axios的方式设置基础地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";
//导入路由
import VueRouter from "vue-router";
Vue.use(VueRouter);
// 导入全局样式
import "./assets/site/css/style.css";
//导入每一个页面的组件
import index from "./components/index.vue";
import detail from "./components/02.detail.vue";
import shopCart from "./components/03.shopCart.vue";
import order from "./components/04.order.vue";
import login from "./components/05.login.vue";
// 写路由规则
let routes = [
  {
    path: "/",
    //重定向到首页/index
    redirect: "/index"
  },
  {
    path: "/index",
    component: index
  },
  {
    path: "/detail/:artID",
    component: detail
  },
  {
    path: "/shopCart",
    component: shopCart
  },
  {
    path: "/order/:ids",
    component: order
  },
  {
    path: "/login",
    component: login
  }
];
// 实例化路由对象
let router = new VueRouter({
  routes
});
// 增加导航守卫 回调函数(每次路由改变的时候 触发)
router.beforeEach((to, from, next) => {
  console.log("守卫啦!!!!");
  // console.log(to);
  // console.log(from);
  if (to.path.indexOf('/order')!=-1) {
    // 正要去订单页
    // 必须先判断登录
    axios.get("site/account/islogin").then(result => {
      // console.log(result);
      if (result.data.code == "nologin") {
        // 提示用户
        Vue.prototype.$Message.warning("请先登录");
        // 跳转页面(路由)
        router.push("/login");
      } else {
        //如果登录成功啦
        next();
      }
    });
  } else {
    // next 如果不执行 就不会路由跳转
    next();
  }
});
//注册全局过滤器 方便使用
//导入moment
import moment from "moment";
Vue.filter("shortTime", value => {
  return moment(value).format("YYYY😘MM😘DD👍");
});
Vue.filter("shortTimePlus", value => {
  return moment(value).format("YYYY/MM/DD HH:mm:ss");
});
//vuex的使用
import Vuex from "vuex";
Vue.use(Vuex);
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // count: 0
    cartData: JSON.parse(window.localStorage.getItem("hm24")) || {},
    isLogin: false
  },
  getters: {
    totalCount(state) {
      let num = 0;
      for (const key in state.cartData) {
        num += state.cartData[key];
      }
      return num;
    }
  },
  mutations: {
    add2Cart(state, obj) {
      if (state.cartData[obj.goodId] != undefined) {
        state.cartData[obj.goodId] += obj.goodNum;
      } else {
        Vue.set(state.cartData, obj.goodId, obj.goodNum);
      }
    },
    updateCartData(state, obj) {
      state.cartData = obj;
    },
    delGoodsById(state, id) {
      this.delete(state.cartData, id);
    },
    changeLogin(state, isLogin) {
      state.isLogin = isLogin;
    }
  }
});
//浏览器关闭保存数据
window.onbeforeunload = function() {
  window.localStorage.setItem("hm24", JSON.stringify(store.state.cartData));
};

new Vue({
  render: h => h(App),
  //传入路由对象
  router,
  store,
  //生命周期函数
  created() {
    axios.get("site/account/islogin").then(result => {
      // console.log(result);
      if (result.data.code == "nologin") {
        // 提示用户
        Vue.prototype.$Message.warning("请先登录");
        // 跳转页面(路由)
        router.push("/login");
      } else {
        //修改仓库中的状态
        store.state.isLogin=true;
        //如果登录成功啦
        // next();
      }
    });
  }
}).$mount("#app");
