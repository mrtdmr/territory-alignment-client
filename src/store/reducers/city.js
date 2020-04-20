import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  cities: [],
  loading: false,
  city: {},
};

const getCitiesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const getCitiesSuccess = (state, action) => {
  return updateObject(state, {
    cities: action.cities,
    loading: false,
  });
};

const getCitiesFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CITIES_START:
      return getCitiesStart(state, action);
    case actionTypes.GET_CITIES_SUCCESS:
      return getCitiesSuccess(state, action);
    case actionTypes.GET_CITIES_FAIL:
      return getCitiesFail(state, action);
    default:
      return state;
  }
};

export default reducer;
