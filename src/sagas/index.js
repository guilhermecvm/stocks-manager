import { all, put, call, spawn, takeEvery, select } from 'redux-saga/effects'
import * as ActionTypes from '../actions'
import spreadsheet from '../spreadsheet'
import { isSignedIn } from '../reducers/selectors'

export function* getStocks() {
  yield call(initGoogleApi)

  const stocks = yield call(spreadsheet.getStocks)
  yield put(ActionTypes.stock.getAllSuccess(stocks))
}

export function* getStock(action) {
  yield call(initGoogleApi)

  const stock = yield call(spreadsheet.getStock, action.payload.id)
  yield put(ActionTypes.stock.getSuccess(stock))
}

export function* initGoogleApi() {
  var signedIn = yield select(isSignedIn)
  if (!signedIn) {
    signedIn = yield call(spreadsheet.handleClientLoad)

    // spawn acts as a detached fork
    yield spawn(listenSignInChanges)

    yield call(updateSignInStatus, signedIn)
  }

  if (!signedIn) {
    throw new Error('User not signed in')
  }
}

export function* listenSignInChanges() {
  const signedIn = yield call(spreadsheet.listenSignInChanges)
  yield call(updateSignInStatus, signedIn)
  yield call(listenSignInChanges)
}

function* updateSignInStatus(signedIn) {
  if (signedIn) {
    yield put(ActionTypes.user.signInSuccess())
  } else {
    yield put(ActionTypes.user.signInFailure())
  }
}

export default function* root() {
  yield all([
    takeEvery(ActionTypes.STOCK.GET.REQUEST, getStock),
    takeEvery(ActionTypes.STOCKS.GET.REQUEST, getStocks),

  ])
}
