import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* getProducts() {
  try {
    yield axios.get('/api/product');
    yield put({ type: 'SET_PRODUCTS' });
  } catch (error) {
    console.log('--ERROR-- cannot retrieve products:', error);
  }
}

function* marketplaceSaga() {
  yield takeLatest('FETCH_PRODUCTS', getProducts);
}

export default marketplaceSaga;
