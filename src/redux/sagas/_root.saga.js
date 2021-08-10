import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import marketplaceSaga from './marketplace.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import bookmarkSaga from './bookmark.saga';
import sellerSaga from './seller.saga';
import activitySaga from './sellingActivity.saga';
import listingDetailSaga from'./listingDetail.saga';
import categorySaga from './category.saga';
import statusSaga from './status.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    marketplaceSaga(),
    bookmarkSaga(),
    sellerSaga(),
    activitySaga(),
    listingDetailSaga(),
    categorySaga(),
    statusSaga(),
  ]);
}
