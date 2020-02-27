<template>
  <div class="recommend">
    <div class="wrapper" ref="wrapper">
      <ul class="content">
        <!-- 轮播图 -->
        <banner :banners="bannerList">
          <span>45</span>
        </banner>
        <!-- 热门歌单推荐 -->
        <div class="title">热门歌单推荐</div>
        <li v-for="(item,index) in recommendList" :key="index" class="list">
          <div class="leftImg">
            <img v-lazy="item.imgurl" alt />
          </div>
          <div class="rightText">
            <h2>{{item.creator.name}}</h2>
            <p>{{item.dissname}}</p>
          </div>
        </li>
      </ul>
      <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
    </div>
  </div>
</template>

<script>

// 引入banner图
import banner from "../Banner/index";
// 引入滑动库
import BS from "better-scroll";
// 引入请求接口
import { getBanner, getRecommend } from "../../api/api.js";
import { get } from "http";
export default {
  components: { banner },
  data() {
    return {
      bannerList: [],
      recommendList: []
    };
  },
  mounted() {
// 请求轮播同
    getBanner()
      .then(res => {
        this.bannerList = res.data.slider;
      })
      .catch(error => {
        throw error;
      });
// 请求推荐
    getRecommend()
      .then(res => {
        this.recommendList = res.data.list;
      })
      .catch(error => {
        throw error;
      });
// 初始化滚动
    let wrapper = this.$refs.wrapper;
    new BS(wrapper);
  }
};
</script>


<style lang="less" scoped>
@import "../../style/index.less";
.wrapper {
  position: fixed;
  top: 88px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: hidden;

  .content {
    .w(375);
    .title {
      font-size: @fs-s;
      color: @fs-color;
      .w(375);
      height: 65px;
      line-height: 65px;
      text-align: center;
    }
    .list {
      .w(375);
      height: 82.4px;
      padding: 0 20px 20px 20px;
      display: flex;
      box-sizing: border-box;
      .leftImg {
        width: 60px;
        height: 60px;
        padding-right: 20px;
        img {
          width: 100%;
        }
      }
      .rightText {
        text-align: left;
        color: #fff;
        // font-size: @fs-s;
        line-height: 20px;
        h2 {
          font-size: 100%;
          margin-bottom: 10px;
        }
        p {
          font-size: 100%;
          color: hsla(0, 0%, 100%, 0.3);
        }
      }
    }
  }
}
</style>