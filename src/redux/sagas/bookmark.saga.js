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

function* getBookmark(userId) {
    try {
        console.log('what is the userID?', userId);
        const userBookmark = yield axios.get(`/api/bookmark/user/${userId.payload}`);
        yield put({ type: 'SET_BOOKMARK', payload: userBookmark.data});
        console.log('--LOG-- axios.get, userBookmark.payload is:', userBookmark.data);
    } catch (error) {
        console.log('--ERROR-- getBookmark, axios.get, unable to return bookmarks:', error);
    }
}

function* getOneBookmark(id) {
    try {
        const singleBookmark = yield axios.get(`api/bookmark/detail/${id.payload.productId}`);
        console.log('---------What is the action from axios.get?------------', id.payload);
        yield put({ type: 'SET_SINGLE_BOOKMARK', payload: singleBookmark.data});
        console.log('--LOG-- axios.get, id.payload is:', singleBookmark.data);
    } catch (error) {
        console.log('--ERROR-- getOneBookmark, axios.get, unable to return single bookmark:', error);
    }
}

function* deleteBookmark(id) {
    console.log('--LOG-- item to delete is:', id.payload);
    try { const idToDelete = yield axios.delete(`/api/bookmark/${id.payload}`);
        yield put({ type: 'REFRESHED_BOOKMARK'});
    } catch (error) {
        console.log('--ERROR-- Unable to delete ID:', error);
    }
}

function* bookmarkSaga() {
    yield takeLatest('ADD_TO_BOOKMARK', setBookmark);
    yield takeLatest('FETCH_BOOKMARK', getBookmark);
    yield takeLatest('FETCH_SINGLE_BOOKMARK', getOneBookmark);
    yield takeLatest('DELETE_BOOKMARK', deleteBookmark);
}

export default bookmarkSaga;