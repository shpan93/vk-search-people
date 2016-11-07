const ADD_SONG = 'selection/ADD_SONG';
const REMOVE_SONG = 'selection/REMOVE_SONG';

const initialState = {
    songs:[],
};

export default function reducer(state = initialState  , action) {
    const {type, payload} = action;
    switch (type) {
        case ADD_SONG:
            return {
                ...state,
                songs:[...state.songs, payload],
            };
        case REMOVE_SONG:
            const id = state.songs.indexOf(payload);
            const songs = [...state.songs].splice(id,1);
            return {
                ...state,
                songs
            };
        default:
            return state;
    }
}
export function addSong(payload){
    return {
        type:ADD_SONG,
        payload,
    }
}
export function removeSong(payload){
    return {
        type:REMOVE_SONG,
        payload,
    }
}