<template>
  <div class="player" v-if="songList.length">
    <!-- 大的播放器 -->
    <div class="big" v-if="fullScreen">
      <!-- 头部 -->
      <div class="top">
        <span @click="changeScreen(false)" class="toggle mui-icon iconfont icon-wei-"></span>
        {{currentSong.songname}}
      </div>
      <!-- 背景 -->
      <div class="bg">
        <img :src="currentSong.albumUrl" alt />
      </div>
      <!-- 歌手姓名 -->
      <h2 class="singername">{{currentSong.singer[0].name}}</h2>
      <!-- 专辑图片 -->
      <div class="img">
        <img :class='cd' :src="currentSong.albumUrl" alt />
      </div>
        <!-- 播放器 -->
        <div class="bar">
        <i @click="changeloop" 
        :class="loop==0?'mui-icon iconfont icon-buxunhuanbofang-'
        :loop==1?'mui-icon iconfont icon-danquxunhuan'
        :loop==2?'mui-icon iconfont icon-liebiaoxunhuan'
        :'mui-icon icon-suijixunhuan'
        "></i>
        <i @click="prev" class="mui-icon iconfont icon-shangyishou"></i>
        <i @click="togglePlay" :class="play?'mui-icon iconfont icon-weibiaoti--':'mui-icon iconfont icon-weibiaoti--1'"></i>
        <i @click="next" class="mui-icon iconfont icon-xiayishou"></i>
        <i @click="isStore" :class="store!==-1?'mui-icon iconfont icon-icon red':'mui-icon iconfont icon-ziyuan'"></i>
        </div>
    </div>
    <!-- 小屏播放器 -->
    <div v-else class="small" @click="changeScreen(true)">
      <div class="left_box">
        <div class="img">
        <img :src="currentSong.albumUrl" alt="">
        </div>
        <div class="text">
          <h1>{{currentSong.songname}}</h1>
          <p>{{currentSong.singer[0].name}}</p>
        </div>
      </div>
      <div class="right_box">
        <i :class="play?'mui-icon iconfont icon-weibiaoti--':'mui-icon iconfont icon-weibiaoti--1'"
        @click.stop="togglePlay"
        ></i>
        <i class="mui-icon iconfont mui-icon-bars" @click.stop="playList(true)"></i>
      </div>

    </div>
    <!-- 播放 -->
    <audio 
    ref="audio"
    @canplay="canplay"
    @ended="ended"
    @timeupdate="timeupdate"
    :src="currentSong.audioUrl"></audio>
    <!-- 歌词 -->
    <Lyric
    :seekTime = 'seekTime'
    :play = 'play'
    v-show="fullScreen"
    ></Lyric>
    <!-- 进度条 -->
    <Myprogress
    :startTime = 'startTime'
    :endTime = 'endTime'
    @seekFn = 'seek'
    v-show="fullScreen"
    ></Myprogress>
  </div>
</template>

<script>
// vuex
import { mapState, mapMutations, mapGetters } from "vuex";
// 进度条组件
import Myprogress from '../Grogress/index'
// 歌词
import Lyric from '../Lyric/index'
// 收藏歌曲
import {addCollect} from '../../api/collect'
export default {
  components:{Myprogress,Lyric},
  data() {
    return {
      storeIndex:1,
      startTime:0,
      endTime:0,
      play: false,
      seekTime:0,
      store:-1,

    };
  },
  computed: {
    ...mapState(["songList", "fullScreen",'loop','closeList']),
    ...mapGetters(["currentSong"]),
    cd(){
        return this.play?'cd':'cd paused'
    }
  },
  created(){

  },
  methods: {
    ...mapMutations(["changeScreen",
     "nextCurrendIndex",
     'changeloop',
     'prevCurrendIndex',
     'changeCurrendIndex',
     'togglePlay',
     'playList',]),
    //  检测是否收藏
     isCollect(){
      //  从本地存储获取收藏数据
        let collectList = JSON.parse(localStorage.getItem('collect'))
      //  因为对象的比较是引用地址的比较 所以转换为json格式进行比较
        let currentSong = this.currentSong.songmid
      //  如果当前歌曲在本地存储中不存在 那么就返回-1
        if(!collectList){
          this.store = -1
        }else{
          this.store = collectList.indexOf(currentSong)
        }
     },
    // 播放完毕触发的事件
    ended(){
      // console.log('播放完毕');
      // 播放完毕 先停掉转动的图片
      this.play = false
      // 判断循环模式
      switch (this.loop) {
        case 1:
          // 单曲循环
          this.play = true
          this.audio.play()
          break;
        case 2:
          // 列表循环 相当于下一曲
          this.nextCurrendIndex()
          break;
        case 3:
          // 随机循环
          // 获取随机数
          let count = this.songList.length
          let index = parseInt(Math.random()*count)
          this.changeCurrendIndex(index)
        default:
          break;
      }

    },
    // 歌曲播放的过程中触发的事件
    timeupdate(e){
      //console.log(e.target.currentTime);//歌曲播放过程中的时间
      this.startTime = e.target.currentTime
      // console.log(this.startTime);
    },
    // 点击收藏或者取消收藏
    isStore(){
      addCollect(this.currentSong)
      this.isCollect()
    },
    togglePlay(){
        this.play = !this.play
    },
    canplay(){
        // 监听歌曲可以播放
        this.audio = this.$refs.audio
        // 调用播放方法
        this.audio.play()
        // 让专辑图片转起来
        this.play = true
        // 播放歌曲的总时长
        this.endTime = this.audio.duration
        // console.log(this.audio.duration);
        // console.log('已经可以播放了');
        // console.log(this.audio.__proto__);
    },
    next(){
        // 下一曲
        this.nextCurrendIndex()
        this.isCollect()
    },
    prev(){
      // 上一曲
      this.prevCurrendIndex()
      this.isCollect()
    },
    seek(s){
      // 如果不是播放状态 就不播放
      if(!this.audio){return false}
      // 更改播放时间
      this.audio.currentTime = s
      // 更改歌词的时间
      this.seekTime = s
    },
  },
  watch:{
      play(newValue,oldValue){
          if(newValue==true){
            this.isCollect()
          }
        // 播放状态 
          if(!this.audio) return false
          if(newValue){
              this.audio.play()
          }else{
              this.audio.pause()
          }
      },
      fullScreen(newValue,oldValue){
        if(newValue){
          this.isCollect()
        }
      }
  }
};
</script>
<style lang='less' scoped>
@import "../../style/index.less";
.player {
  .big {
    color: #fff;
    background: #333;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    .top {
      .w(375);
      height: 40px;
      line-height: 40px;
      font-size: @fs-l;
      text-align: center;
      .toggle {
        color: @fs-color;
        font-size: 32px;
        position: absolute;
        top: 5px;
        left: 15px;
      }
    }
    .singername {
      font-size: @fs-s;
      text-align: center;
      // padding: 10px;
    }
    .bg {
      position: absolute;
      z-index: -7;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      filter: blur(40px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img {
      text-align: center;
      .w(375);
      padding: 20px;
      box-sizing: border-box;
      img {
        width: 85%;
        border-radius: 50%;
        border: 15px solid hsla(0, 0%, 100%, 0.1);
      }
      & .cd {
        animation: rotate 10s linear infinite;
      }
      & .paused {
        animation-play-state: paused;
      }
     
    }
    .bar{
      .w(375);
      height: 40px;
      position: absolute;
      bottom: 55px;
      display: flex;
      align-items: center;
      justify-content: center;
      i{
        width: 15%;
        height: 100%;
        font-size: 35px;
        color: @fs-color;
        // margin:0 5px;
      }
        i:nth-child(1){
          margin-left: 13px;
        }
        i:nth-child(5){
        margin-top: 8px;
        font-size: 30px;
        // color: red;
      }
        .red{
         color:#d93f30;;
      }
    }
  }
  .small {
    position: fixed;
    .w(375);
    bottom: 0;
    height: 60px;
    background:#333;
    display: flex;
    justify-content: space-between;
    .left_box{
      width: 220px;
      height: 100%;
      display: flex;
      // justify-content: center;
      align-items: center;
      .img{
        width: 40px;
        height: 40px;
        // border: 1px solid green;
        border-radius: 50%;
        margin: 0 10px 0 20px;
        overflow: hidden;
        // background: lightgreen;

        img{
          width: 100%;
          height: 100%;
        }
      }
      .text{
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        // align-items: center;
        h1{
          font-weight: 400;
          font-size: 14px;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          line-height: 20px;
        }
        p{
          color: hsla(0,0%,100%,.3);
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 2px 0 0;
        }
      }
    }
    .right_box{
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      i{
        font-size: 32px;
        color: rgba(255,205,49,.5);
        margin-right:15px;
        // background: #eeeeee;
      }
      i:nth-child(2){
        margin-bottom: 5px;
      }


    }
  }
   @keyframes rotate {
          0% {
              transform:rotate(0deg)
          }
          100% {
              transform: rotate(360deg)
          }
      }
    
      
}
</style>
