import {
  ADD_CART_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: "" },
  action
) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const product = action.payload;

      const isPresent = state.cartItems.find(
        (p) => p.productId === product.productId
      );

      if (isPresent) {
        isPresent.qty = product.qty;
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.productId === product.productId ? isPresent : cartItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, product],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload
        ),
      };

    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
