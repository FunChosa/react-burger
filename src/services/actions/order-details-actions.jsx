import { sentOrder } from "../../utils/burger-api"; // отправка заказа
export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST"; // запрос
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS"; // успешный
export const POST_ORDER_ERROR = "POST_ORDER_ERROR"; // неуспешный
export const OPEN_MODAL_ORDER_DETAILS = "OPEN_MODAL_ORDER_DETAILS_MODAL"; // открытие модального окна заказа
export const CLOSE_MODAL_ORDER_DETAILS = "CLOSE_MODAL_ORDER_DETAILS"; // закрытие модального окна заказа
export const RESET_INGREDIENTS = "RESET_INGREDIENTS";
export const postOrderRequest = (ingredients) => async (dispatch) => {
  dispatch({ type: POST_ORDER_REQUEST });
  try {
    const res = await sentOrder(ingredients);
    if (res && res.success) {
      dispatch({ type: POST_ORDER_SUCCESS, number: res.order.number });
      dispatch({ type: OPEN_MODAL_ORDER_DETAILS });
      dispatch({ type: RESET_INGREDIENTS });
    } else {
      dispatch({ type: POST_ORDER_ERROR });
    }
  } catch (error) {
    dispatch({ type: POST_ORDER_ERROR });
  }
};
