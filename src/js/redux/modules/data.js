import ApiClient from '../../utils/index';

//const client = new ApiClient();
const ADD_USER = 'data/ADD_USER';

const initialState = {
    users:[],
    loaded:true,
    loading:false
};

export default function reducer(state = initialState  , action) {
    const {type, payload} = action;
    switch (type) {
        case ADD_USER:
            return {
                ...state,
                users: [...state.users,payload],
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