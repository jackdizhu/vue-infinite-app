import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { appRegisterManage } from './config/index';

const $prop = appRegisterManage(); // 初始化全局对象
console.log($prop);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
