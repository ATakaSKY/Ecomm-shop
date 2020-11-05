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
  ORDER_PAY_RESET,
  USER_ORDER_REQUEST,
  USER_ORDER_REQUEST_SUCCESS,
  USER_ORDER_REQUEST_FAIL,
  USER_ORDER_RESET,
  GET_ALL_ORDERS,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  UPDATE_ORDER_DELIVER,
  UPDATE_ORDER_DELIVER_SUCCESS,
  UPDATE_ORDER_DELIVER_FAIL,
  UPDATE_ORDER_DELIVER_RESET,
  ORDER_RESET,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_REQUEST_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fetchOrderReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { loading: true };
    case GET_ORDER_REQUEST_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case GET_ORDER_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_REQUEST_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case ORDER_PAY_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_DELIVER:
      return { loading: true };
    case UPDATE_ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const userOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case USER_ORDER_REQUEST:
      return { loading: true };
    case USER_ORDER_REQUEST_SUCCESS:
      return { loading: false, orders: action.payload };
    case USER_ORDER_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case USER_ORDER_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return { loading: true };
    case GET_ALL_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case GET_ALL_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
