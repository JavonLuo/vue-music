<template>
  <div class="detail">
    <!-- 头部导航 -->
    <div class="top">
      <span @click="back" class="back">◀</span>
      <span class="singername">{{name}}</span>
    </div>
    <!-- 头像 -->
    <div class="avator" :style="{'background-image':`url(${avator})`}" ref="img">
      <div class="shadow"></div>
    </div>
    <!-- 歌曲列表 -->
    <div class="songlist" ref="wrapper">
      <div class="content">
        <ul>
          <li v-for="(item,index) in list" :key="index" @click="openPlay(index)">
            <h2>{{item.songname}}</h2>
            <p>{{name}}.{{item.albumname}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex 
import {mapMutations} from 'vuex'
// 引入Bs
import BS from "better-scroll";
// 根据mid发起请求方法
import { getSongByMid, getSongUrlByMid } from "../../api/api.js";
export default {
  data() {
    return {
      list: [],
      name: "",
      avator: ""
    };
  },
  methods: {
    ...mapMutations(['addSongList','changeCurrendIndex','changeScreen']),
    // 打开播放器
    openPlay(index){
        console.log(1);
        // 点击歌的li显示播放器
       this.addSongList(this.list)
        // 确定点击的是那首歌
       this.changeCurrendIndex(index)
        // 变大
       this.changeScreen(true)
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
    // 详情页返回
    back() {
      this.$router.go(-1);
    },
    // 处理请求回来的数据 传入list
    filterData(list) {
      let result = [];
      let mids = [];
      list.map((item, index) => {
        // 解构音乐信息
        let { albummid, albumname, singer, songmid, songname } = item.musicData;
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
    // console.log(this.$router);
    let { singermid } = this.$router.currentRoute.params;
    // console.log(singermid);
    let data = await getSongByMid(singermid);
    let { result, mids } = this.filterData(data.data.list);
    // console.log(data);
    // 通过接口 将mids 歌曲的媒体id 换成 音乐地址 之后将数据进行合并
    let { urls } = await getSongUrlByMid(mids);
    for (let index = 0; index < result.length; index++) {
      result[index].audioUrl = urls[index];
    }
    // console.log(result);
    this.list = result;
    this.name = data.data.singer_name;
    this.avator = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singermid}.jpg?max_age=2592000`;
    this.$nextTick(() => {
      this.initBs();
    });
  }
};
</script>
<style lang='less' scoped>
@import "../../style/index.less";
.detail {
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
    .back {
      position: absolute;
      top: 0;
      left: 15px;
      font-size: 30px;
      color: @fs-color;
    }
    .singername {
      display: block;
      width: 100%;
      text-align: center;
      line-height: 40px;
      font-size: @fs-l;
    }
  }
  // 头像
  .avator {
    .w(375);
    padding-top: 70%;
    // height: 70%;
    background-size: cover;
    position: absolute;
    top: 0;
    z-index: -1;
    .shadow {
      position: absolute;
      top: 0;
      background: rgba(7, 17, 27, 0.3);
      width: 100%;
      height: 100%;
    }
  }
  // 歌曲列表
  .songlist {
    position: fixed;
    background: @background;
    top: 270px;
    bottom: 0px;
    left: 0;
    right: 0;
    // overflow: hidden;
    .content {
      padding: 10px 30px;
      background: @background;
      li {
        font-size: @fs-s;
        color: #fff;
        height: 60px;
        background: @background;
        h2 {
          height: 20px;
          font-size: @fs-s;
        }
        p {
          margin-top: 4px;
          height: 20px;
          color: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
}
</style>
