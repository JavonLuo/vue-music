<template>
  <div class="rankDetail">
    <!-- 头部导航 -->
    <div class="top">
      <span @click="back" class="back mui-icon iconfont icon-fanhui"></span>
      <h1 class="listname">{{listName}}</h1>
    </div>
    <!-- 背景图 -->
    <div class="bcg" :style="{'background-image':`url(${picUrl})`}" ref="img"></div>
    <!-- 歌曲列表 -->
    
    <div :class="fullScreen?'songList-wrapper':'songList-wrapper afterPlay'" ref="wrapper">
      <div class="songlist-content">
        <ul>
          <li v-for="(item,index) in songlist" :key="index" @click="openPlay(index)">
              <div class="rank">
              <span class="index">{{index+1}}</span>
              </div>
              <div class="right_text">
              <h2>{{item.songname}}</h2>
              <span>{{item.singer[0].name}}.{{item.albumname}}</span>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 过滤数据方法
// import filterData from "../Detail/filterRankSongList"
// 获取数据
import { getRankSongList } from "../../api/api"
// 获取歌曲播放地址
import {getSongUrlByMid} from '../../api/api'
// 滚动
import BS from "better-scroll"
// 引入vuex 
import {mapMutations,mapState} from 'vuex'
export default {
  data() {
    return {
      songlist:[],
      listName:'',
      picUrl:''
    };
  },
    computed:{
    ...mapState(["fullScreen"]),
  },
  methods: {
    ...mapMutations(['addSongList','changeCurrendIndex','changeScreen']),
    // 打开播放器
    openPlay(index){
        // 点击歌的li显示播放器
       this.addSongList(this.songlist)
        // 确定点击的是那首歌
       this.changeCurrendIndex(index)
        // 变大
       this.changeScreen(true)
    },
    back() {
      this.$router.go(-1);
    },
        // 初始化滚动
    initBs() {
      // 获取图片的元素和高度
      let img = this.$refs.img;
      let imgH = img.clientHeight;
      let wrapper = this.$refs.wrapper;
      // better-scroll默认阻止点击事件 click：true 解决
      this.Bs = new BS(wrapper, { probeType: 3, click: true });
      // 滚动监听
      this.Bs.on("scroll", ({ y }) => {
        if (y >= 0) {
          // 说明下拉图片 图片就放大
          let precent = 1 + y / imgH; // 放大precent倍
          img.style.transform = `scale(${precent})`;
          img.style.zIndex = 1;
        } else {
          // y大于零 说明向上滚动
          // 没有到达顶部之前 滚动层的层级高
          // 到达顶部的时候 图片的层级高
          if (-y > imgH - 40) {
            img.style.zIndex = 1;
            img.style.paddingTop = "0%";
            img.style.height = "40px";
          } else {
            img.style.zIndex = -1;
            img.style.paddingTop = "70%";
            img.style.height = 0;
          }
        }
      });
    },
       // 处理请求回来的数据 传入list
    handleData(songlist) {
      let result = [];
      let mids = [];
      songlist.map((item, index) => {
        // 解构音乐信息
        let { albummid, albumname, singer, songmid, songname } = item.data;
        let albumUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`;
        mids.push(songmid);
        result.push({
          albummid,
          albumname,
          singer,
          songmid,
          songname,
          albumUrl
        });
      });
      return { result, mids };
    }
  },
  async created() {
    // 接受路由传参topid
    let topid = this.$router.currentRoute.params.topid
    // 获取歌曲信息
    let res = await getRankSongList(topid)
    // 列表名
    this.listName = res.topinfo.ListName
    // 列表图片
    this.picUrl = res.topinfo.pic_v12
    // 把数据添加到播放器---的数据
    let {result,mids}  = this.handleData(res.songlist)
    // 请求歌曲播放地址
    let urls = await getSongUrlByMid(mids)
    // console.log(urls);
    // 过滤掉不可播放的歌曲
    let finalData = []
    for (let index = 0; index < result.length; index++) {
      result[index].audioUrl = urls.urls[index];
      if(urls.urls[index]){
        // 将不能播放的歌曲去除
        finalData.push(result[index])
      }
    }
    //  console.log(finalData);
    this.songlist = finalData
    // 初始化滚动
    this.$nextTick(()=>{
        this.initBs()
    });
  }
};
</script>
<style lang='less' scoped>
@import "../../style/index.less";
.rankDetail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: @background;
  text-align: left;
  .top {
    .w(375);
    height: 40px;
    color: #fff;
    position: absolute;
    top: 0;
    z-index: 5;
    // background: chartreuse;
    .back {
      position: absolute;
      top: 5px;
      left: 10px;
      font-size: 32px;
      color: @fs-color;
    }
    .listname {
      font-size: @fs-l;
      color: #fff;
      width: 80%;
      margin: 0 auto;
      line-height: 40px;
      text-align: center;
    }
  }
  .bcg {
    .w(375);
    padding-top: 70%;
    background-size: cover;
    position: absolute;
  }
  .songList-wrapper {
    .w(375);
    // background: chartreuse;
    position: fixed;
    top: 262px;
    bottom: 0px;
    // overflow: hidden;

    ul {
      padding: 20px 30px;
      background: @background;
      li{
          height: 64px;
          display: flex;
          .index{
              display: inline-block;
              width: 25px;
              height: 64px;
              line-height: 64px;
              text-align: center;
              margin-right: 30px;
              color: @fs-color;
              font-size: @fs-xl;
          }
          .right_text{
              flex: 1;
              display: flex;
              flex-direction:column;
              line-height: 20px;
              justify-content: center;
              overflow: hidden;
              h2{
                  text-overflow:ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  color: #fff;
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 25px;
                  margin: 0;
                  font-weight: 400;
              }
              span{
                  text-overflow:ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  margin-top:3px;
                  color: hsla(0,0%,100%,.3);
              }
            // justify-content: center;
          }
      }
    }
  }
  .afterPlay{
  bottom: 60px;
}
}
</style>
