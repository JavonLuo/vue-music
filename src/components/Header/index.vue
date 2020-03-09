<template>
  <div class="header" @click="flag=false">
    <span class="mui-icon mui-icon-bars" @click.stop="flag=true"></span>
    <!-- 如果图片在根目录下 可以直接用根目录路径 -->
    <img src="/logo.png" alt />
    <span>JaFeng Music</span>
    <span class="mui-icon mui-icon-contact"></span>
    <transition
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight"
    >
      <offcanvas v-if="flag"></offcanvas>
    </transition>
  </div>
</template>


<script>
import offcanvas from "../Offcanvas/index";
export default {
  components: { offcanvas },
  data() {
    return {
      flag: false
    };
  },
  methods: {
    open() {
      // this.flag = !this.flag
      // console.log(this.flag);
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