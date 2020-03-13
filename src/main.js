import Vue from 'vue'
import App from './App.vue'
import './style/reset.css'
// import 'animate.css/animate.css'
import 'animate.css/animate.css'

// 引入vuex 
import store from './store/index'
// 引入路由文件
import router from './router/index'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
// 引入mui
import './lib/mui/css/mui.css'
import './lib/mui/js/mui.js'
import './lib/mui/css/iconfont.css'
// mit-ui
import { Button, Cell,Toast,CellSwipe} from 'mint-ui'
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Toast.name,Toast)
Vue.component(CellSwipe.name, CellSwipe);



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
  store,
  router,
  render: h => h(App)
}).$mount('#app')
