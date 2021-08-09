import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchSeller(seller) {
    try {
      const thisSeller = yield axios.get(`/api/seller/${seller.payload.sellerId}`);
      console.log('--LOG-- the seller is:', seller.payload);
      yield put({ type: 'SET_SELLER', payload: thisSeller.data});
      console.log('--LOG-- fetchSeller, axios.get, the seller is:', thisSeller.data);
    } catch (error) {
        console.log('--ERROR-- fetchSeller, axios.get, unable to return seller:', error);
    }
  }

function* sellerSaga() {
    yield takeLatest('FETCH_SELLER', fetchSeller);
}

export default sellerSaga;