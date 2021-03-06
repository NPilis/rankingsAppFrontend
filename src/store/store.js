import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './reducers/auth';
import messagesReducer from './reducers/messages';
import errorsReducer from './reducers/errors';
import modalReducer from './reducers/modal';
import rankingsReducer from './reducers/rankings';
import usersReducer from './reducers/users';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    auth: authReducer,
    messages: messagesReducer,
    errors: errorsReducer,
    modal: modalReducer,
    rankings: rankingsReducer,
    users: usersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;