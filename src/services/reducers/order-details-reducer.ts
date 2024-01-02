import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  OPEN_MODAL_ORDER_DETAILS,
  CLOSE_MODAL_ORDER_DETAILS,
} from "../constants/order-details-constants";
import { TOrderDetailsActions } from "../actions/order-details-actions";

export type TOrderDetailsState = {
  orderNumber: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
  isModalActive: boolean;
};

const orderDetailsInitialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  isModalActive: false,
};

export const orderDetailsReducer = (
  state = orderDetailsInitialState,
  action: TOrderDetailsActions
): TOrderDetailsState => {
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
