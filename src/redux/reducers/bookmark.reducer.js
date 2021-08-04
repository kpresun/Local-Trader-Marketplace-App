const bookmarkReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BOOKMARK':
            console.log('--Inside bookmarkReducer-- payload is:', action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default bookmarkReducer;