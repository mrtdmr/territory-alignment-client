import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  departments: [],
  loading: false,
  department: {},
};

const getDepartmentsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const getDepartmentsSuccess = (state, action) => {
  return updateObject(state, {
    departments: action.departments,
    loading: false,
  });
};

const getDepartmentsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DEPARTMENTS_START:
      return getDepartmentsStart(state, action);
    case actionTypes.GET_DEPARTMENTS_SUCCESS:
      return getDepartmentsSuccess(state, action);
    case actionTypes.GET_DEPARTMENTS_FAIL:
      return getDepartmentsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
