import { applyMiddleware, createStore,compose } from 'redux';
import reducer from './reducers/index';
import reduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducer,composeEnhancers(applyMiddleware(reduxThunk)))
export default store;