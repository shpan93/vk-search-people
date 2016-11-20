import ApiClient from '../../utils/index';

//const client = new ApiClient();
const ADD_USER = 'data/ADD_USER';
const ADD_CITIES = 'data/ADD_CITIES';
const RECEIVE_CITY = 'data/RECEIVE_CITY';

import { connect } from 'react-redux';
const initialState = {
    users:[],
    loaded:true,
    loading:false,
    cities:[]
};
export default function reducer(state = initialState  , action) {
    const {type, payload} = action;
    switch (type) {
        case ADD_USER:
            return {
                ...state,
                users: [...state.users,payload],
            }
        case RECEIVE_CITY:
            return {
                ...state,
                cities: payload
            }
        default:
            return state;
    }
}
export function addUser(payload) {
    return {
        type:ADD_USER,
        payload,
    }
}
export function filterUsers(users, songs) {
    return (dispatch,getState) =>{

    }
}
export function getPeople(filters) {/*
    return (dispatch, getState) => {
        client.getUsers(filters);
    }*/
}
export function getCities() {
    return (dispatch, getState) => {
        (new ApiClient()).getCity().then(city => {
            console.log('city', city);
            dispatch(receiveCity(city))
        });
    }
}
function receiveCity(payload){
    console.log('city', payload)
    return {
        type: RECEIVE_CITY,
        payload
    };
}
export function getUsersSongs(users, songs) {
    return (dispatch, getState) => {
        client.getUsersSongs(users, songs);
    }
}