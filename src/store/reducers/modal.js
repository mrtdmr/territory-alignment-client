import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const initialState = {
  open: false,
  body: null,
};

const openModal = (state, action) => {
  return updateObject(state, { open: true, body: action.body });
};
const closeModal = (state, action) => {
  return updateObject(state, { open: false, body: null });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return openModal(state, action);
    case actionTypes.CLOSE_MODAL:
      return closeModal(state, action);
    default:
      return state;
  }
};

export default reducer;
