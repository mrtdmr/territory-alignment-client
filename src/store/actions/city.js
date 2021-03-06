import * as actionTypes from './actionTypes';
import agent from '../../api/agent';
import { toast } from 'react-toastify';

export const getCitiesSuccess = (cities) => {
  return {
    type: actionTypes.GET_CITIES_SUCCESS,
    cities: cities,
  };
};

export const getCitiesFail = (error) => {
  return {
    type: actionTypes.GET_CITIES_FAIL,
    error: error,
  };
};

export const getCitiesStart = () => {
  return {
    type: actionTypes.GET_CITIES_START,
  };
};
export const getCities = () => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(getCitiesStart());
    agent.Cities.list()
      .then((res) => {
        if (res.isSccuess) {
          dispatch(getCitiesSuccess(res.data));
          resolve(res.data);
        } else toast.error('Şehirler listelenemedi.');
      })
      .catch((err) => {
        dispatch(getCitiesFail(err));
        reject(err);
      });
  });
