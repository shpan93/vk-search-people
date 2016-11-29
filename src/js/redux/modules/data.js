import ApiClient from '../../utils/index';

//const client = new ApiClient();
const ADD_USER = 'data/ADD_USER';
const START_LOADING = 'data/START_LOADING';
const UPDATE_LOADING = 'data/UPDATE_LOADING';
const FINISH_LOADING = 'data/FINISH_LOADING';

const initialState = {
    users:[],
    loaded:true,
    loading:false,
    //progress:
    current:0,
    all:0
};

export default function reducer(state = initialState  , action) {
    const {type, payload} = action;
    switch (type) {
        case ADD_USER:
            return {
                ...state,
                users: [...state.users,payload],
            };

        case START_LOADING:
            return {
                ...state,
                loading:true,
                all:action.all,
            }
        case UPDATE_LOADING:
            return {
              ...state,
                current:action.current,

            }
        case FINISH_LOADING:
            return {

                ...state,
                loaded:true,
                loading:false,
            }
        default:
            return state;
    }
}
export function startLoading(all) {
    return {
        type:START_LOADING,
        all,
    }
}
export function updateLoading(current) {
    return {
        type:UPDATE_LOADING,
        current,
    }
}
export function finishLoading() {
    return {
        type:FINISH_LOADING,
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
export function getPeople(filters) {
    return (dispatch, getState) => {
        client.getUsers(filters);
    }
}
export function getUsersSongs(users, songs) {
    return (dispatch, getState) => {
        client.getUsersSongs(users, songs);
    }
}