import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMySellingItems() {
    try {
        const sellingItems = yield axios.get(`/api/activity`);
        yield put({ type: 'SET_MY_ITEMS', payload: sellingItems.data});
        console.log('--LOG-- axios.get, getMySellingItems my selling items are:', sellingItems.data);
    } catch (error) {
        console.log('--ERROR-- axios.get getMySellingItems, unable to return my selling items:', error);
    }
}

function* activitySaga() {
    takeLatest ('FETCH_MY_ITEMS', getMySellingItems);
}

export default activitySaga;