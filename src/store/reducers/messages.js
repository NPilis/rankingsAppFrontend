import * as actionTypes from '../actions/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_MESSAGE:
            return (state = action.payload);
        default:
            return state;
    }
}