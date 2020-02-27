<template>
  <div class="singers">
    <!-- 滚动的列表 -->
    <div class="wrapper" ref="singerWrapper">
      <div class="content">
        <ul v-for="(item,index) in singers" :key="index">
          <li>
            <!-- 字母标题 -->
            <h3>{{item.Findex}}</h3>
            <ol>
              <!-- 歌手信息 -->
              <li v-for="(sItem,sIndex) in item.list" :key="sIndex">
                <img v-lazy="sItem.avator" alt />
                <span>{{sItem.Fsinger_name}}</span>
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </div>
    <!-- 快速列表 -->
    <!-- <div class="quicklist">
      <ul @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <li
          v-for="(item,index) in quickData"
          :key="index"
          @click="quickJump(item)"
          :class='selFindex==item?"sel":""'
        >{{item}}</li>
      </ul>
    </div> -->


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
    iniitBs() {
      let wrapper = this.$refs.singerWrapper;
      this.Bs = new BS(wrapper, { probeType: 3 });
    }
  },
    computed: {
    quickData(){
      // 快速入口数据和歌手数据做关联
      let result = this.singers.map((item)=>{
        return item.Findex
      })
      // console.log('快速启动数据',result)
      return result
    }
  },
  created() {
    getSingersData()
      .then(data => {
        // console.log(data.data.list);
        let result = filterData(data.data.list);
        this.singers = result;
        // console.log(this.singers);
      })
      .catch(err => {
        throw err;
      });
    // 请求到数据 并更新页面之后在初始化
    this.$nextTick(() => {
      this.iniitBs();
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
    position: absolute;
    right: 10px;
    top: 40px;
    width: 20px;
    background: rgba(0, 0, 0, 0.3);
    font-size: @fs-xs;
    padding: 20px 0 20px;
    color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    text-align: center;
    ul {
      li {
        width: 20px;
        height: 18px;
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