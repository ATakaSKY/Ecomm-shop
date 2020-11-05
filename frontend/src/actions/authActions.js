import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_REQUEST_FAIL,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_FAIL,
  USER_DETAILS_REQUEST_FAIL,
  USER_DETAILS_REQUEST_SUCCESS,
  USER_DETAILS_REQUEST,
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
} from "../constants/authConstants";

import { USER_ORDER_RESET } from "../constants/orderConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post("/api/auth/login", {
      email,
      password,
    });
    dispatch({ type: USER_LOGIN_REQUEST_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_REQUEST_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await axios.post("/api/auth/register", {
      email,
      password,
      name,
    });
    dispatch({ type: USER_REGISTER_REQUEST_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_REQUEST_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_REQUEST_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/auth/${id}`, config);
    dispatch({ type: USER_DETAILS_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_REQUEST_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const updateUserProfile = (name, email, password) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_USER_DETAILS });

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
      `/api/auth/profile`,
      { name, email, password },
      config
    );
    dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_DETAILS_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const getAllUsersDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_USERS });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/auth/users`, config);
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_USER });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/auth/users/${id}`, config);
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const updateUserProfileAdmin = (userId, name, email, isAdmin) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_USER_DETAILS });

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
      `/api/auth/users/${userId}`,
      { name, email, isAdmin },
      config
    );
    dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: data });
    dispatch({ type: USER_DETAILS_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_DETAILS_FAIL,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_ORDER_RESET });
  dispatch({ type: ALL_USERS_RESET });
};
