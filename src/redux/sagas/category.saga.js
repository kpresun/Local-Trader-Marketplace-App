import { put, takeLatest, call } from "@redux-saga/core/effects";
import axios from "axios";

function* getCategoryTypes() {
    try {
        const categoryTypes = yield axios.get('/api/category');
        console.log('--LOG-- getCategoryTypes, axios.get, the categories are:', categoryTypes.data);
        yield put({ type: 'SET_CATEGORY_TYPES', payload: categoryTypes.data});
    } catch (error) {
        console.log('--ERROR-- categoryTypes, axios.get, unable to return categories:', error);
    }
}

function* categorySaga() {
    yield takeLatest('FETCH_CATEGORY_TYPE', getCategoryTypes);
}

export default categorySaga;