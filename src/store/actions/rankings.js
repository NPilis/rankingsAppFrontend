import * as actionTypes from './actionTypes';
import axios from 'axios';
import { returnErrors, createMessage } from './messages';
import { tokenConfig } from './auth';

export const fetchPublicRankings = () => dispatch => {
    dispatch({ type: actionTypes.LOAD_PUBLIC_RANKINGS_START })

    axios.get('/api/rankings/public/')
    .then(response => {
        dispatch({
            type: actionTypes.LOAD_PUBLIC_RANKINGS_SUCCESS,
            payload: response.data
        });
    }).catch(err => {
        dispatch({ type: actionTypes.LOAD_PUBLIC_RANKINGS_FAIL })
        dispatch(returnErrors(err.response.data, err.status))
    });
}

export const fetchPrivateRankings = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.LOAD_PRIVATE_RANKINGS_START })

    axios.get('/api/rankings/private/', tokenConfig(getState))
    .then(response => {
        dispatch({
            type: actionTypes.LOAD_PRIVATE_RANKINGS_SUCCESS,
            payload: response.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.status))
        dispatch({ type: actionTypes.LOAD_PRIVATE_RANKINGS_FAIL })
    });
}

export const fetchRanking = (uuid) => (dispatch, getState) => {
    dispatch({ type: actionTypes.LOAD_RANKING_START })

    axios.get('/api/rankings/'+uuid)
    .then(res => {
        dispatch({
            type: actionTypes.LOAD_RANKING_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.status))
        dispatch({ type: actionTypes.LOAD_RANKING_FAIL })
    })
}