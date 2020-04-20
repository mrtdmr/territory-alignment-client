import * as actionTypes from './actionTypes';
import agent from '../../api/agent';

export const getProductsSuccess = (products) => {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    products: products,
  };
};

export const getProductsFail = (error) => {
  return {
    type: actionTypes.GET_PRODUCTS_FAIL,
    error: error,
  };
};

export const getProductsStart = () => {
  return {
    type: actionTypes.GET_PRODUCTS_START,
  };
};

export const getProducts = () => {
  return (dispatch) => {
    dispatch(getProductsStart());
    agent.Products.list()
      .then((res) => {
        dispatch(getProductsSuccess(res));
      })
      .catch((err) => {
        dispatch(getProductsFail(err));
      });
  };
};

export const getProductSuccess = (product) => {
  return {
    type: actionTypes.GET_PRODUCT_SUCCESS,
    product: product,
  };
};

export const getProductFail = (error) => {
  return {
    type: actionTypes.GET_PRODUCT_FAIL,
    error: error,
  };
};

export const getProductStart = () => {
  return {
    type: actionTypes.GET_PRODUCT_START,
  };
};

export const getProduct = (id) => {
  return (dispatch) => {
    dispatch(getProductStart());
    agent.Products.get(id)
      .then((res) => {
        dispatch(getProductSuccess(res));
      })
      .catch((err) => {
        dispatch(getProductFail(err));
      });
  };
};

export const setProductEmpty = () => {
  return {
    type: actionTypes.SET_PRODUCT_EMPTY,
  };
};

export const addProductSuccess = (product) => {
  return {
    type: actionTypes.ADD_PRODUCT_SUCCESS,
  };
};

export const addProductFail = (error) => {
  return {
    type: actionTypes.ADD_PRODUCT_FAIL,
    error: error,
  };
};

export const addProductStart = () => {
  return {
    type: actionTypes.ADD_PRODUCT_START,
  };
};

export const addProduct = (product) => {
  return (dispatch) => {
    dispatch(addProductStart());
    agent.Products.create(product)
      .then((res) => {
        dispatch(addProductSuccess(res));
      })
      .catch((err) => {
        dispatch(addProductFail(err));
      });
  };
};
