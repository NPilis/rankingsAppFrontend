import * as actionTypes from './actionTypes';
import axios from 'axios';
import { returnErrors, createMessage } from './messages';
import { tokenConfig } from './auth';

export const fetchPublicRankings = () => dispatch => {
    dispatch({ type: actionTypes.LOAD_PUBLIC_RANKINGS_START })

    setTimeout(() => {
        axios.get('/api/rankings/public/')
            .then(response => {
                console.log(response.data)
                dispatch({
                    type: actionTypes.LOAD_PUBLIC_RANKINGS_SUCCESS,
                    payload: response.data
                });
            }).catch(err => {
                dispatch({ type: actionTypes.LOAD_PUBLIC_RANKINGS_FAIL })
                dispatch(returnErrors(err.response.data, err.status))
            })
    }, 100);
}

export const fetchMorePublicRankings = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.LOAD_MORE_PUBLIC_RANKINGS_START })

    setTimeout(() => {
        axios.get(getState().rankings.nextPublic)
            .then(response => {
                console.log(response.data)
                dispatch({
                    type: actionTypes.LOAD_MORE_PUBLIC_RANKINGS_SUCCESS,
                    payload: response.data
                });
            }).catch(err => {
                dispatch({ type: actionTypes.LOAD_PUBLIC_RANKINGS_FAIL })
                dispatch(returnErrors(err.response.data, err.status))
            })
    }, 300);
}

export const fetchPrivateRankings = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.LOAD_PRIVATE_RANKINGS_START })

    axios.get('/api/rankings/private/', tokenConfig(getState))
        .then(response => {
            console.log(response)
            dispatch({
                type: actionTypes.LOAD_PRIVATE_RANKINGS_SUCCESS,
                payload: response.data
            });
        }).catch(err => {
            console.log(err)
            dispatch({ type: actionTypes.LOAD_PRIVATE_RANKINGS_FAIL })
        });
}

export const fetchMorePrivateRankings = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.LOAD_MORE_PRIVATE_RANKINGS_START })

    const nextRankings = getState().rankings.nextPrivate
    if (nextRankings) {
        setTimeout(() => {
            axios.get(getState().rankings.nextPrivate, tokenConfig(getState))
                .then(response => {
                    console.log(response.data)
                    dispatch({
                        type: actionTypes.LOAD_MORE_PRIVATE_RANKINGS_SUCCESS,
                        payload: response.data
                    });
                }).catch(err => {
                    dispatch({ type: actionTypes.LOAD_MORE_PRIVATE_RANKINGS_FAIL })
                    dispatch(returnErrors(err.response.data, err.status))
                })
        }, 300);
    }

}

export const fetchFollowingRankings = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.LOAD_FOLLOWING_RANKINGS_START })

    axios.get('/api/rankings/followed/', tokenConfig(getState))
        .then(response => {
            console.log(response)
            dispatch({
                type: actionTypes.LOAD_FOLLOWING_RANKINGS_SUCCESS,
                payload: response.data
            });
        }).catch(err => {
            console.log(err)
            dispatch({ type: actionTypes.LOAD_FOLLOWING_RANKINGS_FAIL })
        });
}

export const fetchMoreFollowingRankings = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.LOAD_MORE_FOLLOWING_RANKINGS_START })

    const nextRankings = getState().rankings.nextFollowed
    if (nextRankings) {
        setTimeout(() => {
            axios.get(getState().rankings.nextFollowed, tokenConfig(getState))
                .then(response => {
                    console.log(response.data)
                    dispatch({
                        type: actionTypes.LOAD_MORE_FOLLOWING_RANKINGS_SUCCESS,
                        payload: response.data
                    });
                }).catch(err => {
                    dispatch({ type: actionTypes.LOAD_FOLLOWING_RANKINGS_FAIL })
                    dispatch(returnErrors(err.response.data, err.status))
                })
        }, 300);
    }

}

export const fetchRanking = (uuid) => (dispatch, getState) => {
    dispatch({ type: actionTypes.LOAD_RANKING_START })

    axios.get('/api/rankings/' + uuid, null, tokenConfig(getState))
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
    axios.post('/api/rankings/' + uuid + '/like/', null, tokenConfig(getState))
        .then(res => {
            dispatch({ type: actionTypes.RANKING_LIKE })
            console.log(res)
        })
}

export const dislikeRanking = (uuid) => (dispatch, getState) => {
    axios.post('/api/rankings/' + uuid + '/dislike/', null, tokenConfig(getState))
        .then(res => {
            dispatch({ type: actionTypes.RANKING_DISLIKE })
            console.log(res)
        })
}

export const shareRanking = (uuid) => (dispatch, getState) => {
    console.log('[Ranking actions] Sharing...')
}

export const commentRanking = (uuid, comment, user) => (dispatch, getState) => {
    const body = JSON.stringify({ text: comment });
    console.log(body)
    axios.post('/api/rankings/' + uuid + '/comments/', body, tokenConfig(getState))
        .then(res => {
            let newComm = {
                comment: comment,
                user: user
            }
            console.log(newComm)
            dispatch({ type: actionTypes.COMMENT_RANKING_SUCCESS, payload: newComm })
            dispatch({ type: actionTypes.SUBMIT_COMMENT_FORM })
            dispatch(createMessage({ commentAddedSuccess: "Comment added!" }))
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            console.log(err.response.data, err.response.status)
        })
}

export const fetchRankingComments = (uuid) => (dispatch, getState) => {
    dispatch({ type: actionTypes.LOAD_COMMENTS_START })
    axios.get('/api/rankings/' + uuid + '/comments/', null, tokenConfig(getState))
        .then(res => {
            console.log(res)
            dispatch({
                type: actionTypes.LOAD_COMMENTS_SUCCESS,
                payload: res.data
            })
        })
}

export const fetchMoreComments = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.LOAD_MORE_COMMENTS_START })

    setTimeout(() => {
        axios.get(getState().rankings.nextComments, null, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.LOAD_MORE_COMMENTS_SUCCESS,
                    payload: res.data
                })
            })
    }, 300)
}

export const createRanking = (newRanking, newPositions) => (dispatch, getState) => {
    dispatch({ type: actionTypes.CREATE_RANKING_START })
    console.log(newRanking)
    axios.post('/api/rankings/create/', newRanking, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: actionTypes.CREATE_RANKING_SUCCESS,
                payload: res.data
            })
            if (newPositions.length > 0) {
                for (const pos of newPositions.values()) {
                    dispatch(addPosition(pos, res.data.uuid))
                }
            }
        }).catch(err => {
            dispatch({ type: actionTypes.CREATE_RANKING_FAIL })
            dispatch(returnErrors(err.response.data, err.response.status));
            console.log(err.response.data, err.response.status)
        })
}

export const addPosition = (newPosition, rankingUUID) => (dispatch, getState) => {
    dispatch({ type: actionTypes.ADD_POSITION_START })
    console.log(newPosition)
    let newPos = new FormData()
    for (const [k, v] of Object.entries(newPosition)) {
        newPos.append(k, v);
    }

    axios.post('/api/rankings/' + rankingUUID + '/create-rp/', newPos, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: actionTypes.ADD_POSITION_SUCCESS,
                payload: res.data
            })

        }).catch(err => {
            dispatch({ type: actionTypes.ADD_POSITION_FAIL })
            dispatch(returnErrors(err.response.data, err.response.status));
            console.log(err.response.data, err.response.status)
        })
}

export const editPosition = (newPosition, rankingUUID) => (dispatch, getState) => {
    dispatch({ type: actionTypes.ADD_POSITION_START })
    console.log(newPosition)
    let newPos = new FormData()
    for (const [k, v] of Object.entries(newPosition)) {
        newPos.append(k, v);
    }

    axios.post('/api/rankings/' + rankingUUID + '/create-rp/', newPos, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: actionTypes.ADD_POSITION_SUCCESS,
                payload: res.data
            })

        }).catch(err => {
            dispatch({ type: actionTypes.ADD_POSITION_FAIL })
            dispatch(returnErrors(err.response.data, err.response.status));
            console.log(err.response.data, err.response.status)
        })
}

export const editRanking = (newRanking, rankingUUID, newPositions) => (dispatch, getState) => {
    dispatch({ type: actionTypes.EDIT_RANKING_START })
    console.log(newRanking)
    axios.post('/api/rankings/' + rankingUUID + '/edit/', newRanking, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: actionTypes.EDIT_RANKING_SUCCESS,
                payload: res.data
            })
            if (newPositions.length > 0) {
                for (const pos of newPositions.values()) {
                    dispatch(addPosition(pos, res.data.uuid))
                }
            }
        }).catch(err => {
            dispatch({ type: actionTypes.EDIT_RANKING_FAIL })
            dispatch(returnErrors(err.response.data, err.response.status));
            console.log(err.response.data, err.response.status)
        })
}