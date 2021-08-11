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
        const editData = yield axios.put('/api/product/edit', action.payload);
        // yield put({ type: 'FETCH_ITEM_DETAIL'});
        console.log('--PUSHING FROM SAGA--');
        action.payload.history.push(`/activity/detail/${action.payload.id}`);
    } catch (error) {
        console.log('--ERROR-- unable to update item details:', error);
    }
        // action.payload.editingInfo.history.push(`/activity/detail/${action.payload.editingInfo.itemId}`);
}

function* deleteListing(id) {
    try {
        yield axios.delete(`api/product/${id.payload[0]}`);
        console.log('What is the id?', id);
        id.payload[1].push('/activity');
    } catch (error) {
        console.log('--ERROR-- deleteListing axios.delete, unable to delete item:', error);
    }
}

function* listingDetailSaga() {
    yield takeLatest('FETCH_ITEM_DETAIL', getItemDetail);
    yield takeLatest('NEW_ITEM_DETAILS', updateItemDetail);
    yield takeLatest('DELETE_LISTING', deleteListing);
}

export default listingDetailSaga;