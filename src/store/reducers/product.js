import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  products: [],
  loading: false,
  product: {},
};

const getProductsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const getProductsSuccess = (state, action) => {
  return updateObject(state, {
    products: action.products,
    loading: false,
  });
};

const getProductsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const getProductStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const getProductSuccess = (state, action) => {
  return updateObject(state, {
    product: action.product,
    loading: false,
  });
};

const getProductFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const setProductEmpty = (state, action) => {
  return updateObject(state, { product: {}, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_START:
      return getProductsStart(state, action);
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return getProductsSuccess(state, action);
    case actionTypes.GET_PRODUCTS_FAIL:
      return getProductsFail(state, action);
    case actionTypes.GET_PRODUCT_START:
      return getProductStart(state, action);
    case actionTypes.GET_PRODUCT_SUCCESS:
      return getProductSuccess(state, action);
    case actionTypes.GET_PRODUCT_FAIL:
      return getProductFail(state, action);
    case actionTypes.SET_PRODUCT_EMPTY:
      return setProductEmpty(state, action);
    default:
      return state;
  }
};

export default reducer;
