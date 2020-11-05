import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_REQUEST_FAIL,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_REQUEST_SUCCESS,
  USER_DETAILS_REQUEST_FAIL,
  UPDATE_USER_DETAILS,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  ALL_USERS_RESET,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_RESET,
} from "../constants/authConstants";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_REQUEST_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_REQUEST_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_REQUEST_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_REQUEST_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_REQUEST_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { users: {} };
    default:
      return state;
  }
};

export const updateUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_DETAILS:
      return { loading: true };
    case UPDATE_USER_DETAILS_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case UPDATE_USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { loading: true };
    case GET_ALL_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case GET_ALL_USERS_FAIL:
      return { loading: false, error: action.payload };
    case ALL_USERS_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER:
      return { loading: true };
    case DELETE_USER_SUCCESS:
      return { loading: false, success: true };
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
