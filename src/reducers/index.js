import { combineReducers } from 'redux'
import stocks from './stocks'
import { user, signedIn } from './user'

export default combineReducers({
  stocks,
  signedIn,
  user
})
