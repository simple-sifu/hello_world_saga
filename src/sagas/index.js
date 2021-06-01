import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchNews() {
  console.log("***** fetchNews: GET_NEWS ****");
  const json = yield fetch('https://newsapi.org/v1/articles?source=cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
    .then(response => response.json());
    console.log("***** fetchNews: NEWS_RECEIVED ****");
  yield put({ type: "NEWS_RECEIVED", json: json.articles || [{ error: json.message }] });
}

function* actionWatcher() {
  console.log("***** actionWatcher: GET_NEWS ****")
  yield takeLatest('GET_NEWS', fetchNews)
}


export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
