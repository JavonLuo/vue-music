<template>
  <div>
    <div class="songlist_wrapper" v-show="closeList">
      <div class="title">
        <i @click="changeloop" 
        :class="loop==0?'mui-icon iconfont icon-buxunhuanbofang-'
        :loop==1?'mui-icon iconfont icon-danquxunhuan'
        :loop==2?'mui-icon iconfont icon-liebiaoxunhuan'
        :'mui-icon icon-suijixunhuan'
        "></i>
        <h1>{{loops[loop]}}</h1>
      </div>
      <div class="content" ref="wrapper">
      <ul>
        <li v-for="(item,index) in songList" :key='index' @click="openPlay(index)">
       
          <p>{{item.songname}}</p>
          <i @click.stop="isStore(index)" 
          :class="store[index]!==-1?'mui-icon iconfont icon-icon red':'mui-icon iconfont icon-ziyuan'"></i>
        </li>
      </ul>
      </div>
      <div class="bottom">
        <mt-button 
        type="default" 
        style="background:rgba(0,0,0,.3)" 
        size='large'
        @click.native="playList(false)"
        >关闭</mt-button>
      </div>

    </div>
  </div>
</template>

<script>
// 引入滑动库
import BS from "better-scroll"
// vuex
import { mapState, mapMutations, mapGetters } from "vuex";
// 收藏歌曲
import {addCollect} from '../../api/collect'
export default {
    data(){
        return{
        loops:['不循环','单曲循环','顺序播放','随机播放'],
        store:[],

        }
    },
    computed: {
    ...mapState(["songList",'loop','closeList','play']),
    ...mapGetters(["currentSong"]),
    },
    methods: {
    ...mapMutations(["togglePlay",
    'changeScreen',
    "nextCurrendIndex",
    'changeloop',
    'prevCurrendIndex',
    'changeCurrendIndex',
    'playList',]),
    //初始化滚动
    //  是否添加或者取消收藏
     isStore(index){
        addCollect(this.songList[index])
        this.isCollect()
     },
    //  检测是否收藏
     isCollect(){
    //  从本地存储获取收藏数据
        let collectList = JSON.parse(localStorage.getItem('collect'))
    //  如果当前歌曲在本地存储中不存在 那么就返回-1
        if(!collectList){
            for (let index = 0; index < this.songList.length; index++) {
                // vue中数组响应式变化 用this.$set(this.arrList, 0, 10)
                this.$set(this.store, index, -1);
                }
        }else{
            for (let index = 0; index < this.songList.length; index++) {
                //  取出播放列表的songmid
                let currentSong = this.songList[index].songmid
                // vue中数组响应式变化 用this.$set(this.arrList, 0, 10)
                this.$set(this.store, index, collectList.indexOf(currentSong));
                }
        }
     },
    initBs(){
    let wrapper = this.$refs.wrapper;
    // better-scroll默认阻止点击事件 click：true 解决
    this.Bs = new BS(wrapper, { probeType: 3 , click:true});
    },
    openPlay(index){
    // 确定点击的是那首歌
    this.changeCurrendIndex(index)
    // 打开大屏播放器
    this.changeScreen(true)
    // 关闭自己
    // this.playList(false)
    // 
     },
    },
    watch:{
        closeList(newValue,oldValue){
            // closeList为true 说明播放列表打开
            if(newValue){
                this.initBs()
                this.isCollect()

            }
        }
    }

  }

</script>
<style lang='less' scoped>
@import '../../style/index.less';
.songlist_wrapper{
    position: fixed;
    top: 262px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background:#333;
    display: flex;
    flex-direction: column;
    .title{
      display: flex;
      height: 40px;
      margin-left: 15px;
      i{
        font-size: 32px;
        color: rgba(255,205,49,.5);
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      h1{
        flex: 1;
        line-height: 40px;
        font-size: 16px;
        font-weight: 400;
        color: hsla(0,0%,100%,.5);
        text-align: left;
        margin:0 0 0 5px;
      }
    }
    .content{
      flex: 1;
      overflow: hidden;
    }
    ul{
      margin: 0px 15px;
      // background:fuchsia;
      li{
        margin: 0 15px;
        display: flex;
        justify-content: space-between;
        // align-items: center;
        // height: 40px;
        p{
          margin: 0;
          line-height: 40px;
          color: hsla(0,0%,100%,.3);
        }
        i{
          font-size: 16px;
          color: @fs-color;
          line-height: 40px;
        }
        .red{
          color:#d93f30;
        }
      }
    }
  }

</style>
