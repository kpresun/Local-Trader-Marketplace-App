const sellerReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SELLER':
            console.log('--Inside sellerReducer-- payload is:', action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default sellerReducer;