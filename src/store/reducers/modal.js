import * as actionTypes from '../actions/actionTypes';

const initialState = {
    showLogin: false,
    showRegister: false,
    showCommentForm: false,
    showShareModal: false,
    rankingData: null
}

export default (state=initialState, action) => {
    switch (action.type){
        case actionTypes.LOGIN_MODAL_TOGGLE:
            const prevLoginState = state.showLogin;
            return {
                showRegister: false,
                showCommentForm: false,
                showShareModal: false,
                showLogin: !prevLoginState
            }
        case actionTypes.REGISTER_MODAL_TOGGLE:
            const prevRegisterState = state.showRegister;
            return {
                showLogin: false,
                showCommentForm: false,
                showShareModal: false,
                showRegister: !prevRegisterState
            }
        case actionTypes.TOGGLE_COMMENT_FORM:
            const prevFormState = state.showCommentForm;
            const prevData = state.rankingData;
            return {
                showLogin: false,
                showRegister: false,
                showShareModal: false,
                rankingData: prevData ? null : action.payload,
                showCommentForm: !prevFormState
            }
        case actionTypes.SUBMIT_COMMENT_FORM:
            return {
                showLogin: false,
                showRegister: false,
                showShareModal: false,
                rankingData: null,
                showCommentForm: false
            }
        case actionTypes.SHARE_MODAL_TOGGLE:
            const prevModalState = state.showShareModal;
            const prevRanking = state.rankingData;
            return {
                showShareModal: !prevModalState,
                showLogin: false,
                showRegister: false,
                rankingData: prevRanking ? null : action.payload,
                showCommentForm: false,
            }
        default:
            return state;
    }
}