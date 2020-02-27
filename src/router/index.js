import Vue from 'vue';
import VueRouter from 'vue-router';
import recommend from '../components/Recommend/index';
import singer from '../components/Singer/index';
import search from '../components/Search/index';
import rank from '../components/Rank/index';
// 使用路由
Vue.use(VueRouter)
// 实例路由对象
const router = new VueRouter({
    routes:[
        {
            path:'/recommend',
            component:recommend
        },
        {
            path:'/singer',
            component:singer
        },
        {
            path:'/rank',
            component:rank
        },
        {
            path:'/search',
            component:search
        },
    ]
})

export default router;