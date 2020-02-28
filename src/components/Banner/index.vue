<template>
  <div class="banner">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in banners" :key="index">
          <img :src="item.picUrl" alt />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>


<script>
// 引入swiper模块
import Swiper from "swiper";
export default {
  props: {
    banners: { type: Array, default: [] }
  },
  methods: {
    initBanner() {
      new Swiper(".swiper-container", {
        loop: true, // 循环模式选项
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: {
          delay: 1000 //1秒切换一次
        }
      });
    }
  },
  watch: {
    banners() {
      this.$nextTick(() => {
        this.initBanner();
      });
    }
  }
};
</script>


<style lang="less" scoped>
@import "../../style/index.less";
@import "~swiper/css/swiper.min.css";
.swiper-container {
  .w(375);
  .h(150);
  //   background: green;
  img {
    width: 100%;
  }
}
</style>