import * as actionTypes from '../actions/actionTypes';

const initialState = {
    publicRankings: [],
    nextPublic: null,
    privateRankings: [],
    comments: [],
    ranking: null,
    rankingLoading: false,
    commentsLoading: false,
    hasMore: true,
    hasMoreComments: true,
    nextComments: null
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
                publicRankings: [],
                rankingLoading: true,
                hasMore: true
            }
        case actionTypes.LOAD_PUBLIC_RANKINGS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                rankingLoading: false,
                publicRankings: action.payload.results,
                nextPublic: action.payload.next.slice(21)
            }
        case actionTypes.LOAD_MORE_PUBLIC_RANKINGS_SUCCESS:
            return {
                ...state,
                rankingLoading: false,
                publicRankings: state.publicRankings.concat(action.payload.results),
                nextPublic: action.payload.next ? action.payload.next.slice(21) : null,
                hasMore: action.payload.next ? true : false
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
                comments: [],
                commentsLoading: true,
                hasMoreComments: true
            }
        case actionTypes.LOAD_COMMENTS_SUCCESS:
            return {
                ...state,
                commentsLoading: false,
                comments: action.payload.results,
                nextComments: action.payload.next ? action.payload.next.slice(21) : null,
                hasMoreComments: action.payload.next ? true : false
            }
        case actionTypes.LOAD_MORE_COMMENTS_SUCCESS:
            console.log(action.payload.results)
            return {
                ...state,
                commentsLoading: false,
                comments: state.comments.concat(action.payload.results),
                nextComments: action.payload.next ? action.payload.next.slice(21) : null,
                hasMoreComments: action.payload.next ? true : false
            }
        case actionTypes.COMMENT_RANKING_SUCCESS:
            const newDate = new Date().toISOString();
            const newComm = {
                active: true,
                created_at: newDate,
                text: action.payload.comment,
                user: action.payload.user
            }
            const newComments = [newComm, ...state.comments]
            return {
                ...state,
                comments: newComments
            }
        default:
            return state;
    }
}