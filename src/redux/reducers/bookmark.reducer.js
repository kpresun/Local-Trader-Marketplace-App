import { combineReducers } from "redux";

const bookmarkReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BOOKMARK':
            console.log('--Inside bookmarkReducer-- payload is:', action.payload);
            return action.payload;
        default:
            return state;
    }
};

const singleBookmarkReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SINGLE_BOOKMARK':
            console.log('--Inside singleBookmarkReducer-- payload is:', action.payload);
            return action.payload;
    
        default:
            return state;
    }
};

const allBookmarkReducers = combineReducers({
    bookmarkReducer,
    singleBookmarkReducer
})

export default allBookmarkReducers;