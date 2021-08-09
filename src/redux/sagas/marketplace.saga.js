import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
// import { response } from 'express'; NOT NEEDED, TYPE ERROR

// starts on useEffect
function* getProducts() {
  try {
    const products = yield axios.get('/api/product');
    console.log('Inside Get Products, the response data is:', products.data);
    yield put({ type: 'SET_PRODUCTS', payload: products.data});
  } catch (error) {
    console.log('--ERROR-- cannot return products:', error);
  }
}

function* marketplaceSaga() {
  yield takeLatest('FETCH_PRODUCTS', getProducts);
}

export default marketplaceSaga;
