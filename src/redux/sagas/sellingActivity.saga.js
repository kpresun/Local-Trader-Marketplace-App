import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMySellingItems(myId) {
    try {
        const sellingItems = yield axios.get(`/api/myactivity/${myId.payload}`);
        console.log('--LOG-- axios.get getMySellingItems, my ID is:', myId.payload);
        yield put({ type: 'SET_MY_ITEMS', payload: sellingItems.data});
    } catch (error) {
        console.log('--ERROR-- axios.get getMySellingItems, unable to return my selling items:', error);
    }
}

function* mySellingActivity() {
    takeLatest ('FETCH_MY_ITEMS', getMySellingItems);
}

export default mySellingActivity;