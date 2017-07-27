import * as ActionTypes from '../actions'

export function user(state = {}, action) {
  switch (action.type) {
    case ActionTypes.USER.SIGNIN.SUCCESS:
      return {
        ...state
      }
    case 'STOCK_DEL':
      return {}
    default:
      return state
  }
}

export function signedIn(state = false, action) {
  switch (action.type) {
    case ActionTypes.USER.SIGNIN.SUCCESS:
      return true
    case ActionTypes.USER.SIGNIN.FAILURE:
      return false
    default:
      return state
  }
}
export default user
