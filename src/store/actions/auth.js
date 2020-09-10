import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: actionTypes.USER_LOADING});

    axios.get('api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: actionTypes.USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            console.log(err);
        });
};

export const login = (username, password) => (dispatch) => {
    const config = {
        headers: {
        'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ username, password });

    axios.post('/api/auth/login', body, config)
        .then((res) => {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: res.data,
            });
        }).catch((err) => {
            console.log(err)
            dispatch({ type: actionTypes.LOGIN_FAIL });
        });
};

export const tokenConfig = (getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {
        'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};