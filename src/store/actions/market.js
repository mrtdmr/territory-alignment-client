import * as actionTypes from './actionTypes';
import agent from '../../api/agent';
import { toast } from 'react-toastify';

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
        if (res.isSuccess) {
          dispatch(getMarketsSuccess(res.data));
          resolve(res.data);
        } else toast.error('Pazarlar listelenemedi.');
      })
      .catch((err) => {
        dispatch(getMarketsFail(err));
        reject(err);
      });
  });
