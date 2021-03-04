import { combineReducers } from 'redux-immutable';
import recommend from './recommend';
import player from './player';
const reducer=combineReducers({
    recommend,
    player
})
export default reducer;