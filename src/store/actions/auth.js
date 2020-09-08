import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (username, passowrd) => {
    return dispatch => { 
        dispatch(authStart());
        const authData = {
            username: username,
            passowrd: passowrd
        };
        axios.post('/api/rest-auth/login/', authData)
    };
};