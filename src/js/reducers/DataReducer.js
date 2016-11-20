import * as types from '../constants/ActionTypes';
import {INITIAL_STATE} from '../constants/InitialState';

export default function dataReducer(state = INITIAL_STATE, action) {
    const {type, payload} = action;
    switch (type) {

        case types.UPDATE_DISPLAYED:
            return {
                ...state,
                displayed: action.day
            };
        case types.TOGGLE_ADD_TASK:
            return {
                ...state,
                isNewTaskWidgetOpened: payload
            };
        case types.TOGGLE_ADD_TASK:


            return {
                ...state,
                isNewTaskWidgetOpened: payload
            };
        case types.RECEIVE_CITY:
            console.log(payload)

            return {
                ...state,
                city: payload
            };
        case types.SET_SELECTED:


            return {
                ...state,
                selectedDay: action.day
            };
        case types.REMOVE_EVENT:

            let filtered = state.events.filter(event => event.cuid !== action.cuid);

            return {
                ...state,
                events: filtered
            };

        case types.ADD_EVENT:

            let events = [...state.events];
            events.push(action.event);

            return {
                ...state,
                events: events,
                isNewTaskWidgetOpened: false
            };


        default:
            return state;
    }
}
