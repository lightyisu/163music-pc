import { getBanner,getHotRecommend, getNewAlbum, getSettleSinger, getSongDetail, getTopranking } from '../service/request';
import { CHANGE_BANNERS,CHANGE_CURRENT_SONG,CHANGE_HOT_RECOMMEND, CHANGE_HOT_STREAMER, CHANGE_NEW_ALBUM, CHANGE_SETTLE_SINGER, CHANGE_TOP_RANKING} from '../constants/actionType';
import hotStreamer from './local-data.json';
const getBannerAction=()=>{
    return dispatch=>{
            getBanner().then((res)=>{
                dispatch({type:CHANGE_BANNERS,payload:res})
            })
    }
}
const getHotRecommendAction=(limit)=>{
    return dispatch=>{
            getHotRecommend(limit).then((res)=>{
                dispatch({type:CHANGE_HOT_RECOMMEND,payload:res.result})
            })
    }
}
const getNewAlbumAction=()=>{
    return dispatch=>{
            getNewAlbum().then((res)=>{
                dispatch({type:CHANGE_NEW_ALBUM,payload:res.albums})
            })
    }
}
const getToprankingAction=()=>{
    return dispatch=>{
            Promise.all([getTopranking('speed'),getTopranking('new'),getTopranking('origin')]).then((res)=>{
                let resArr=[res[0].playlist,res[1].playlist,res[2].playlist]
                dispatch({type:CHANGE_TOP_RANKING,payload:resArr})
            })
    }
}
const getSettleSingerAction=()=>{
    return dispatch=>{
         getSettleSinger().then((res)=>{
             dispatch({type:CHANGE_SETTLE_SINGER,payload:res.artists})
         })
    }
}

const getSongDetailAction=(id)=>{
    return dispatch=>{
        getSongDetail(id).then((res)=>{
            dispatch({type:CHANGE_CURRENT_SONG,payload:res.songs[0]})
        })
    }
}


const getHotStreamerAction=()=>({type:CHANGE_HOT_STREAMER,payload:hotStreamer.streamer})

export {getBannerAction,getHotRecommendAction,getNewAlbumAction,getToprankingAction,getSettleSingerAction,getHotStreamerAction,getSongDetailAction}