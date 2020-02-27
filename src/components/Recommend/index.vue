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
        <li v-for='(item,index) in recommendList'
        :key = 'index' class="list"
        >
        <div class="leftImg">
          <img v-lazy="item.imgurl" alt="">
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
// 引入axios库
import axios from "../../utils/axios";
// 引入banner图
import banner from "../Banner/index";
// 引入滑动库
import BS from 'better-scroll';
export default {
  components: { banner },
  data() {
    return {
      bannerList: [],
      recommendList: []
    };
  },
  mounted() {
    let bannerUrl =
      "/hehe/music/api/getTopBanner?g_tk=1928093487&inCharset=utf8&outCharset=utf-8&notice=0&format=json&platform=yqq.json&hostUin=0&needNewCode=0&-=recom8123954143736101&data=%7B%22comm%22:%7B%22ct%22:24%7D,%22category%22:%7B%22method%22:%22get_hot_category%22,%22param%22:%7B%22qq%22:%22%22%7D,%22module%22:%22music.web_category_svr%22%7D,%22recomPlaylist%22:%7B%22method%22:%22get_hot_recommend%22,%22param%22:%7B%22async%22:1,%22cmd%22:2%7D,%22module%22:%22playlist.HotRecommendServer%22%7D,%22playlist%22:%7B%22method%22:%22get_playlist_by_category%22,%22param%22:%7B%22id%22:8,%22curPage%22:1,%22size%22:40,%22order%22:5,%22titleid%22:8%7D,%22module%22:%22playlist.PlayListPlazaServer%22%7D,%22new_song%22:%7B%22module%22:%22newsong.NewSongServer%22,%22method%22:%22get_new_song_info%22,%22param%22:%7B%22type%22:5%7D%7D,%22new_album%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_info%22,%22param%22:%7B%22area%22:1,%22sin%22:0,%22num%22:10%7D%7D,%22new_album_tag%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_area%22,%22param%22:%7B%7D%7D,%22toplist%22:%7B%22module%22:%22musicToplist.ToplistInfoServer%22,%22method%22:%22GetAll%22,%22param%22:%7B%7D%7D,%22focus%22:%7B%22module%22:%22QQMusic.MusichallServer%22,%22method%22:%22GetFocus%22,%22param%22:%7B%7D%7D%7D";
    axios
      .get(bannerUrl)
      .then(res => {
        this.bannerList = res.data.slider;
        // console.log(this.imgList);
      })
      .catch(error => {
        throw error;
      });

    let recommendUrl =
      "/hehe/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.3983624931217431";
    axios
      .get(recommendUrl)
      .then(res => {
        this.recommendList = res.data.list;
        console.log(this.recommendList);
      })
      .catch(error => {
        throw error;
      });
      let wrapper = this.$refs.wrapper;
      new BS(wrapper)
  }
};
</script>


<style lang="less" scoped>
@import "../../style/index.less";
  .wrapper{
    position: fixed;
    top:88px;
    bottom: 0px;
    left:0px;
    right: 0px;
    overflow: hidden;

.content{
  .w(375);
  .title {
  font-size: @fs-s;
  color: @fs-color;
  .w(375);
  height: 65px;
  line-height: 65px;
  text-align: center;
}
.list{
  .w(375);
  height: 82.4px;
  padding: 0 20px 20px 20px;
  display: flex;
  box-sizing:border-box;
  .leftImg{
    width: 60px;
    height: 60px;
    padding-right: 20px;
    img{
      width: 100%;
    }
  }
  .rightText{
    text-align: left;
    color: #fff;
    // font-size: @fs-s;
    line-height: 20px;
    h2{
      font-size: 100%;
      margin-bottom: 10px;
    }
    p{
      font-size: 100%;
     color: hsla(0,0%,100%,.3)
    }
  }
}
}
  }

</style>