import * as actionTypes from './actionTypes';
import axios from 'axios';
import { returnErrors, createMessage } from './messages';
import * as rankingActions from './rankings';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.USER_LOADING });

    axios.get('api/users/currentuser/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: actionTypes.USER_LOADED,
                payload: res.data
            });
            // Just for production
            dispatch(createMessage({ loadedUserSuccess: "User loaded!" }))
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.status))
        });
};

export const login = (username, password) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ username, password });
    console.log(body)

    axios
        .post('/api/auth/login/', body, config)
        .then((res) => {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: res.data,
            });
            dispatch(createMessage({ loginSuccess: "You are logged in!" }))
            dispatch({type: actionTypes.LOGIN_MODAL_TOGGLE})
        }).catch((err) => {
            console.log(err.response.data, err.response.status)
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: actionTypes.LOGIN_FAIL });
        });
};

export const logout = () => (dispatch, getState) => {
    axios
        .post('/api/auth/logout/', null, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: actionTypes.LOGOUT_SUCCESS,
            });
            dispatch(createMessage({logoutSucces: "You've logged out successfuly"}));
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
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

export const register = (formData) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(formData)
    axios.post('/api/auth/register/', formData, config)
        .then((res) => {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                payload: res.data,
            });
            dispatch({type: actionTypes.REGISTER_MODAL_TOGGLE})
            dispatch(createMessage({ registerSuccess: "Registration successful!" }))
        }).catch((err) => {
            console.log(err.response)
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: actionTypes.REGISTER_FAIL });
        });
}