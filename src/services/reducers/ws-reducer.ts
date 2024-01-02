import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../constants/ws-constants";
import { TWSActionActions } from "../actions/ws-actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { TOrder } from "../../utils/types";

type TWsReduserState = {
  wsConnected: Boolean;
  error: PayloadAction | null;
  orders: Array<TOrder>;
  total: number | null;
  totalToday: number | null;
};

const initialState: TWsReduserState = {
  wsConnected: false,
  error: null,
  orders: [],
  total: null,
  totalToday: null,
};

export const wsReducer = (
  state = initialState,
  action: TWSActionActions
): TWsReduserState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
