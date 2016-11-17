const TOGGLE = 'dialog/TOGGLE';
//const SUBMIT_DIALOG = 'dialog/SUBMIT_DIALOG';

const initialState = {
    visible:false,
    captcha_img:'',
    error_msg:'',
    resolve:()=>{}
};

export default function reducer(state = initialState  , action) {
    const {type, payload} = action;
    switch (type) {
        case TOGGLE:
            const {captcha_img,error_msg, resolve} = action;
            return {
                ...state,
                visible:action.visible,
                captcha_img,error_msg, resolve
            };
        default:
            return state;
    }
}
export function showDialog(captcha_img,error_msg, resolve){
    return {
        type:TOGGLE,
        visible:true,
        captcha_img,
        error_msg,
        resolve
    }
}
export function hideDialog(){
    return {
        type:TOGGLE,
        visible:false,
    }
}
export function submitCaptcha(payload){
    return (dispatch, getState)=>{
        const resolve = getState().dialog.resolve;
        resolve(payload);
        dispatch(hideDialog());
    }
}