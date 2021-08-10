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

function* updateItemDetail(action) {
    console.log('--LOG-- Inside updateItemDetail');
    try {
        yield axios.put('/api/product/edit', action.payload);
        yield put({ type: 'SET_LISTING_ITEM', payload: action.data});
    }
        // action.payload.editingInfo.history.push(`/activity/detail/${action.payload.editingInfo.itemId}`);
}

function* listingDetailSaga() {
    yield takeLatest('FETCH_ITEM_DETAIL', getItemDetail);
    yield takeLatest('NEW_ITEM_DETAILS', updateItemDetail);
}

export default listingDetailSaga;