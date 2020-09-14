import * as actionTypes from '../actions/actionTypes';

const initialState = {
    showLogin: false,
    showRegister: false
}

export default (state=initialState, action) => {
    switch (action.type){
        case actionTypes.LOGIN_MODAL_TOGGLE:
            const prevLoginState = state.showLogin;
            return {
                showRegister: false,
                showLogin: !prevLoginState
            }
        case actionTypes.REGISTER_MODAL_TOGGLE:
            const prevRegisterState = state.showRegister;
            return {
                showLogin: false,
                showRegister: !prevRegisterState
            }
        default:
            return state;
    }
}