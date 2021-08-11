import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* postNewItem(item) {
    try {
        yield call(axios.post, '/api/product', item.payload);
    } catch (error) {
        console.log('--ERROR-- item is not posting to database:', error);
    }
}

function* addNewListingSaga() {
    yield takeLatest('NEW_ITEM_ADDED', postNewItem);
}

export default addNewListingSaga;