import * as actionTypes from './actionTypes';
import agent from '../../api/agent';

export const getTeamsSuccess = (teams) => {
  return {
    type: actionTypes.GET_TEAMS_SUCCESS,
    teams: teams,
  };
};

export const getTeamsFail = (error) => {
  return {
    type: actionTypes.GET_TEAMS_FAIL,
    error: error,
  };
};

export const getTeamsStart = () => {
  return {
    type: actionTypes.GET_TEAMS_START,
  };
};

export const getTeams = () => {
  return (dispatch) => {
    dispatch(getTeamsStart());
    agent.Teams.list()
      .then((res) => {
        dispatch(getTeamsSuccess(res));
      })
      .catch((err) => {
        dispatch(getTeamsFail(err));
      });
  };
};
