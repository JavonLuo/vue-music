<template>
  <div class="player" v-if="songList.length">
    <!-- 大的播放器 -->
    <div class="big" v-if="fullScreen">
      <!-- 头部 -->
      <div class="top">
        <span @click="changeScreen(false)" class="toggle">▼</span>
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
        <!-- 播放 -->
        <button @click="togglePlay">播放</button>
        <button @click="next">下一曲</button>
        <!-- 播放器 -->
        <audio 
        ref="audio"
        @canplay="canplay"
        controls
        :src="currentSong.audioUrl"></audio>
    </div>
    <!-- 小屏播放器 -->
    <div v-else class="small" @click="changeScreen(true)">小屏</div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      play: false
    };
  },
  computed: {
    ...mapState(["songList", "fullScreen"]),
    ...mapGetters(["currentSong"]),
    cd(){
        return this.play?'cd':'cd paused'
    }
  },
  methods: {
    ...mapMutations(["changeScreen", "nextCurrendIndex"]),
    togglePlay(){
        this.play = !this.play
    },
    canplay(){
        // 监听歌曲可以播放
        this.audio = this.$refs.audio
        console.log('已经可以播放了');
        console.log(this.audio.__proto__);
    },
    next(){
        // 下一曲
        this.nextCurrendIndex()
    }
  },
  watch:{
      play(newValue,oldValue){
          if(!this.audio) return false
          if(newValue){
              this.audio.play()
          }else{
              this.audio.pause()
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
        font-size: 30px;
        position: absolute;
        top: 0px;
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
      filter: blur(15px);
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
  }
  .small {
    position: fixed;
    .w(375);
    bottom: 0;
    height: 80px;
    background: lightgreen;
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
