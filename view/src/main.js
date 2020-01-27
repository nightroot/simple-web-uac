// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//会话封装
import store from '@/store/index'
import storage from '@/store/storage'
Vue.prototype.Storage=storage

// UI介入
import iView from 'view-design'; // 导入组件库
import 'iview/dist/styles/iview.css'; // 导入样式
Vue.use(iView)
//引用UI组件

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
