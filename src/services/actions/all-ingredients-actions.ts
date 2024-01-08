import { AppDispatch } from "../..";
import { getIngredients } from "../../utils/burger-api";
import { IIngredientType } from "../../utils/types";
import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
} from "../constants/all-ingredients-constants";
export interface IGetIngredients {
  readonly type: typeof GET_DATA_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_DATA_SUCCESS;
  readonly data: IIngredientType[];
}

export interface IGetIngredientsError {
  readonly type: typeof GET_DATA_ERROR;
}

export type TAllIngredientsActions =
  | IGetIngredients
  | IGetIngredientsSuccess
  | IGetIngredientsError;

export const getIngredientsRequest = (): IGetIngredients => ({
  type: GET_DATA_REQUEST,
});

export const getIngredientsSuccess = (
  data: IIngredientType[]
): IGetIngredientsSuccess => ({
  type: GET_DATA_SUCCESS,
  data,
});

export const getIngredientsError = (): IGetIngredientsError => ({
  type: GET_DATA_ERROR,
});
export const getData = () => async (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequest());
  try {
    const res = await getIngredients();
    if (res && res.success) {
      dispatch(getIngredientsSuccess(res.data));
    } else {
      dispatch(getIngredientsError());
    }
  } catch (err) {
    console.error(err);
    dispatch(getIngredientsError());
  }
};
