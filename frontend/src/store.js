import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  loginReducer,
  userRegisterReducer,
  userDetailsReducer,
  updateUserDetailsReducer,
  getAllUsersReducer,
  deleteUserReducer,
} from "./reducers/authReducer";

import {
  allOrdersReducer,
  fetchOrderReducer,
  orderCreateReducer,
  orderDeliverReducer,
  orderPayReducer,
  userOrdersReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  cart: cartReducer,
  userLogin: loginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  updateUserProfile: updateUserDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: fetchOrderReducer,
  orderPay: orderPayReducer,
  userOrders: userOrdersReducer,
  allUsers: getAllUsersReducer,
  deleteUser: deleteUserReducer,
  deleteProduct: productDeleteReducer,
  productCreate: productCreateReducer,
  updateProduct: productUpdateReducer,
  allOrders: allOrdersReducer,
  orderDeliver: orderDeliverReducer,
  productReview: productReviewCreateReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
