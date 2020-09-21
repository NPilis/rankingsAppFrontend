import * as actionTypes from './actionTypes';

export const toggleLoginModal = () => ({ type: actionTypes.LOGIN_MODAL_TOGGLE });
export const toggleRegisterModal = () => ({ type: actionTypes.REGISTER_MODAL_TOGGLE });
export const toggleCommentForm = (rankingUUID) => ({ type: actionTypes.TOGGLE_COMMENT_FORM, payload: rankingUUID });
