import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedUser: null,
    selectedUserLoading: false,

    foundUsers: [],
    nextUsers: false,
    hasMore: false,
    userLoading: false,
    
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
        case actionTypes.SEARCH_USERS_START:
            return {
                ...state,
                userLoading: true,
                foundUsers: []
            }
        case actionTypes.SEARCH_USERS_SUCCESS:
        case actionTypes.LOAD_MORE_SEARCHED_USERS_SUCCESS:
            return {
                ...state,
                userLoading: false,
                foundUsers: state.foundUsers.concat(action.payload.results),
                nextUsers: action.payload.next ? action.payload.next.slice(21) : null,
                hasMore: action.payload.next ? true : false
            }
        case actionTypes.SEARCH_RANKINGS_FAIL:
            return {
                ...state,
                usersLoading: false
            }
        default:
            return state;
    }
}