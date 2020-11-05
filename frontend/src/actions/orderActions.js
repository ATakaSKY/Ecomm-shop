import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_REQUEST_SUCCESS,
  ORDER_CREATE_REQUEST_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_REQUEST_SUCCESS,
  GET_ORDER_REQUEST_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_REQUEST_SUCCESS,
  ORDER_PAY_REQUEST_FAIL,
  USER_ORDER_REQUEST,
  USER_ORDER_REQUEST_SUCCESS,
  USER_ORDER_REQUEST_FAIL,
  GET_ALL_ORDERS,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  UPDATE_ORDER_DELIVER,
  UPDATE_ORDER_DELIVER_SUCCESS,
  UPDATE_ORDER_DELIVER_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders", order, config);
    dispatch({ type: ORDER_CREATE_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_REQUEST_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const getOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${orderId}`, config);
    dispatch({ type: GET_ORDER_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDER_REQUEST_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

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
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );
    dispatch({ type: ORDER_PAY_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_REQUEST_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const updateOrderToDeliver = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_ORDER_DELIVER });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/orders/${orderId}/delivered`, {}, config);
    dispatch({ type: UPDATE_ORDER_DELIVER_SUCCESS });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_DELIVER_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ORDER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myOrders`, config);
    dispatch({ type: USER_ORDER_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_ORDER_REQUEST_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_ORDERS });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};
