import { put, takeLatest, call } from "@redux-saga/core/effects";
import axios from "axios";


// maybe this should be a put to update bookmark?
function* setBookmark(bookmark) {
    try {
        yield call(axios.post, '/api/bookmark', bookmark.payload);
    } catch (error) {
        console.log('--ERROR-- axios.post unable to bookmark item:', error);
    }
}

function* getBookmark() {
    try {
        const userBookmark = yield axios.get('/api/bookmark');
        yield put({ type: 'SET_BOOKMARK', payload: userBookmark.data});
        console.log('--LOG-- axios.get, userBookmark.payload is:', userBookmark.data);
    } catch (error) {
        console.log('--ERROR-- getBookmark, axios.get, unable to retreive bookmarks:', error);
    }
}

function* bookmarkSaga() {
    yield takeLatest('ADD_TO_BOOKMARK', setBookmark);
    yield takeLatest('FETCH_BOOKMARK', getBookmark);
}

export default bookmarkSaga;