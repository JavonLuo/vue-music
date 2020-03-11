<template>
  <div id="app">
<headerComponent></headerComponent>
<tab></tab>
<!-- 播放组件 -->
<Player></Player>
<PlayList></PlayList>

  </div>
</template>

<script>

// import HelloWorld from './components/HelloWorld.vue'
import Player from './components/Player/index'
import PlayList from './components/PlayList/index'
import headerComponent from './components/Header/index';
import tab from './components/Tab/index'
// mui 组件
import 'mint-ui/lib/style.css'



export default {
  components: {
    headerComponent,tab,Player,PlayList
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
