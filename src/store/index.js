// 创建一个状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import recentPlay from '../api/recentPlay'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        songList:[],//要放的歌曲列表
        fullScreen:true,//大小屏
        currentIndex:-1,//当前正在播放的哪首歌
        loop:0,         //循环模式 0表示不循环 1单曲循环 2列表循环 3随机循环
        closeList:false,  //播放列表
    },
    mutations:{
        //控制大屏小屏切换
        changeScreen(state,screenState){
            state.fullScreen = screenState
        },
        //添加播放列表
        addSongList(state,params){
            //params 要放的歌曲列表
            state.songList = params
        },
        changeCurrendIndex(state,index){
            //修改当前正在播放那首歌
            state.currentIndex = index
        },
            //下一首
        nextCurrendIndex(state){
            let count = state.songList.length
            if(state.currentIndex<count-1){
                state.currentIndex++
            }else{
                state.currentIndex = 0;
            }
            
        },
        playList(state,params){
            state.closeList = params
        },
        // 上一首
        prevCurrendIndex(state){
            let count = state.songList.length
            if(0<state.currentIndex){
                state.currentIndex--
            }else{
                state.currentIndex = count-1;
            }
            
        },
        // 改变循环模式
        changeloop(state){
            if(state.loop===3){
                state.loop = 0
            }else{
                state.loop++
            }
        }

    },
    getters:{
        currentSong(state){
            // 添加最近播放列表
            recentPlay(state.songList[state.currentIndex])
            // 当前放的哪一首歌
            return state.songList[state.currentIndex] || null;
        },
    }
})


export default store