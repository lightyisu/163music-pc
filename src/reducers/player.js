import { isStyledComponent } from "styled-components"
import { CHANGE_CURRENT_SONG } from "../constants/actionType"
import { Map } from 'immutable';
const defaultState=Map({
    "currentSong":''
})
const player=(state=defaultState,action)=>{
    switch(action.type){
        case CHANGE_CURRENT_SONG:
            return state.set('currentSong',action.payload)
        default:
            return state
    }
}
export default player