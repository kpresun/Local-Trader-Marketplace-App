import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getMySellingItems() {
    try {
        const sellingItems = yield axios.get(`/api/activity`);
        yield put({ type: 'SET_MY_ITEMS', payload: sellingItems.data});
    } catch (error) {
        console.log('--ERROR-- axios.get getMySellingItems, unable to return my selling items:', error);
    }
}

function* activitySaga() {
    yield takeLatest ('FETCH_MY_ITEMS', getMySellingItems);
}

export default activitySaga;