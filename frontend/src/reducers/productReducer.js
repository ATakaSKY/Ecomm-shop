import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_REQUEST_FAIL,
  CREATE_PRODUCT_REQUEST_SUCCESS,
  CREATE_PRODUCT_RESET,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_REQUEST_FAIL,
  PRODUCT_DELETE_REQUEST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_REQUEST_FAIL,
  PRODUCT_DETAILS_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_FAIL,
  PRODUCT_LIST_REQUEST_SUCCESS,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_REQUEST_SUCCESS,
  CREATE_PRODUCT_REVIEW_REQUEST_FAIL,
  CREATE_PRODUCT_REVIEW_RESET,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_REQUEST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_REQUEST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_REQUEST_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_REQUEST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true, success: false };
    case PRODUCT_DELETE_REQUEST_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_REQUEST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case CREATE_PRODUCT_REQUEST_SUCCESS:
      debugger;
      return { loading: false, product: action.payload, success: true };
    case CREATE_PRODUCT_REQUEST_FAIL:
      debugger;
      return { loading: false, error: action.payload };
    case CREATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REVIEW_REQUEST:
      return { ...state, loading: true };
    case CREATE_PRODUCT_REVIEW_REQUEST_SUCCESS:
      return { loading: false, success: true };
    case CREATE_PRODUCT_REVIEW_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_PRODUCT_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PRODUCT:
      return { ...state, loading: true };
    case EDIT_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case EDIT_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case EDIT_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
