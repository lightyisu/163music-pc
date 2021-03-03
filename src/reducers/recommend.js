import {Map } from 'immutable';
import {CHANGE_BANNERS,CHANGE_HOT_RECOMMEND, CHANGE_HOT_STREAMER, CHANGE_NEW_ALBUM, CHANGE_SETTLE_SINGER, CHANGE_TOP_RANKING} from '../constants/actionType'
const defaultState=Map({
    name:'ncm'
})
const recommend=(state=defaultState,action)=>{
    switch(action.type){
        case CHANGE_BANNERS:
            return state.set('banners',action.payload)
        case CHANGE_HOT_RECOMMEND:
            return state.set('hotRecommend',action.payload)
        case CHANGE_NEW_ALBUM:
            return state.set('newAlbum',action.payload)
        case CHANGE_TOP_RANKING:
            return state.set('top_ranking',action.payload)
        case CHANGE_SETTLE_SINGER:
            return state.set('settle_singer',action.payload)
        case CHANGE_HOT_STREAMER:
            return state.set('hotStreamer',action.payload)
        default:
            return state
    }
}
export default recommend;