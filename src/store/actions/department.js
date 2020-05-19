import * as actionTypes from './actionTypes';
import agent from '../../api/agent';

export const getDepartmentsSuccess = (departments) => {
  return {
    type: actionTypes.GET_DEPARTMENTS_SUCCESS,
    departments: departments,
  };
};

export const getDepartmentsFail = (error) => {
  return {
    type: actionTypes.GET_DEPARTMENTS_FAIL,
    error: error,
  };
};

export const getDepartmentsStart = () => {
  return {
    type: actionTypes.GET_DEPARTMENTS_START,
  };
};
export const getDepartments = (planId) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(getDepartmentsStart());
    agent.Departments.list(planId)
      .then((res) => {
        dispatch(getDepartmentsSuccess(res.data));
        resolve(res.data);
      })
      .catch((err) => {
        dispatch(getDepartmentsFail(err));
        reject(err);
      });
  });
