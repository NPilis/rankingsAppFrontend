import * as actionTypes from './actionTypes';

export const createMessage = msg => {
    return {
        type: actionTypes.CREATE_MESSAGE,
        payload: msg
    };
};

export const returnErrors = (msg, status) => {
    return {
        type: actionTypes.GET_ERRORS,
        payload: {
            msg: msg,
            status: status
        }
    };
};