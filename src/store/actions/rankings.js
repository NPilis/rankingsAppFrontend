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

export const likeRanking = (uuid) => (dispatch, getState) => {
    axios.post('/api/rankings/'+uuid+'/like/', null, tokenConfig(getState))
    .then(res => {
        dispatch({type: actionTypes.RANKING_LIKE })
        console.log(res)
    })
}

export const dislikeRanking = (uuid) => (dispatch, getState) => {
    axios.post('/api/rankings/'+uuid+'/dislike/', null, tokenConfig(getState))
    .then(res => {
        dispatch({type: actionTypes.RANKING_DISLIKE })
        console.log(res)
    })
}

export const shareRanking = (uuid) => (dispatch, getState) => {
    console.log('[Ranking actions] Sharing...')
}

export const commentRanking = (uuid) => (dispatch, getState) => {
    axios.post('/api/rankings/'+uuid+'/like/', null, tokenConfig(getState))
    .then(res => {
        dispatch({type: actionTypes.RANKING_LIKE })
        console.log(res)
    })
}

export const fetchRankingComments = (uuid) => (dispatch, getState) => {
    axios.get('/api/rankings/'+uuid+'/comments/', null, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: actionTypes.LOAD_COMMENTS,
            payload: res.data.results
        })
    })
}