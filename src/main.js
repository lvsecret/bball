import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;
//导入element-ui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);//注册到Vue上
//导入iv写完了框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
//导入aios
//类似于 vue-resource this.$http
import axios from 'axios'
Vue.prototype.$axios=axios;
//导入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter)
// 导入全局样式
import './assets/site/css/style.css'
//导入每一个页面的组件
import index from './components/index.vue'
import detail from './components/02.detail.vue'
// 写路由规则
let routes=[
  {
    path:'/',
    //重定向到首页/index
    redirect:'/index'
  },
  {
    path:'/index',
    component:index
  },
  {
    path:'/detail/:artID',
    component:detail
  }
]
// 实例化路由对象
let router=new VueRouter({
  routes
});
//注册全局过滤器 方便使用
//导入moment
import moment from 'moment';
Vue.filter('shortTime',value=>{
  return moment(value).format("YYYY😘MM😘DD👍");
});
Vue.filter('shortTimePlus',value=>{
  return moment(value).format("YYYY/MM/DD HH:mm:ss");
});

new Vue({
  render: h => h(App),
  //传入路由对象
  router
}).$mount('#app')
