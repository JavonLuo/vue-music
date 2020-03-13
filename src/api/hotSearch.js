//保存热搜歌曲
function HotSearch(kw){
        // 从本地读取热搜列表
        let hotSearchList = JSON.parse(localStorage.getItem('hotSearch'))
        // 设置一个监听器 如果本地已经存储 就设置false
        let flag = true 
        if(!hotSearchList || !hotSearchList.length){
            flag = true
        }else{
            hotSearchList.forEach((item,index)=>{
                if(kw == item){
                    flag = false
                }
            })
        }
        // 如果为true 就说明没保存有
        if(flag){
                if(hotSearchList && hotSearchList.length>10){
                    // 如果大于或者等于十 就剪掉最后一首歌
                    hotSearchList.pop()
                }else if(!hotSearchList){
                    // 走到这里说明是一个空 我们先赋值一个空数组
                    hotSearchList = []
                }
            // 添加最新的一首
            hotSearchList.unshift(kw)
            // 再保存到本地
            localStorage.setItem('hotSearch',JSON.stringify(hotSearchList))
        }
}
export default HotSearch