import * as actionTypes from './actionTypes';
import axios from 'axios';
import { returnErrors, createMessage } from './messages';
import { tokenConfig } from './auth';
import { loadUser } from './auth';

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

export const followUser = (username) => (dispatch, getState) => {
    // dispatch({ type: actionTypes.FOLLOW_USER_START })

    axios.post('/api/users/' + username + '/', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: actionTypes.FOLLOW_USER_SUCCESS
            })
        })
}

export const editProfile = (updatedProfile) => (dispatch, getState) => {
    dispatch({type: actionTypes.EDIT_PROFILE_START})
    
    axios.put('/api/users/currentuser/edit', updatedProfile, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: actionTypes.EDIT_PROFILE_SUCCESS
            })
            dispatch(loadUser())
        })
}

export const searchUsers = (query) => (dispatch, getState) => {
    dispatch({type: actionTypes.SEARCH_USERS_START})

    axios.get('/api/users/search/' + query)
        .then(res => {
            dispatch({
                type: actionTypes.SEARCH_USERS_SUCCESS,
                payload: res.data
            })
        })
}