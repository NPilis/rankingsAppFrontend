import * as actionTypes from '../actions/actionTypes';

const initialState = {
    showLogin: false,
    showRegister: false,
    showCommentForm: false,
    rankingUUID: null
}

export default (state=initialState, action) => {
    switch (action.type){
        case actionTypes.LOGIN_MODAL_TOGGLE:
            const prevLoginState = state.showLogin;
            return {
                showRegister: false,
                showCommentForm: false,
                showLogin: !prevLoginState
            }
        case actionTypes.REGISTER_MODAL_TOGGLE:
            const prevRegisterState = state.showRegister;
            return {
                showLogin: false,
                showCommentForm: false,
                showRegister: !prevRegisterState
            }
        case actionTypes.TOGGLE_COMMENT_FORM:
            const prevFormState = state.showCommentForm;
            const prevUUID = state.rankingUUID;
            console.log(prevUUID)
            return {
                showLogin: false,
                showRegister: false,
                rankingUUID: prevUUID ? null : action.payload,
                showCommentForm: !prevFormState
            }
        default:
            return state;
    }
}