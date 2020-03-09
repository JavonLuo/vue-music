<template>
  <div>
    <div class="progress-wrapper">
          <span class="start-time">{{startTime|handleTime}}</span>
          <div class="progress-bar" @click='clickProgress' ref="wrapper">
            <div class="bar-inner" ref="barInner"></div>
            <div class="dot" ref="dot"
            @touchstart = 'touchStart'
            @touchmove = 'touchMove'
            @touchend = 'touchEnd'
            >
                <div class="yellow">

                </div>
            </div>
          </div>
          <span class="end-time">{{endTime|handleTime}}</span>
        </div>
  </div>
</template>

<script>

export default {
    props:{
        startTime:{type:Number,default:0},
        endTime:{type:Number,default:0}
    },
    filters:{
        handleTime(data){
            let m = parseInt(data/60)
            // 描数
            let s = parseInt(data%60)
            s=s<=9?`0${s}`:s
            return m+':'+s
        }
    },
    methods:{
        // 歌曲快进 传快进长度到父组件快进
        jump(precent){
            let time = precent*this.endTime/100
            // 调用父组件的方法控制播放的时间
            // console.log(this.endTime);
            // console.log(time);
            this.$emit('seekFn',time)
        },
        // 拖动进度条快进
        // 按下
        touchStart(e){
            // 按下给实例加一个属性为true 表示按下了
            this.touch = true
            // 默认距离为零
            this.distance = 0
            // console.log('按下');

        },
        // 移动
        touchMove(e){
            // console.log(e.touches[0].pageX);
            // 元素左边到左屏幕的距离
            let left = this.$refs.wrapper.getBoundingClientRect().left
            // 元素的宽度
            let width = this.$refs.wrapper.clientWidth
            // 移动的距离等于移动距离左屏幕边框的距离减去元素左边到屏幕左边框的距离
            // console.log(left,width);
            // console.log(e.touches[0].pageX);
            this.distance = e.touches[0].pageX - left
            // console.log(this.distance);
            if(this.distance>=-8&&this.distance<=width-8){
                // 调整进度条和小圆点
                // console.log(this.distance);
                this.offsetMove(this.distance)
            }
        },
        // 抬起
        touchEnd(e){
            // 抬起的时候
            this.touch = false
            // 抬起的时候就放音乐
            // console.log('抬起'+this.distance);
            let precent = this.distance/this.$refs.wrapper.clientWidth*100
            this.jump(precent)

        },
        // 点击进度条快进
        clickProgress(e){
            // console.log(this.$refs.wrapper.getBoundingClientRect());
            // console.log(e);
            let x = e.pageX
            let left = this.$refs.wrapper.getBoundingClientRect().left
            // let width = this.$refs.wrapper.clientWidth
            let distance = x - left
            this.offsetMove(distance)
            // this.distance = e.touches[0].pageX - left


        },
        offsetMove(distance){
            // 进度条的移动
            let precent = (distance/this.$refs.wrapper.clientWidth)*100
            // console.log(precent);
            this.$refs.barInner.style.width = precent + '%'
            // 小圆点移动
            this.$refs.dot.style.transform= `translateX(${distance}px)`
            // 控制歌曲时间 按下状态 不控制歌曲快进
            if(this.touch){return false}
            this.jump(precent)
        }
    },
    watch:{
        startTime(newValue,oldValue){
            //      当前播放时间所占的百分比
            // 如果是按下状态进度条不受歌曲影响 
            if(this.touch){return false}
            let precent = (this.startTime/this.endTime)*100
            this.$refs.barInner.style.width = precent + '%'
            // 小圆点移动
            let width = this.$refs.wrapper.clientWidth*precent/100
            // console.log(width);
            this.$refs.dot.style.transform= `translateX(${width-8}px)`

        }
    },
    mounted(){
        // console.log(this.endTime);
    }

  }

</script>
<style lang='less' scoped>
@import '../../style/index.less';
.progress-wrapper{
    .w(375);
    height: 30px;
    // background: lightgreen;
    display: flex;
    font-size:@fs-xs;
    align-items: center;
    justify-content: center;
    // margin-top: 30px;
    position: absolute;
    bottom: 120px;
    span{
        display: inline-block;
        width: 40px;
        // background: red;
        text-align: center;
        
    }
    .progress-bar{
        .w(200);
        margin: 0 10px;
        height: 4px;
        background: rgba(0,0,0,0.3);
        position:relative;
    .bar-inner{
        height: 4px;
        width: 0%;
        background: @fs-color;
    }
    .dot{
        width: 16px;
        height: 16px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        // left: -8px;
        transform: translateX(-8px);
        top: -6px;
        .yellow{
            position: absolute;
            top: 2px;
            left: 2px;
            height: 12px;
            width: 12px;
            background: @fs-color;
            border-radius: 50%;
        }
    }
}

}
</style>
