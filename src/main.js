import Vue from 'vue'
import App from './App.vue'
import './style/reset.css'

// 引入路由文件
import router from './router/index'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload)
 
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/favicon.ico',
  loading: '/favicon.ico',
  attempt: 1
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
