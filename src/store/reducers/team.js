import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  teams: [],
  loading: false,
  Team: {},
};

const getTeamsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const getTeamsSuccess = (state, action) => {
  return updateObject(state, {
    teams: action.teams,
    loading: false,
  });
};

const getTeamsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TEAMS_START:
      return getTeamsStart(state, action);
    case actionTypes.GET_TEAMS_SUCCESS:
      return getTeamsSuccess(state, action);
    case actionTypes.GET_TEAMS_FAIL:
      return getTeamsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
