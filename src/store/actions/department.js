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
export const getDepartments = () => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(getDepartmentsStart());
    agent.Departments.list()
      .then((res) => {
        dispatch(getDepartmentsSuccess(res));
        resolve(res);
      })
      .catch((err) => {
        dispatch(getDepartmentsFail(err));
        reject(err);
      });
  });
