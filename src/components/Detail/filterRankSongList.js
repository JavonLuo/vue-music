function filterData(data) {
    let rankSongList = {}
    let songlist = []
    let mids = []
    //  图片列表名称 图片地址
    rankSongList.picurl = data.topinfo.pic_v12
    rankSongList.ListName = data.topinfo.ListName
    //  歌手和歌名
    for (let index = 0; index < data.songlist.length; index++) {
        // 歌手
        let singername = data.songlist[index].data.singer[0].name
        // 歌名
        let songname = data.songlist[index].data.songname
        // 歌曲mid
        let mid = data.songlist[index].data.songmid
        // 专辑
        let albumname = data.songlist[index].data.songname
        // 歌曲保存到数组中
        songlist.push({ songname, singername,albumname})
        //歌曲的mid保存到数组mids中
        mids.push(mid)
    }
    rankSongList.songlist = songlist
    return {rankSongList,mids}

}


export default filterData