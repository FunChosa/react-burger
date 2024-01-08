import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../constants/ws-constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { TOrders } from "../../utils/types";
export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: PayloadAction;
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsConnectionClose {
  readonly type: typeof WS_CONNECTION_CLOSE;
}
export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  payload: TOrders;
}
export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
}

export type TWSActionActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsConnectionClose
  | IWsGetMessage
  | IWsSendMessage;
