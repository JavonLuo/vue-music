<template>
  <div class="header" @click="flag=false">
    <span class="mui-icon mui-icon-bars" @click.stop="setting"></span>

    <!-- 如果图片在根目录下 可以直接用根目录路径 -->
    <img src="/logo.png" alt />
    <span>JaFeng Music</span>
      <router-link to="/user" tag="div" active-class="sel">
        <span class="mui-icon mui-icon-contact"></span>
      </router-link>
  </div>
</template>


<script>
// mint-ui
import { Toast } from "mint-ui";
// import offcanvas from "../Offcanvas/index";
export default {
  // components: { offcanvas },
  data() {
    return {
      flag: false
    };
  },
  methods: {
    setting() {
      Toast({
        message: "功能正在开发中敬请期待...",
        position: "center",
        duration: 1500
      });
    },
    close() {}
  }
};
</script>


<style lang="less" scoped>
@import "../../style/index.less";
// scoped 表示作用域
.header {
  color: @fs-color;
  font-size: @fs-l;
  display: flex;
  justify-content: center;
  align-items: center;
  .w(375);
  height: 44px;
  img {
    height: 25px;
    width: 25px;
    margin-right: 10px;
  }
  .mui-icon {
    font-size: 26px;
    position: absolute;
    color: #ffcd32;
  }
  .mui-icon-bars {
    left: 16px;
    top: 10px;
  }
  .mui-icon-contact {
    right: 16px;
    top: 6px;
  }
}
</style>