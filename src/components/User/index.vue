<template>
  <div>
    <div class="user">
      <div class="header">
        <span @click="back" class="back mui-icon iconfont icon-fanhui"></span>
        <ul>
          <li :class="flag?'sel_li':''" @click="flag=true">我喜欢的</li>
          <li :class="!flag?'sel_li':''" @click="flag=false">最近听的</li>
        </ul>
      </div>
      <!-- 收藏的 -->
      <div v-if="flag">
      <div class="content" v-if="collectList.length">
        <ul>
          <li v-for="(item,index) in collectList" :key="index" @click='collectPlay(index)'> <span>{{item.songname}}</span> </li>
      
        </ul>
      </div>
      <!-- 暂无收藏歌曲 -->
      <div class="center_img" v-if="!collectList.length">
        <div class="img"></div>
        <p>暂无收藏歌曲</p>
      </div>
      </div>
      <!-- 最近听的 -->
      <div v-if="!flag">
      <div class="content" v-if="recentPlayList.length">
        <ul>
          <li v-for="(item,index) in recentPlayList" :key="index" @click='recentPlay(index)'> <span>{{item.songname}}</span> </li>
      
        </ul>
      </div>
      <!-- 没有最近听的 -->
      <div class="center_img" v-if="!recentPlayList.length">
        <div class="img"></div>
        <p>你还没有听过歌曲</p>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入方法vuex
import {mapMutations,mapState} from 'vuex';
export default {
  data(){
    return{
      flag:true,
      collectList:[],
      recentPlayList:[]
    }
  },
  computed:{
    ...mapState(['fullScreen'])
  },
  watch:{
    fullScreen(newValue,oldValue){
      if(!newValue){
      // 收藏的数据获取
      this.getCollectList()
      // 最近听的数据获取
      this.getRecentPlayList()
      }
    }
  },

  methods: {
    ...mapMutations(['addSongList','changeCurrendIndex']),
    // 返回
    back() {
      this.$router.go(-1);
    },
    collectPlay(index){
      // 添加歌单
      this.addSongList(this.collectList)
      // 播放歌曲
      this.changeCurrendIndex(index)
    },
    recentPlay(index){
      // 添加歌单
      this.addSongList(this.recentPlayList)
      // 播放歌曲
      this.changeCurrendIndex(index)
    },
    getCollectList(){
    let collectList = JSON.parse(localStorage.getItem('collect'))
    if(collectList){
      this.collectList = collectList
    }
    },
    getRecentPlayList(){
    let recentPlayList = JSON.parse(localStorage.getItem('recent'))
    if(recentPlayList){
      this.recentPlayList = recentPlayList
    }
    }
  },
  created(){
    // 收藏的数据获取
    this.getCollectList()
    // 最近听的数据获取
    this.getRecentPlayList()
  }
};
</script>
<style lang='less' scoped>
@import "../../style/index.less";
.user {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: @background;
  .header {
    .w(375);
    height: 35px;
    span {
      position: fixed;
      top: 10px;
      left: 15px;
      color: @fs-color;
      font-size: 32px;
    }
    ul {
      width: 240px;
      margin: 10px auto 30px;
      display: flex;
      border: 1px solid #333;
      li {
        line-height: 35px;
        width: 50%;
        text-align: center;
        font-size: @fs-s;
        color: hsla(0, 0%, 100%, 0.3);
      }
      .sel_li {
        color: white;
        background: #333;
      }
    }
  }
  .content{
    .w(375);
    ul{
       margin: 30px;
      display: flex;
      flex-wrap:wrap;
      // justify-content: space-between;
      li{
        margin: 0 20px 10px 0;

        padding:5px 10px;
        line-height: 15px;
        text-align: center;
        color: hsla(0,0%,100%,.3);
        font-size: 14px;
        background: #333;
        font-weight: 400;
        border-radius: 6px;
      }
    }

  }
  .center_img {
    position: absolute;
    .w(375);
    top: 50%;
    transform: translateY(-50px);
    .img {
      width: 86px;
      height: 90px;
      margin: 0 auto;
      background-size: 86px 90px;
      background-image: url("/logo.png");
    }
  }
}
</style>
