// 数据处理
function filterData(data) {
    let obj = { hot: [] };
    for (let i = 0; i < data.length; i++) {
        let {Findex,Fother_name,Fsinger_mid,Fsinger_name} = data[i];
        let avator = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${Fsinger_mid}.jpg?max_age=2592000`
        let singerItem = {Findex,Fother_name,Fsinger_mid,Fsinger_name,avator};
        // 将前十条数据加入到最熟内部
        if(i<10){
            obj.hot.push(singerItem)
        }
        // 如果首字母的相关歌手不存在 手动创建
        if(!obj[Findex]){
            obj[Findex] = [singerItem]
        }else{
            // 如果已经存在  就添加到数组中
            obj[Findex].push(singerItem)
        }
    }
    // 将对象转成数组
    let hot = [];
    let other = [];
    for (const key in obj) {
        if (key == 'hot') {
            hot.push({Findex:key,list:obj[key]});
        }else if(key != 9){
            other.push({Findex:key,list:obj[key]})
        }
    }
    // 将other数组进行sort排序
    other.sort((a,b)=>{return a.Findex.charCodeAt()- b.Findex.charCodeAt()})
    // 将最热的和排序过的数据进行合并
    let result = hot.concat(other)
    return result;
}

export default filterData;