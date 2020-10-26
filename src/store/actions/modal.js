import * as actionTypes from './actionTypes';

export const toggleLoginModal = () => ({ type: actionTypes.LOGIN_MODAL_TOGGLE });
export const toggleRegisterModal = () => ({ type: actionTypes.REGISTER_MODAL_TOGGLE });
export const toggleCommentForm = (rankingData) => ({ type: actionTypes.TOGGLE_COMMENT_FORM, payload: rankingData });
export const toggleShareModal = (rankingData) => ({type: actionTypes.SHARE_MODAL_TOGGLE, payload: rankingData});
export const closeModal = () => ({type: actionTypes.CLOSE_MODAL})