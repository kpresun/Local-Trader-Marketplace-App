const listingDetailReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LISTING_ITEM':
            return action.payload;
        case 'SET_EDIT_LISTING':
            return {state, ...action.payload};
        default:
            return state;
    }
}

export default listingDetailReducer;