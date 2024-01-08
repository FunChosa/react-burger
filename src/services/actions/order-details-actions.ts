import { sendOrder } from "../../utils/burger-api";
import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  OPEN_MODAL_ORDER_DETAILS,
  CLOSE_MODAL_ORDER_DETAILS,
  RESET_INGREDIENTS,
} from "../constants/order-details-constants";
import { IIngredientType, IOrder } from "../../utils/types";
import { AppDispatch } from "../..";

export interface IPostOrder {
  readonly type: typeof POST_ORDER_REQUEST;
}
export interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly number: number;
}
export interface IPostOrderError {
  readonly type: typeof POST_ORDER_ERROR;
}
export interface IOpenModalOrderDetails {
  readonly type: typeof OPEN_MODAL_ORDER_DETAILS;
}
export interface ICloseModalOrderDetails {
  readonly type: typeof CLOSE_MODAL_ORDER_DETAILS;
}
export interface IResetIngredients {
  readonly type: typeof RESET_INGREDIENTS;
}

export type TOrderDetailsActions =
  | IPostOrder
  | IPostOrderSuccess
  | IPostOrderError
  | IOpenModalOrderDetails
  | ICloseModalOrderDetails
  | IResetIngredients;

export const postOrderRequestAction = (): IPostOrder => ({
  type: POST_ORDER_REQUEST,
});

export const postOrderSuccessAction = (res: IOrder): IPostOrderSuccess => ({
  type: POST_ORDER_SUCCESS,
  number: res.order.number,
});

export const postOrderErrorAction = (): IPostOrderError => ({
  type: POST_ORDER_ERROR,
});

export const openModalOrderDetailsAction = (): IOpenModalOrderDetails => ({
  type: OPEN_MODAL_ORDER_DETAILS,
});

export const closeModalOrderDetailsAction = (): ICloseModalOrderDetails => ({
  type: CLOSE_MODAL_ORDER_DETAILS,
});

export const resetIngredientsAction = (): IResetIngredients => ({
  type: RESET_INGREDIENTS,
});

export const postOrderRequest =
  (ingredients: IIngredientType[]) => async (dispatch: AppDispatch) => {
    dispatch(postOrderRequestAction());
    try {
      const res = await sendOrder(ingredients);
      if (res && res.success) {
        dispatch(postOrderSuccessAction(res));
        dispatch(openModalOrderDetailsAction());
        dispatch(resetIngredientsAction());
      } else {
        dispatch(postOrderErrorAction());
      }
    } catch (error) {
      dispatch(postOrderErrorAction());
    }
  };
