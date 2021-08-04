import { put, takeLatest, call } from "@redux-saga/core/effects";
import axios from "axios";

function* setBookmark(bookmark) {
    try {
        yield call(axios.post, '/api/bookmark', bookmark.payload );
        yield put({ type: 'SET_BOOKMARK'});
    } catch (error) {
        console.log('--ERROR-- axios.post unable to bookmark item:', error);
    }
}

function* bookmarkSaga() {
    yield takeLatest('ADD_TO_BOOKMARK', setBookmark);
}

export default bookmarkSaga;