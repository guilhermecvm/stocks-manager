// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"]

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly"

const gapi = window.gapi

export const signIn = () => gapi.auth2.getAuthInstance().signIn()
export const signOut = () => gapi.auth2.getAuthInstance().signOut()

export const updateSignInStatus = (isSignedIn) => {
  if (isSignedIn) {
    // authorizeButton.style.display = 'none';
    // signoutButton.style.display = 'block';
  } else {
    // authorizeButton.style.display = 'block';
    // signoutButton.style.display = 'none';
  }
}

export const init = () =>
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);

    // Handle the initial sign-in state.
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  })

export const handleClientLoad = () => new Promise(resolve => gapi.load('client:auth2', () => init().then(resolve)))



const mapStock = ([code, shares, currentPrice, marketValue]) => ({
  code,
  shares,
  currentPrice,
  marketValue,
  avgCost: 0,
  transactions: [],
  holding: {
    total: {
      buy: 0,
      sell: 0,
      pl: 0,
      plPct: 0
    },
    unrealized: {
      buy: 0,
      sell: 0,
      pl: 0,
      plPct: 0
    },
    realized: {
      buy: 0,
      sell: 0,
      pl: 0,
      plPct: 0
    }
  }
})

const mapStockDetails = (code, values) => ({
  ...mapStock([code, values[1][0], values[1][2], values[1][3]]),
  avgCost: values[1][1],
  transactions: [],
  holding:  {
    total: {
      buy: values[4][1],
      sell: values[4][2],
      pl: values[4][3],
      plPct: values[4][4]
    },
    unrealized: {
      buy: values[5][1],
      sell: values[5][2],
      pl: values[5][3],
      plPct: values[5][4]
    },
    realized: {
      buy: values[6][1],
      sell: values[6][2],
      pl: values[6][3],
      plPct: values[6][4]
    }
  }
})

const mapTransaction = ([code, type, date, shares, price, total]) => ({
  code,
  type,
  date,
  shares,
  price,
  total
})


export const getStocks = () =>
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: process.env.REACT_APP_GOOGLE_SPREADSHEET_ID,
    range: `Stocks!A2:F7`,
    valueRenderOption: 'UNFORMATTED_VALUE'
  }).then(response => response.result.values.map(mapStock))

export const getTransactions = (stockCode) =>
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: process.env.REACT_APP_GOOGLE_SPREADSHEET_ID,
    range: `${stockCode}!A2:F`,
    valueRenderOption: 'UNFORMATTED_VALUE',
    dateTimeRenderOption: 'FORMATTED_STRING'
  }).then(response => response.result.values.map(mapTransaction))

export const getStockDetails = (stockCode) =>
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: process.env.REACT_APP_GOOGLE_SPREADSHEET_ID,
    range: `${stockCode}!J1:N7`,
    valueRenderOption: 'UNFORMATTED_VALUE'
  }).then(response => mapStockDetails(stockCode, response.result.values))

export const getStock = (stockCode) =>
  getStockDetails(stockCode).then(stock =>
    getTransactions(stockCode).then(transactions => {
      stock.transactions = transactions
      return stock
    })
  )

export default {
  handleClientLoad,
  init,
  signIn,
  signOut,
  updateSignInStatus,
  getStocks,
  getStock
}
