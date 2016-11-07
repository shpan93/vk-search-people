import ApiClient from '../../utils/index';

const client = new ApiClient();
const ADD_PEOPLE = 'data/ADD_PEOPLE';

const initialState = {
    users:[],
    loaded:true,
    loading:false
};

export default function reducer(state = initialState  , action) {
    const {type, payload} = action;
    switch (type) {
        case ADD_PEOPLE:
            return {
                ...state,
                users: payload,
            }
        default:
            return state;
    }
}
export function addPeople(payload) {
    return {
        type:ADD_PEOPLE,
        payload,
    }
}
export function filterUsers(users, songs) {
    return (dispatch,getState) =>{

    }
}
export function getPeople(filters) {
    return (dispatch, getState) => {
        client.getUsers(filters).then((users)=>{
            dispatch(addPeople(users))
        });
    }
}