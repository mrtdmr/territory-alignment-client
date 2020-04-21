import * as actionTypes from './actionTypes';
export const getTeamsFail = (error) => {
  return {
    type: actionTypes.GET_TEAMS_FAIL,
    error: error,
  };
};

export const openModal = (body) => {
  return {
    type: actionTypes.OPEN_MODAL,
    body: body,
  };
};
export const closeModal = () => {
  return {
    type: actionTypes.CLOSE_MODAL,
  };
};
