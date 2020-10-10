import * as actionTypes from './actionTypes';
import axios from 'axios';
import { returnErrors, createMessage } from './messages';
import { tokenConfig } from './auth';

export const fetchSelectedUser = (username) => (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_USER_START })

    axios.get('/api/users/' + username, tokenConfig(getState))
        .then(response => {
            console.log(response)
            dispatch({
                type: actionTypes.FETCH_USER_SUCCESS,
                payload: response.data
            });
        }).catch(err => {
            console.log(err)
            dispatch({ type: actionTypes.LOAD_PRIVATE_RANKINGS_FAIL })
        });
}

export const fetchUserRankings = (userUUID) => (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_USER_RANKINGS_START })

    axios.get('/api/users/' + userUUID + '/rankings', tokenConfig(getState))
    .then(response => {
        console.log(response)
        dispatch({
            type: actionTypes.FETCH_USER_RANKINGS_SUCCESS,
            payload: response.data
        });
    }).catch(err => {
        console.log(err)
        dispatch({ type: actionTypes.FETCH_USER_RANKINGS_FAIL })
    });
}

export const clearSelectedUser = () => dispatch => {
    dispatch({ type: actionTypes.FETCH_USER_FAIL })
}

export const fetchMoreUserRankings = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_MORE_USER_RANKINGS_START })

    setTimeout(() => {
        axios.get(getState().users.nextUserRankings, null, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.FETCH_MORE_USER_RANKINGS_SUCCESS,
                    payload: res.data
                })
            })
    }, 300)
}