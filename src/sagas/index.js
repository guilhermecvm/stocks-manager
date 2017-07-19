import { all, put, call, takeEvery } from 'redux-saga/effects'
import * as ActionTypes from '../actions'
import spreadsheet from '../spreadsheet'

export function* getStocks() {
  // const user = yield select(getUser, login)
  // if (!user) {
  //   const login = yield call(spreadsheet.handleClientLoad)
  // }

  yield call(spreadsheet.handleClientLoad)
  const stocks = yield call(spreadsheet.getStocks)
  yield put(ActionTypes.stock.getAllSuccess(stocks))
}

export function* getStock(action) {
  // const user = yield select(getUser, login)
  // if (!user) {
  //   const login = yield call(spreadsheet.handleClientLoad)
  // }

  yield call(spreadsheet.handleClientLoad)
  const stock = yield call(spreadsheet.getStock, action.payload.id)
  yield put(ActionTypes.stock.getSuccess(stock))
}

export default function* root() {
  yield all([
    takeEvery(ActionTypes.STOCK.GET.REQUEST, getStock),
    takeEvery(ActionTypes.STOCKS.GET.REQUEST, getStocks)

  ])
}
