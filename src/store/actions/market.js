import * as actionTypes from './actionTypes';
import agent from '../../api/agent';

export const getMarketsSuccess = (markets) => {
  return {
    type: actionTypes.GET_MARKETS_SUCCESS,
    markets: markets,
  };
};

export const getMarketsFail = (error) => {
  return {
    type: actionTypes.GET_MARKETS_FAIL,
    error: error,
  };
};

export const getMarketsStart = () => {
  return {
    type: actionTypes.GET_MARKETS_START,
  };
};
export const getMarkets = () => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(getMarketsStart());
    agent.Markets.list()
      .then((res) => {
        dispatch(getMarketsSuccess(res));
        resolve(res);
      })
      .catch((err) => {
        dispatch(getMarketsFail(err));
        reject(err);
      });
  });
