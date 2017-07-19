import { combineReducers } from 'redux'
import * as ActionTypes from '../actions'

function byId(state = {}, action) {
  switch (action.type) {
    case ActionTypes.STOCKS.GET.SUCCESS:
      return {
        ...state,
        ...action.payload.stocks.reduce((prev, s) => {
          prev[s.code] = { ...prev[s.code], ...s }
          return prev
        }, {})
      }
    case ActionTypes.STOCK.GET.SUCCESS:
      return {
        ...state,
        [action.payload.stock.code]: { ...state[action.payload.stock.code], ...action.payload.stock }
      }
    case 'STOCK_DEL':
      let {[action.payload.stock.code]: omit, ...rest} = state
      return rest
    default:
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case ActionTypes.STOCKS.GET.SUCCESS:
      return [...new Set([...state, ...action.payload.stocks.map(s => s.code)])]
    case ActionTypes.STOCK.GET.SUCCESS:
      return [...new Set([...state, action.payload.stock.code])]
    case 'STOCK_DEL':
      const index = state.indexOf(action.payload.stock.code)
      if (index > -1) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ]
      } else {
        return state
      }
    default:
      return state
  }
}

export default combineReducers({
  byId,
  allIds
})
