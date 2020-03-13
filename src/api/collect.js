// 添加收藏的歌曲
function addCollect(params){
    let collectSong = []
    // 取出收藏的数据
    let collect = JSON.parse(localStorage.getItem('collect'))
    if(!collect || !collect.length){
        // 添加收藏
        collectSong.push(params)
        // 将收藏歌曲添加存储
        localStorage.setItem('collect',JSON.stringify(collectSong))
    }else{
        let flag = false  //程序监听 为true表示已经收藏
        let flagIndex   //保存收藏的下标
        collect.forEach((item,index)=>{
            if(params.songmid == item.songmid){
                flag = true
                flagIndex = index
            }
        })
            if(flag){
                // 相等就是取消收藏
                collect.splice(flagIndex,1)
                // 将收藏歌曲添加存储
                localStorage.setItem('collect',JSON.stringify(collect))
                
            }else{
                // 否则添加收藏
                collect.push(params)
                // 将收藏歌曲添加存储
                localStorage.setItem('collect',JSON.stringify(collect))

            }
    }
}
export {addCollect}