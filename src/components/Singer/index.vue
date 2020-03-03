<template>
  <div class="singers">
    <!-- 滚动的列表 -->
    <div class="wrapper" ref="singerWrapper">
      <div class="content">
        <ul v-for="(item,index) in singers" :key="index">
          
          <li :ref="item.Findex">
            <!-- 字母标题 -->
            <h3>{{item.Findex=='hot'?'热门':item.Findex}}</h3>
            <ol>
              <!-- 歌手信息 -->
              <li v-for="(sItem,sIndex) in item.list" 
              :key="sIndex" 
              @click="goDetail(sItem.Fsinger_mid)">
                <img v-lazy="sItem.avator" alt />
                <span>{{sItem.Fsinger_name}}</span>
              </li>
            </ol>
          </li>
        </ul>
      </div>
    <!-- 快速列表 -->
    <div class="quicklist">
      <ul 
      @touchstart='touchestart'
      @touchmove='touchmove'
      @touchend='touchend'>
        <li
          v-for="(item,index) in quickData"
          :key="index"
          :class='selFindex==item?"sel":""'
          v-on:click='jump(item)'
        >{{item=='hot'?'热':item}}</li>
      </ul>
    </div>
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
// 引入接口
import { getSingersData } from "../../api/api.js";
// 引入数据处理方法
import filterData from "./filterData.js";
// 滚动
import BS from "better-scroll";
// console.log(BS);
export default {
  data() {
    return {
      singers: [],
      selFindex : 'hot',
    };
  },
  methods: {
    goDetail(Fsinger_mid){
      // console.log(Fsinger_mid);
      // 去往子路由歌曲歌手详情页
      this.$router.push(`/singer/${Fsinger_mid}`)
    },
    touchestart(e){
      // console.log('按下');
      // 设定距离屏幕顶部的位置时140
      let y = e.touches[0].pageY;
      // 获取按下的格子下标
      let startCount = parseInt((y-140)/18)
      this.touch.y = y;
      this.touch.startCount = startCount;
      // console.log('按下',y ,startCount)


    },
    touchmove(e){
      let moveY = e.touches[0].pageY;  //移动距离顶部的距离
      let moveDis = moveY-this.touch.y; //移动的距离
      // console.log(moveDis);
      let count = parseInt(moveDis/18)//移动的格子数
      // console.log(count);
      let moveIndex = this.touch.startCount + count //获取下标
      // console.log(moveIndex);
      // 防止超出边界处理
      if(moveIndex<0||moveIndex>this.quickData.length-1){return false}
      let moveFindex = this.quickData[moveIndex]
      this.jump(moveFindex)

    },
    touchend(){
      // console.log('d');
    },
    // 点击快速列表
    jump(item){
      // console.log(item);
      // 点击后item就是点到的字母
      // 根据字母获取对应的元素
      let dom = this.$refs[item][0];
      // 用bs内部的方法直接跳转到固定元素
      // console.log(dom);
      // console.log(this.Bs);
      this.Bs.scrollToElement(dom)

    },
    // 初始化滚动
    initBs() {
      let wrapper = this.$refs.singerWrapper;
      // better-scroll默认阻止点击事件 click：true 解决
      this.Bs = new BS(wrapper, { probeType: 3 , click:true});
      // 获取距离数组 和监听滚动
      let distance=[]
      for (const key in this.$refs) {
          if(key!=='singerWrapper'){
            distance.push(this.$refs[key][0].offsetTop)
          }
      }
      // 监听滚动
    this.Bs.on('scroll',({x,y})=>{
        // console.log(-y);
        // 循环距离数组
        let scrollIndex = 0 //滚动的下标
        for (let index = 0; index < distance.length; index++) {
            if(-y>=distance[index] && -y<distance[index+1]){
              scrollIndex = index;
            }else if(-y>=distance[distance.length-1]){
            // 最后一项的边界处理
            scrollIndex = distance.length-1;
          }          
        }
        // 根据下标换字母
        let scrollFindex = this.quickData[scrollIndex]
        // console.log(scrollFindex);
        this.selFindex = scrollFindex;
      })

    },

  },
    computed: {
    quickData(){
      // 快速入口数据和歌手数据做关联
      // console.log(this);
      let result = this.singers.map((item)=>{
        return item.Findex
      })
      // console.log('快速启动数据',result)
      return result
    }
  },
  created() {
    this.touch = {y:0}
    getSingersData()
      .then(data => {
        // console.log(data.data.list);
        let result = filterData(data.data.list);
        this.singers = result;
        // console.log(this.singers);
            // 请求到数据 并更新页面之后在初始化
        this.$nextTick(() => {
        this.initBs();
              });
           })
           .catch(err => {
                throw err;
           });


  }
};
</script>

<style lang="less" scoped>
@import "../../style/index.less";
.wrapper {
  // height: 100%;
  overflow: hidden;
  position: fixed;
  top: 88px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  .quicklist {
    // z-index: 2;
    position: absolute;
    right: 0px;
    top: 55px;
    width: 20px;
    background: rgba(0, 0, 0, 0.3);
    font-size: @fs-xs;
    padding: 20px 0 5px 0;
    color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    text-align: center;
    ul {
      li {
        width: 20px;
        height: 18px;
        line-height: 1px;
      }
      .sel {
        color: @fs-color;
      }
    }
  }

  .content {
    .w(375);
    h3 {
      height: 30px;
      line-height: 30px;
      background: #333;
      color: rgba(255, 255, 255, 0.5);
      font-size: @fs-s;
      padding-left: 20px;
      text-align: left;
    }
    ol {
      li {
        .w(375);
        height: 70px;
        // background: pink;
        box-sizing: border-box;
        padding: 20px 0px 0px 30px;
        display: flex;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 25px;
        }
        span {
          padding-left: 20px;
          display: inline-block;
          height: 50px;
          line-height: 50px;
          font-size: @fs-s;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
}
</style>