<template>
  <div class="lyric">
    <p>{{txt}}</p>
  </div>
</template>

<script>
// 引入api    getLyricByMid
import { getLyricByMid } from "../../api/api";
// 引入全局状态管理
import { mapState, mapGetters } from "vuex";
// 歌词对接插件
import Lyric from "lyric-parser";
// 歌词解码
import { Base64 } from "js-base64";
export default {
  data() {
    return {
      txt: "歌词加载中..."
    };
  },
  props: ["play", "seekTime"],
  computed: {
    ...mapGetters(["currentSong"])
  },
  methods: {
    getLyric(songmid) {
      getLyricByMid(songmid).then(data => {
        // 解析歌词
        let lyricStr = Base64.decode(data.lyric);
        // console.log(lyricStr);
        // 如果之前有播放对象 将播放停掉
        if (this.lyricObj) {
          this.lyricObj.stop();
        }
        this.lyricObj = new Lyric(lyricStr, ({ lineNum, txt }) => {
          // console.log({ lineNum,txt });
          this.txt = txt;
        });
        // 解析完毕直接播放
        this.lyricObj.play();
      });
    }
  },
  watch: {
    // seekTime发生变化 快进 歌词也要变化
    seekTime(newTime, oldTime) {
      if (!this.lyricObj) return false;
      this.lyricObj.seek(newTime * 1000);
    },
    // 播放暂停的时候也要暂停歌词
    play(newPlay, oldPlay) {
      if (!this.lyricObj) return false;
      this.lyricObj.togglePlay();
    },
    // 切换歌的时候 歌词也要变化 发起axios请求歌词
    currentSong(newSong, oldSong) {
      let { songmid } = this.currentSong;
      this.getLyric(songmid);
    }
  },
  mounted() {
    // 歌词组件被挂载 第一播放歌曲
    let { songmid } = this.currentSong;
    // console.log(this.currentSong);
    this.getLyric(songmid);
  }
};
/*

播放 play
停止 stop   togglePlay
跳转 seek
*/
</script>
<style lang='less' scoped>
@import "../../style/index.less";
.lyric {
  .w(375);
  text-align: center;
  height: 60px;
  position: absolute;
  bottom: 160px;
  p {
    font-size: 18px;
    font-weight: 500;
    color: white;
  }
}
</style>
