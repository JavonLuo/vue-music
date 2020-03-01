<template>
    <div class="header">
        <!-- 如果图片在根目录下 可以直接用根目录路径 -->
        <img src="/logo.png" alt="">
        <span>Chicken Music</span>
    </div>
</template>


<script>
export default {
    
}
</script>


<style lang="less" scoped>
@import '../../style/index.less';
// scoped 表示作用域
.header{
    color:@fs-color;
    font-size: @fs-l;
    display: flex;
    justify-content:center;
    align-items:center;
    .w(375);
    height: 44px;
    img{
        height: 25px;
        width: 25px;
        margin-right: 10px
    }
}



</style>