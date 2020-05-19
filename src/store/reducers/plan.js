import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  plans: [],
  loading: false,
  plan: {
    deduction: {
      deductionDetails: [],
    },
    induction: {
      inductionDetails: [],
    },
    team: {},
  },
  submitting: false,
};

const createPlanStart = (state, action) => {
  return updateObject(state, { loading: true, submitting: true });
};

const createPlanSuccess = (state, action) => {
  return updateObject(state, { loading: false, submitting: false });
};

const createPlanFail = (state, action) => {
  return updateObject(state, { loading: false, submitting: false });
};

const getPlansStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const getPlansSuccess = (state, action) => {
  return updateObject(state, {
    plans: action.plans,
    loading: false,
  });
};

const getPlansFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const getPlanStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const getPlanSuccess = (state, action) => {
  return updateObject(state, {
    plan: action.plan,
    loading: false,
  });
};

const getPlanFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const updatePlanStart = (state, action) => {
  return updateObject(state, { loading: false, submitting: true });
};

const updatePlanSuccess = (state, action) => {
  return updateObject(state, { loading: false, submitting: false });
};

const updatePlanFail = (state, action) => {
  return updateObject(state, { loading: false, submitting: false });
};

const addDepartmentToPlanStart = (state, action) => {
  return updateObject(state, { loading: false, submitting: true });
};

const addDepartmentToPlanSuccess = (state, action) => {
  return updateObject(state, { loading: false, submitting: false });
};

const addDepartmentToPlanFail = (state, action) => {
  return updateObject(state, { loading: false, submitting: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PLAN_START:
      return createPlanStart(state, action);
    case actionTypes.CREATE_PLAN_SUCCESS:
      return createPlanSuccess(state, action);
    case actionTypes.CREATE_PLAN_FAIL:
      return createPlanFail(state, action);
    case actionTypes.GET_PLANS_START:
      return getPlansStart(state, action);
    case actionTypes.GET_PLANS_SUCCESS:
      return getPlansSuccess(state, action);
    case actionTypes.GET_PLANS_FAIL:
      return getPlansFail(state, action);
    case actionTypes.GET_PLAN_START:
      return getPlanStart(state, action);
    case actionTypes.GET_PLAN_SUCCESS:
      return getPlanSuccess(state, action);
    case actionTypes.GET_PLAN_FAIL:
      return getPlanFail(state, action);
    case actionTypes.UPDATE_PLAN_START:
      return updatePlanStart(state, action);
    case actionTypes.UPDATE_PLAN_SUCCESS:
      return updatePlanSuccess(state, action);
    case actionTypes.UPDATE_PLAN_FAIL:
      return updatePlanFail(state, action);
    case actionTypes.ADD_DEPARTMENT_TO_PLAN_START:
      return addDepartmentToPlanStart(state, action);
    case actionTypes.ADD_DEPARTMENT_TO_PLAN_SUCCESS:
      return addDepartmentToPlanSuccess(state, action);
    case actionTypes.ADD_DEPARTMENT_TO_PLAN_FAIL:
      return addDepartmentToPlanFail(state, action);
    default:
      return state;
  }
};

export default reducer;
