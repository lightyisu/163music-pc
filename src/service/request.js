import axios from 'axios';
const baseURL='http://39.102.36.212:3000/'
const request=axios.create({
    baseURL:baseURL,
    timeout:5000
})
request.interceptors.request.use(
    config=>{
        return config
    },
    err=>{}
)
request.interceptors.response.use(
    res=>{
        return res.data
    },
    err=>{
        if(err&&err.response){
            switch(err.response.status){
                case 400:
                    console.log('ERROR 400:请求错误')
                case 401:
                    console.log('ERROR 401:未授权访问')
                default:
                    console.log('ERROR')
                }
        }
        return err
    }
)

const getBanner=()=>(
    request.get('/banner')
)
const getHotRecommend=(limit=10)=>(
    request({
        url:'/personalized',
        params:{
            limit
        }
    })
)
const getNewAlbum=()=>(
    request.get('/album/newest')
)

const getTopranking=(type)=>{
    switch(type){
        case 'speed':
            return request.get('/playlist/detail?id=19723756');
        case 'new':
            return request.get('/playlist/detail?id=3779629');
        case 'origin':
            return request.get('/playlist/detail?id=2884035')
    }
}
const getSettleSinger=()=>(
    request.get('/artist/list?limit=5&cat=5001')
)

const getSongDetail=(id)=>(
    request.get(`/song/detail?ids=${id}`)
)
const getLyric=(id)=>(
    request.get(`/lyric?id=${id}`)
)

export default request
export {getBanner,getHotRecommend,getNewAlbum,getTopranking,getSettleSinger,getSongDetail,getLyric}