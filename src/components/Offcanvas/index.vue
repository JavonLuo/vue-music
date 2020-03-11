<template>
  <div>
<div class="wrapper">
    <!-- 侧滑导航根容器 -->
<div class="mui-off-canvas-wrap mui-draggable">
  <!-- 菜单容器 -->
  <aside class="mui-off-canvas-left">
    <div class="mui-scroll-wrapper">
      <div class="mui-scroll">
        <!-- 菜单具体展示内容 -->
        ...
      </div>
    </div>
  </aside>
  <!-- 主页面容器 -->
  <div class="mui-inner-wrap">
    <!-- 主页面标题 -->
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-action-menu mui-icon-bars mui-pull-left"></a>
      <h1 class="mui-title">标题</h1>
    </header>
    <div class="mui-content mui-scroll-wrapper">
      <div class="mui-scroll">
        <!-- 主界面具体展示内容 -->  
        ...
      </div>
    </div>  
  </div>
</div>
  </div>
  </div>
</template>

<script>

export default {
  
  }

</script>
<style lang='less' scoped>
    .wrapper{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 100px;
        z-index: 22;
    }
</style>
