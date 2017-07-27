const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base, action) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[action] = acc[action] || {}
    acc[action][type] = `${base}_${action}_${type}`
    return acc
  }, {})
}

function action(type, payload = {}) {
  return {type, payload: { ...payload }}
}

export const STOCK = createRequestTypes('STOCK', 'GET')
export const STOCKS = createRequestTypes('STOCKS', 'GET')
export const USER = createRequestTypes('USER', 'SIGNIN')

export const stock = {
  getAll: id => action(STOCKS['GET'][REQUEST], {}),
  getAllSuccess: (stocks) => action(STOCKS['GET'][SUCCESS], {stocks}),
  // getAllFailure: (error) => action(STOCKS['GET'][FAILURE], {error}),
  get: id => action(STOCK['GET'][REQUEST], {id}),
  getSuccess: (stock) => action(STOCK['GET'][SUCCESS], {stock}),
  // getFailure: (error) => action(STOCK['GET'][FAILURE], {error}),
}

export const user = {
  signIn: id => action(USER['SIGNIN'][REQUEST], {id}),
  signInSuccess: (user) => action(USER['SIGNIN'][SUCCESS], {user}),
  signInFailure: (user) => action(USER['SIGNIN'][FAILURE], {user}),
}
