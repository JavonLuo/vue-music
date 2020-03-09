<template>
  <div>
    <div class="search">
      <!-- 搜索框 -->
      <div class="search-box-wrapper">
        <div class="search-box">
        <i class="mui-icon mui-icon-search"></i>
          <input type="text" placeholder="搜索歌曲、歌手">
        </div>
      </div>
      <!-- 热门搜素 -->
      <div class="hot_key">
        <h1>热门搜索</h1>
        <ul>
          <li>
            <span>我们的歌</span>
          </li>
             <li>
            <span>演员</span>
          </li>
             <li>
            <span>绅士</span>
          </li>
             <li>
            <span>遥远的她</span>
          </li>
             <li>
            <span>意外</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style lang="less" scoped>
@import "../../style/index.less";
.search {
  position: fixed;
  top: 88px;
  bottom: 0;
  left: 0;
  right: 0;
  background: @background;
  .search-box-wrapper{
    margin:20px;
  .search-box{
    width: 100%;
    height: 40px;
    background: #333;
    border-radius: 6px;
    padding: 6px;
    box-sizing: border-box;
    display: flex;
    input{
      border: none;
      outline: none;
      flex:1;
      margin: 0 5px;
      height: 100%;
      color: #fff;
      line-height: 18px;
      font-size: 14px;
      background: none;
      // margin-left:-7px ;
    }
    i{
      color: #222222;
      font-size: 24px;
    }
  }
  }
  .hot_key{
    margin: 10px 20px 20px;
    h1{
      margin-left:2px;
      margin-bottom: 10px;
      font-size: 14px;
      color: hsla(0,0%,100%,.5);
      text-align: left;
      font-weight: normal;
    }
    ul{
      text-align: left;
      li{
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: #333333;
        font-size: 14px;
        color: hsla(0,0%,100%,.3);
        line-height: 16px;
        // text-align: left;
      }
    }
  }
}
</style>