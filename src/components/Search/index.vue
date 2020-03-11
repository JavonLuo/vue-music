<template>
  <div>
    <div class="search">
      <!-- 搜索框 -->
      <div class="search-box-wrapper">
        <!-- 搜索区 -->
        <div class="search-box">
        <i class="mui-icon mui-icon-search"></i>
          <input type="text" @keypress="searchGoods" placeholder="搜索歌曲、歌手" ref="input">
        </div>
        <!-- 内容区 -->
        <div class="search_content" v-if="songlist.length" ref="wrapper">
          <ul>
            <li v-for="(item,index) in songlist" :key='index' @click="openPlay(index)">
              <span>{{index+1}}</span><p>{{item.songname+'-'+item.singer}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex
import {mapMutations} from 'vuex'
// 搜素  获取歌曲播放地址
import {getSearchSong,getSongUrlByMid} from '../../api/api'
export default {
  data(){
    return{
      songlist:[]
    }
  },
  methods:{
    searchGoods(e){
      // console.log(e.keyCode)
      if(e.keyCode == 13){
        // console.log(this.$refs.input.value)
        this.filterData()
        }
      },
    handleData(data) {
      let result = [];
      let mids = [];
      
        // 解构音乐信息
        // 专辑信息
        let albummid = data.album.itemlist[0].mid
        let albumname = data.album.itemlist[0].name
        let albumUrl = data.album.itemlist[0].pic

        // 歌曲信息
        data.song.itemlist.map((item,index)=>{
          let singer = item.singer
          let songmid = item.mid
          let songname = item.name
  
          mids.push(songmid);
          result.push({
            albummid,
            albumname,
            singer,
            songmid,
            songname,
            albumUrl

        })
        
      });
      return { result, mids };
    },
  async filterData(){
        let kw = this.$refs.input.value
    try{
       let res = await getSearchSong(kw)
       let {result,mids} = this.handleData(res.data)
       // console.log(result);
       let urls = await getSongUrlByMid(mids)
       // 过滤掉不可播放的歌曲
       let finalData = []
        for (let index = 0; index < result.length; index++) {
        result[index].audioUrl = urls.urls[index];
        if(urls.urls[index]){
          // 将不能播放的歌曲去除
          finalData.push(result[index])
        }
       }
      //  console.log(finalData);
      this.songlist = finalData
    }catch(err){throw err}
    },
    ...mapMutations(['addSongList','changeCurrendIndex','changeScreen']),
    // 打开播放器
    openPlay(index){
        // 点击歌的li显示播放器
       this.addSongList(this.songlist)
        // 确定点击的是那首歌
       this.changeCurrendIndex(index)
        // 变大
       this.changeScreen(true)
    },

  },

  created(){
  }
};
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
      padding: 0;
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
    .search_content{
      // width: 100%;
      position: fixed;
      top: 23%;
      left: 0;
      right: 0;
      bottom: 60px;
      overflow: hidden;
      ul{
        width: 100%;
        li{
          margin:10px 20px;
          display: flex;
          span{
            width: 30px;
            height: 30px;
            display: inline-block;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          p{
          flex: 1;
          font-size: 14px;
          color: hsla(0,0%,100%,.3);
          line-height: 30px;
          text-align: left;
          margin: 0;
        }
        }
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