import {
  orderDetailsReducer,
  TOrderDetailsState,
} from "../order-details-reducer";
import * as actions from "../../actions/order-details-actions";

const initialState: TOrderDetailsState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  isModalActive: false,
};

describe("orderDetailsReducer", () => {
  it("should hande the initial state of orderDetailsReducer", () => {
    expect(
      orderDetailsReducer(undefined, {} as actions.TOrderDetailsActions)
    ).toEqual(initialState);
  });

  it("should handle POST_ORDER_REQUEST action", () => {
    expect(
      orderDetailsReducer(undefined, actions.postOrderRequestAction())
    ).toEqual({
      ...initialState,
      orderRequest: true,
    });
  });

  it("should handle POST_ORDER_SUCCESS action", () => {
    const order = {
      name: "order name",
      order: {
        number: 123,
      },
      success: true,
    };

    expect(
      orderDetailsReducer(undefined, actions.postOrderSuccessAction(order))
    ).toEqual({
      ...initialState,
      orderNumber: order.order.number,
      orderRequest: false,
      orderFailed: false,
    });
  });

  it("should handle POST_ORDER_ERROR action", () => {
    expect(
      orderDetailsReducer(undefined, actions.postOrderErrorAction())
    ).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: true,
    });
  });

  it("should handle OPEN_MODAL_ORDER_DETAILS action", () => {
    expect(
      orderDetailsReducer(undefined, actions.openModalOrderDetailsAction())
    ).toEqual({
      ...initialState,
      isModalActive: true,
    });
  });

  it("should handle CLOSE_MODAL_ORDER_DETAILS action", () => {
    expect(
      orderDetailsReducer(undefined, actions.closeModalOrderDetailsAction())
    ).toEqual({
      ...initialState,
      isModalActive: false,
    });
  });
});
