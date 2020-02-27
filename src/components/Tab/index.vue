<template>
  <div class="tab">
    <router-link to="/recommend" tag="div" active-class="sel"><span>推荐</span></router-link>
    <router-link to="/singer" tag="div" active-class="sel"><span>歌手</span></router-link>
    <router-link to="/rank" tag="div" active-class="sel"><span>排行</span></router-link>
    <router-link to="/search" tag="div" active-class="sel"><span>搜索</span></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../../style/index.less";

.tab {
  .w(375);
  height: 44px;
  font-size: @fs-s;
  div {
    display: inline-block;
    color: @nav-color;
    width: 25%;
    text-align: center;
    line-height: 44px;

  }
  .sel{
    color: @fs-color;
    span{
        border-bottom: 2px solid @fs-color;
        padding-bottom: 5px;
    }

  }
}
</style>