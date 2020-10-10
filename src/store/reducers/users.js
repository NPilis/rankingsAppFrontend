import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedUser: null,
    selectedUserLoading: false,
    
    selectedUserRankings: [],
    nextUserRankings: null,
    hasMoreRankings: true,
    userRankingsLoading: false
}

export default (state=initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_USER_START:
            return {
                ...state,
                selectedUser: null,
                selectedUserLoading: true
            }
        case actionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                selectedUserLoading: false,
                selectedUser: action.payload,
            }
        case actionTypes.FETCH_USER_FAIL:
            return {
                ...state,
                selectedUser: null,
                selectedUserLoading: false
            }
        case actionTypes.FETCH_USER_RANKINGS_START:
            return {
                ...state,
                userRankingsLoading: true,
                selectedUserRankings: [],
                hasMoreRankings: true
            }
        case actionTypes.FETCH_USER_RANKINGS_SUCCESS:
        case actionTypes.FETCH_MORE_USER_RANKINGS_SUCCESS:
                return {
                ...state,
                userRankingsLoading: false,
                selectedUserRankings: state.selectedUserRankings.concat(action.payload.results),
                nextUserRankings: action.payload.next ? action.payload.next.slice(21) : null,
                hasMoreRankings: action.payload.next ? true : false
            }
        default:
            return state;
    }
}