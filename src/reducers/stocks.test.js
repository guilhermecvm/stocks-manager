import * as ActionTypes from '../actions'
import reducer from './stocks'

describe('stocks reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      allIds: [],
      byId: {}
    })
  })

  it('should handle STOCK.GET.SUCCESS', () => {
    expect(
      reducer({}, {
        type: ActionTypes.STOCK.GET.SUCCESS,
        payload: {
          stock: { code: 'ABEV3' }
        }
      })
    ).toEqual({
      allIds: ['ABEV3'],
      byId: {
        'ABEV3': { code: 'ABEV3' }
      }
    })

    expect(
      reducer({
        allIds: ['ABEV3'],
        byId: {
          'ABEV3': { code: 'ABEV3' }
        }
      }, {
        type: ActionTypes.STOCK.GET.SUCCESS,
        payload: {
          stock: { code: 'PETR4' }
        }
      })
    ).toEqual({
      allIds: ['ABEV3', 'PETR4'],
      byId: {
        'ABEV3': { code: 'ABEV3' },
        'PETR4': { code: 'PETR4' }
      }
    })
  })

  it('should handle STOCK_DEL', () => {
    expect(
      reducer({
        allIds: ['ABEV3', 'PETR4'],
        byId: {
          'ABEV3': { code: 'ABEV3' },
          'PETR4': { code: 'PETR4' }
        }
      }, {
        type: 'STOCK_DEL',
        payload: {
          stock: { code: 'ABEV3' }
        }
      })
    ).toEqual({
      allIds: ['PETR4'],
      byId: {
        'PETR4': { code: 'PETR4' }
      }
    })

    expect(
      reducer({
        allIds: ['ABEV3'],
        byId: {
          'ABEV3': { code: 'ABEV3' }
        }
      }, {
        type: 'STOCK_DEL',
        payload: {
          stock: { code: 'ABCD' }
        }
      })
    ).toEqual({
      allIds: ['ABEV3'],
      byId: {
        'ABEV3': { code: 'ABEV3' }
      }
    })
  })
})
