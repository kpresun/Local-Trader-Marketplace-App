import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getItemDetail(id) {
    try {
        const listingItemDetail = yield axios.get(`api/product/${id.payload.itemId}`);
        console.log('--LOG-- listingItemDetail, axios.get the listing id is:', listingItemDetail.data);
        yield put({ type: 'SET_LISTING_ITEM', payload: listingItemDetail.data });
    } catch (error) {
        console.log('--ERROR-- listingItemDetail axios.get, unable to return listing detail:', error);
    }
}

function* listingDetailSaga() {
    yield takeLatest('FETCH_ITEM_DETAIL', getItemDetail);
}

export default listingDetailSaga;