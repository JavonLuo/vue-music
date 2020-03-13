// 保存最近播放的音乐
function recentPlay(params){
    // 从本地读取最近播放列表
    let recentPlayList = JSON.parse(localStorage.getItem('recent'))
    // 设置一个监听器 如果本地已经存储 就设置false
    let flag = true 
    if(!recentPlayList || !recentPlayList.length){
        flag = true
    }else{
        recentPlayList.forEach((item,index)=>{
            if(params.songmid == item.songmid){
                flag = false
            }
        })
    }
    // 如果为true 就说明没保存有
    if(flag){
            if(recentPlayList && recentPlayList.length>10){
                // 如果大于或者等于十 就剪掉最后一首歌
                recentPlayList.pop()
            }else if(!recentPlayList){
                // 走到这里说明是一个空 我们先赋值一个空数组
                recentPlayList = []
            }
        // 添加最新的一首
        recentPlayList.unshift(params)
        // 再保存到本地
        localStorage.setItem('recent',JSON.stringify(recentPlayList))
    }
}

export default recentPlay