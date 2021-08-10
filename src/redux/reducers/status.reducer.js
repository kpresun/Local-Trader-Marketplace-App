const statusReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_STATUS_TYPES':
            return action.payload;
        default:
            return state;
    }
}

export default statusReducer;