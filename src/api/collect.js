// 添加收藏的歌曲
function addCollect(params){
    // 用歌曲mid当作收藏标识存到local storage
    let songToken = params.songmid
    let collectSong = []
    // 取出收藏的数据
    let collect = JSON.parse(localStorage.getItem('collect'))
    if(!collect){
        // 添加收藏
        collectSong.push(songToken)
        // 将收藏歌曲添加存储
        localStorage.setItem('collect',JSON.stringify(collectSong))
    }else{
        let collectIndex = collect.indexOf(songToken)
        // 如果等于-1 说明没有收藏
        if(collectIndex == -1){
            // 添加收藏
            collect.push(songToken)
            // 将收藏歌曲添加存储
            localStorage.setItem('collect',JSON.stringify(collect))
        }else{
            // 否则就是取消收藏
            collect.splice(collectIndex,1)
            // 将收藏歌曲添加存储
            localStorage.setItem('collect',JSON.stringify(collect))
        }
    }
}
export {addCollect}