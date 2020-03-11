<template>
  <div>
    <div :class="fullScreen?'rankWrapper':'rankWrapper afterPlay'" ref="rankWrapper">
    <ul>
      <li v-for="(item,index) in rankList" :key="index" @click="goDetail(item.id)">
        <div class="img">
          <img v-lazy="item.picUrl" alt="">
        </div>
        <div class="content">
          <p v-for="(item,index) in item.songList" :key="index">
            <span class="num">{{index + 1}}</span>
            <span>{{item.songname}}</span>
            <span>{{item.singername}}</span>
          </p>
        </div>
      </li>
    </ul>
    </div>
        <!-- 动画嵌套路由 -->
    <transition
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
    >
    <router-view></router-view>
    </transition>
  </div>
  
</template>

<script>
// 控制小屏出现的时候 改变滚动的css样式
import { mapState } from "vuex";
// 过滤数据方法
import filterData from '../Detail/filterRankSongList'
import {getRankList} from '../../api/api'
// 引入滑动库
import BS from "better-scroll"
export default {
  data(){
    return{
      rankList:[]
    }
  },
  computed:{
    ...mapState(["fullScreen"]),
  },
  methods:{
    initBS(){
      let wrapper = this.$refs.rankWrapper;
      // better-scroll默认阻止点击事件 click：true 解决
      this.Bs = new BS(wrapper, { probeType: 3 , click:true});
    },
    goDetail(topid){
      this.$router.push(`/rank/${topid}`)
    }
  },
  created(){
    getRankList()
    .then((res)=>{
      // console.log(res);
      this.rankList = res.data.topList
      // console.log(this.rankList);
        this.$nextTick(()=>{
          this.initBS()
        })


    })
  }
};
</script>


<style lang="less" scoped>
@import "../../style/index.less";
.rankWrapper {
  position: fixed;
  top: 88px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: hidden;

  ul {
    margin: 0 20px;
    li{
    padding-top: 20px;
    background: #333333;
    background-clip:content-box;
    display: flex;
    justify-content: space-between;
    .img{
      width: 100px;
      height: 100px;
      img{
        width: 100px;
        height: 100px;
      }
    }
    .content{
      padding: 0 20px;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      height: 100px;
      color: hsla(0,0%,100%,.3);
      p{
        width: 100%;
        line-height: 26px;
        font-size: @fs-xs;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
        text-align: left;
        .num{
          margin-right:3px;
        }
      }
    }
    }
  }
}
.afterPlay{
  bottom: 60px;
}
</style>