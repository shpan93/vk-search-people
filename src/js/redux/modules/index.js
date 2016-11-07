import {combineReducers} from 'redux';
import DataReducer from './data';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    data: DataReducer
});
