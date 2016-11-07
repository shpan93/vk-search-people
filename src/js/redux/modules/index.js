import {combineReducers} from 'redux';
import DataReducer from './data';
import SelectionReducer from './selection';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    data: DataReducer,
    selection: SelectionReducer
});
