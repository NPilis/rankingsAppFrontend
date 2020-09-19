import * as actionTypes from '../actions/actionTypes';

const initialState = {
    publicRankings: [],
    privateRankings: [],
    comments: [],
    ranking: null,
    loading: false
}

export default (state=initialState, action) => {
    switch (action.type){
        case actionTypes.LOAD_PRIVATE_RANKINGS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.LOAD_PRIVATE_RANKINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                privateRankings: action.payload.results
            }
        case actionTypes.LOAD_PRIVATE_RANKINGS_FAIL:
            return {
                ...state,
                loading: false,
            }
        case actionTypes.LOAD_PUBLIC_RANKINGS_START:
            return {
                ...state,
                publicRankings: null,
                loading: true
            }
        case actionTypes.LOAD_PUBLIC_RANKINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                publicRankings: action.payload.results
            }
        case actionTypes.LOAD_PUBLIC_RANKINGS_FAIL:
            return {
                ...state,
                loading: false,
            }
        case actionTypes.LOAD_RANKING_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.LOAD_RANKING_SUCCESS:
            return {
                ...state,
                loading: false,
                ranking: action.payload
            }
        case actionTypes.LOAD_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }
        default:
            return state;
    }
}