const NEW_CONST = 'data/NEW_CONST';

export default function reducer(state = {}  , action) {
    const {type, payload} = action;
    switch (type) {
        case NEW_CONST:
            return {
                ...state,
            }
        default:
            return state;
    }
}