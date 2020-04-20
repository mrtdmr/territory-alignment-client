import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  markets: [],
  loading: false,
  market: {},
};

const getMarketsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const getMarketsSuccess = (state, action) => {
  return updateObject(state, {
    markets: action.markets,
    loading: false,
  });
};

const getMarketsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MARKETS_START:
      return getMarketsStart(state, action);
    case actionTypes.GET_MARKETS_SUCCESS:
      return getMarketsSuccess(state, action);
    case actionTypes.GET_MARKETS_FAIL:
      return getMarketsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
