const activityReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MY_ITEMS':
            console.log('--Inside activityReducer-- payload is:', action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default activityReducer;