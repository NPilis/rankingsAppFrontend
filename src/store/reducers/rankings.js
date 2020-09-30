import * as actionTypes from '../actions/actionTypes';

const initialState = {
    publicRankings: [],
    privateRankings: [],
    comments: null,
    ranking: null,
    rankingLoading: false,
    commenstLoading: false
}

export default (state=initialState, action) => {
    switch (action.type){
        case actionTypes.LOAD_PRIVATE_RANKINGS_START:
            return {
                ...state,
                rankingLoading: true
            }
        case actionTypes.LOAD_PRIVATE_RANKINGS_SUCCESS:
            return {
                ...state,
                rankingLoading: false,
                privateRankings: action.payload.results
            }
        case actionTypes.LOAD_PRIVATE_RANKINGS_FAIL:
            return {
                ...state,
                rankingLoading: false,
            }
        case actionTypes.LOAD_PUBLIC_RANKINGS_START:
            return {
                ...state,
                publicRankings: null,
                rankingLoading: true
            }
        case actionTypes.LOAD_PUBLIC_RANKINGS_SUCCESS:
            return {
                ...state,
                rankingLoading: false,
                publicRankings: action.payload.results
            }
        case actionTypes.LOAD_PUBLIC_RANKINGS_FAIL:
            return {
                ...state,
                rankingLoading: false,
            }
        case actionTypes.LOAD_RANKING_START:
            return {
                ...state,
                rankingLoading: true
            }
        case actionTypes.LOAD_RANKING_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                rankingLoading: false,
                ranking: action.payload
            }
        case actionTypes.LOAD_COMMENTS_START:
            return {
                ...state,
                commenstLoading: true
            }
        case actionTypes.LOAD_COMMENTS_SUCCESS:
            return {
                ...state,
                commenstLoading: false,
                comments: action.payload
            }
        default:
            return state;
    }
}