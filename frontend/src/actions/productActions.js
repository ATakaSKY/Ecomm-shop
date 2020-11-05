import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_FAIL,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_REQUEST_SUCCESS,
  PRODUCT_DETAILS_REQUEST_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_REQUEST_SUCCESS,
  PRODUCT_DELETE_REQUEST_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_REQUEST_SUCCESS,
  CREATE_PRODUCT_REQUEST_FAIL,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_REQUEST_SUCCESS,
  CREATE_PRODUCT_REVIEW_REQUEST_FAIL,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_REQUEST_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const productDetail = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const productDelete = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${productId}`, config);
    dispatch({ type: PRODUCT_DELETE_REQUEST_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_REQUEST_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const productCreate = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, product, config);
    dispatch({ type: CREATE_PRODUCT_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_REQUEST_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const productReviewCreate = (productId, rating, comment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REVIEW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(
      `/api/products/${productId}/review`,
      { rating, comment },
      config
    );
    dispatch({ type: CREATE_PRODUCT_REVIEW_REQUEST_SUCCESS });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_REVIEW_REQUEST_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const updateProduct = (productId, productData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: EDIT_PRODUCT });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${productId}`,
      productData,
      config
    );
    dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCT_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};
