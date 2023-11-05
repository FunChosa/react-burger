import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  OPEN_MODAL_ORDER_DETAILS,
  CLOSE_MODAL_ORDER_DETAILS,
} from "../actions/order-details-actions";

const initialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  isModalActive: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
      };
    case POST_ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.number,
        orderRequest: false,
        orderFailed: false,
      };
    case POST_ORDER_ERROR:
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    case OPEN_MODAL_ORDER_DETAILS:
      return {
        ...state,
        isModalActive: true,
      };
    case CLOSE_MODAL_ORDER_DETAILS:
      return {
        ...state,
        isModalActive: false,
      };
    default: {
      return state;
    }
  }
};
