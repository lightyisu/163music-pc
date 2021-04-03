
import { CHANGE_CURRENT_SONG, CHANGE_PLAYLIST, CHANGE_PLAY_SEQUENCE, CHANGE_SONG_INDEX } from "../constants/actionType"
import { Map } from 'immutable';
const defaultState=Map({
    "currentSong":'',
    "currentSongIndex":'',
    "playlist":[],
    "playSequence":0
})
const player=(state=defaultState,action)=>{
    switch(action.type){
        case CHANGE_CURRENT_SONG:
            return state.set('currentSong',action.payload)
        case CHANGE_SONG_INDEX:
            return state.set('currentSongIndex',action.payload)
        case CHANGE_PLAYLIST:
            return state.set('playlist',action.payload)
        case CHANGE_PLAY_SEQUENCE:
            return state.set('playSequence',action.payload)
        default:
            return state
    }
}
export default player