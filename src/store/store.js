import { createStore, combineReducers } from 'redux';
import rankingsReducer from './reducers/rankingReducer';

const rootReducer = combineReducers({
    rankings: rankingsReducer
});

const store = createStore(rootReducer);

export default store;