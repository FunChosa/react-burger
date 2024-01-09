import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../../constants/ws-constants";
import { wsReducer } from "../ws-reducer";
import { TWsReduserState } from "../ws-reducer";
import * as action from "../../actions/ws-actions";

const initialState: TWsReduserState = {
  wsConnected: false,
  error: null,
  orders: [],
  total: null,
  totalToday: null,
};

describe("wsReducer", () => {
  it("should hande the initial state of wsReducer", () => {
    expect(wsReducer(undefined, {} as action.TWSActionActions)).toEqual(
      initialState
    );
  });

  it("should handle WS_CONNECTION_SUCCESS action", () => {
    const action = {
      type: WS_CONNECTION_SUCCESS,
    };
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it("should handle WS_CONNECTION_ERROR action", () => {
    const errorPayload = { message: "Connection error" };
    const action = {
      type: WS_CONNECTION_ERROR,
      payload: errorPayload,
    };
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      error: errorPayload,
      wsConnected: false,
    });
  });

  it("should handle WS_CONNECTION_CLOSED action", () => {
    const action = {
      type: WS_CONNECTION_CLOSED,
    };
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it("should handle WS_GET_MESSAGE action", () => {
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
      type: WS_GET_MESSAGE,
      payload: payload,
    };
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      orders: payload.orders,
      total: payload.total,
      totalToday: payload.totalToday,
    });
  });
});
