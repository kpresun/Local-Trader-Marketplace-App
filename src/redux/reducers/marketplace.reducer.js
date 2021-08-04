const productReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PRODUCTS':
      console.log('product reducer, payload is:', action.payload);
        return action.payload;
      default:
        return state;
    }
  };

  export default productReducer;
  