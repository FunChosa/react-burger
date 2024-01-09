import {
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
} from "../../constants/ws-auth-constants";
import { wsReducerAuth } from "../ws-auth-reducer";
import { TWsReduserAuthState } from "../ws-auth-reducer";
import * as action from "../../actions/ws-auth-actions";

const initialState: TWsReduserAuthState = {
  wsConnected: false,
  error: null,
  orders: [],
  total: null,
  totalToday: null,
};

describe("wsReducerAuth", () => {
  it("should return the initial state", () => {
    expect(
      wsReducerAuth(undefined, {} as action.TWSActionsAuthActions)
    ).toEqual(initialState);
  });

  it("should handle WS_CONNECTION_SUCCESS_AUTH action", () => {
    const action = {
      type: WS_CONNECTION_SUCCESS_AUTH,
    };
    expect(wsReducerAuth(initialState, action)).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it("should handle WS_CONNECTION_ERROR_AUTH action", () => {
    const errorPayload = { message: "Connection error" };
    const action = {
      type: WS_CONNECTION_ERROR_AUTH,
      payload: errorPayload,
    };
    expect(wsReducerAuth(initialState, action)).toEqual({
      ...initialState,
      error: errorPayload,
      wsConnected: false,
    });
  });

  it("should handle WS_CONNECTION_CLOSED_AUTH action", () => {
    const action = {
      type: WS_CONNECTION_CLOSED_AUTH,
    };
    expect(wsReducerAuth(initialState, action)).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it("should handle WS_GET_MESSAGE_AUTH action", () => {
    const payload = {
      orders: [
        {
          createdAt: "2022-01-01T00:00:00.000Z",
          ingredients: [
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c8",
            "60d3b41abdacab0026a733c9",
          ],
          name: "Краторная булка N-200i",
          number: 123456,
          status: "done",
        },
        {
          createdAt: "2022-01-01T00:00:00.000Z",
          ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c8"],
          name: "Краторная булка N-200i",
          number: 123456,
          status: "done",
        },
      ],
      total: 18,
      totalToday: 12,
    };
    const action = {
      type: WS_GET_MESSAGE_AUTH,
      payload: payload,
    };
    expect(wsReducerAuth(initialState, action)).toEqual({
      ...initialState,
      orders: payload.orders,
      total: payload.total,
      totalToday: payload.totalToday,
    });
  });
});
