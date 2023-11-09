import { getIngredients } from "../../utils/burger-api"; // получение списка ингредиентов

export const GET_DATA_REQUEST = "GET_DATA_REQUEST"; // запрос
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS"; // успешный
export const GET_DATA_ERROR = "GET_DATA_ERROR"; // неуспешный

export const getData = () => async (dispatch) => {
  dispatch({ type: GET_DATA_REQUEST });
  try {
    const res = await getIngredients();
    if (res && res.success) {
      dispatch({ type: GET_DATA_SUCCESS, data: res.data });
    } else {
      dispatch({ type: GET_DATA_ERROR });
    }
  } catch (err) {
    dispatch({ type: GET_DATA_ERROR });
  }
};
