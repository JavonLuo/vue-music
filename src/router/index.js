import Vue from 'vue';
import VueRouter from 'vue-router';
import recommend from '../components/Recommend/index';
import singer from '../components/Singer/index';
import search from '../components/Search/index';
import rank from '../components/Rank/index';
import songListDetail from '../components/Detail/SongList.vue'
import rankSongList from '../components/Detail/RankSongList.vue'

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
            component:singer,
            children:[
                {
                    path:':singermid',
                    name:'detail',
                    component:songListDetail
                }
            ]
        },
        {
            path:'/rank',
            component:rank,
            children:[
                {
                    path:':topid',
                    component:rankSongList
                }
            ]
        },
        {
            path:'/search',
            component:search
        },
        {
            path:'/',
            redirect:'/recommend'
        }
    ]
})

export default router;