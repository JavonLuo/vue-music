<template>
  <div id="app">
<headerComponent></headerComponent>
<tab></tab>
<!-- 播放组件 -->

<Player></Player>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Player from './components/Player/index'
import headerComponent from './components/Header/index';
import tab from './components/Tab/index'



export default {
  components: {
    headerComponent,tab,Player
  }
}
</script>

<style lang='less' scoped>
@import './style/index.less';
#app {
background:@background;
.w(375);
height:100vh;
}
</style>
