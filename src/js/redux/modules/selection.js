const ADD_SONG = 'selection/ADD_SONG';
const REMOVE_SONG = 'selection/REMOVE_SONG';
const SET_FILTER = 'selection/SET_FILTER';
const GET_CITIES = 'selection/GET_CITIES';
const GET_UNIVERSITIES = 'selection/GET_UNIVERSITIES';

const initialState = {
  songs: [{ artist: 'vivienne mort' }],
  filters: {
    sex: 1,
    city: 314,
    count:200
  },
  data: {
    universities: [],
    cities: [],
  },
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_UNIVERSITIES:
      return {
        ...state,
        data:{
          ...state.data,
          universities:payload
        }
      };
    case GET_CITIES:
      return {
        ...state,
        data:{
          ...state.data,
          cities:payload
        }
      };
    case SET_FILTER:
      const { key, value } = payload;
      const filters = {
        ...state.filters,
        [key]: value
      }
      if(value === null){
        delete filters[key];
      }
      return {
        ...state,
        filters
      }
    case ADD_SONG:
      return {
        ...state,
        songs: [...state.songs, payload],
      };
    case REMOVE_SONG:
      //const id = state.songs.indexOf(payload);
      const songs = state.songs.filter((song, id) => id !== payload)
      return {
        ...state,
        songs
      };
    default:
      return state;
  }
}
export function getUniversities(payload) {
  return {
    type: GET_UNIVERSITIES,
    payload,
  }
}
export function getCities(payload) {
  return {
    type: GET_CITIES,
    payload,
  }
}
export function setFilter(key, value) {
  return {
    type: SET_FILTER,
    payload: { key, value }
  }
}
export function addSong(payload) {
  return {
    type: ADD_SONG,
    payload,
  }
}
export function removeSong(payload) {
  return {
    type: REMOVE_SONG,
    payload,
  }
}