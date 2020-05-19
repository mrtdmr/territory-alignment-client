import * as actionTypes from './actionTypes';
import agent from '../../api/agent';
import { history } from '../..';

export const createPlanStart = () => {
  return {
    type: actionTypes.CREATE_PLAN_START,
  };
};

export const createPlanSuccess = (plan) => {
  return {
    type: actionTypes.CREATE_PLAN_SUCCESS,
  };
};

export const createPlanFail = (error) => {
  return {
    type: actionTypes.CREATE_PLAN_FAIL,
    error: error,
  };
};

export const createPlan = (plan) => {
  return (dispatch) => {
    console.log('plan', plan);
    dispatch(createPlanStart());
    agent.Plans.create(plan)
      .then((res) => {
        dispatch(createPlanSuccess(res));
        dispatch(history.push('/plans'));
      })
      .catch((err) => {
        dispatch(createPlanFail(err));
      });
  };
};

export const getPlansSuccess = (plans) => {
  return {
    type: actionTypes.GET_PLANS_SUCCESS,
    plans: plans,
  };
};

export const getPlansFail = (error) => {
  return {
    type: actionTypes.GET_PLANS_FAIL,
    error: error,
  };
};

export const getPlansStart = () => {
  return {
    type: actionTypes.GET_PLANS_START,
  };
};

export const getPlans = () => {
  return (dispatch) => {
    dispatch(getPlansStart());
    agent.Plans.list()
      .then((res) => {
        dispatch(getPlansSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getPlansFail(err));
      });
  };
};

export const getPlanSuccess = (plan) => {
  return {
    type: actionTypes.GET_PLAN_SUCCESS,
    plan: plan,
  };
};

export const getPlanFail = (error) => {
  return {
    type: actionTypes.GET_PLAN_FAIL,
    error: error,
  };
};

export const getPlanStart = () => {
  return {
    type: actionTypes.GET_PLAN_START,
  };
};

export const getPlan = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(getPlanStart());
    agent.Plans.get(id)
      .then((res) => {
        dispatch(getPlanSuccess(res.data));
        resolve(res.data);
      })
      .catch((err) => {
        dispatch(getPlanFail(err));
        reject(err);
      });
  });

export const updatePlanStart = () => {
  return {
    type: actionTypes.UPDATE_PLAN_START,
  };
};

export const updatePlanSuccess = (plan) => {
  return {
    type: actionTypes.UPDATE_PLAN_SUCCESS,
  };
};

export const updatePlanFail = (error) => {
  return {
    type: actionTypes.UPDATE_PLAN_FAIL,
    error: error,
  };
};

export const updatePlan = (plan) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(updatePlanStart());
    agent.Plans.update(plan)
      .then((res) => {
        dispatch(updatePlanSuccess(res));
        resolve(res);
        //dispatch(history.push('/plans'));
        //history.go(0);
      })
      .catch((err) => {
        dispatch(updatePlanFail(err));
        reject(err);
      });
  });

export const addDepartmentToPlanStart = () => {
  return {
    type: actionTypes.ADD_DEPARTMENT_TO_PLAN_START,
  };
};

export const addDepartmentToPlanSuccess = (plan) => {
  return {
    type: actionTypes.ADD_DEPARTMENT_TO_PLAN_SUCCESS,
  };
};

export const addDepartmentToPlanFail = (error) => {
  return {
    type: actionTypes.ADD_DEPARTMENT_TO_PLAN_FAIL,
    error: error,
  };
};

export const addDepartmentToPlan = (planId, departmentId) => {
  return (dispatch) => {
    dispatch(addDepartmentToPlanStart());
    console.log('departmentId', departmentId);
    agent.Plans.addDepartmentToPlan(planId, departmentId)
      .then((res) => {
        dispatch(addDepartmentToPlanSuccess(res));
        //dispatch(history.push('/plans'));
        //history.go(0);
      })
      .catch((err) => {
        dispatch(addDepartmentToPlanFail(err));
      });
  };
};
