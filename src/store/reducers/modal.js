import * as actionTypes from '../actions/actionTypes';

const initialState = {
    showLogin: false,
    showRegister: false,
    showCommentForm: false,
    rankingData: null
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
            const prevData = state.rankingData;
            console.log(prevData)
            return {
                showLogin: false,
                showRegister: false,
                rankingData: prevData ? null : action.payload,
                showCommentForm: !prevFormState
            }
        case actionTypes.SUBMIT_COMMENT_FORM:
            return {
                showLogin: false,
                showRegister: false,
                rankingData: null,
                showCommentForm: false
            }
        default:
            return state;
    }
}