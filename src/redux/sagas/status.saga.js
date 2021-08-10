import { put, takeLatest, call } from "@redux-saga/core/effects";
import axios from "axios";

function* getStatusTypes() {
    try {
        const statusTypes = yield axios.get('/api/status');
        console.log('--LOG-- categoryTypes, axios.get, the statuses are:', statusTypes.data);
        yield put({ type: 'SET_STATUS_TYPES', payload: statusTypes.data});
    } catch (error) {
        console.log('--ERROR-- getStatusTypes, axios.get, unable to return statuses:', error);
    }
}

function* statusSaga() {
    yield takeLatest('FETCH_STATUS_TYPE', getStatusTypes);
}

export default statusSaga;