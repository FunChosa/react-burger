import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
} from "../constants/all-ingredients-constants";
import { TAllIngredientsActions } from "../actions/all-ingredients-actions";
import { IIngredientType } from "../../utils/types";

export type TAllIngredientsState = {
  allIngredients: IIngredientType[];
  allIngredientsRequest: boolean;
  allIngredientsFailed: boolean;
};

const allIngredientsInitialState: TAllIngredientsState = {
  allIngredients: [],
  allIngredientsRequest: false,
  allIngredientsFailed: false,
};

export const allIngredientsReducer = (
  state = allIngredientsInitialState,
  action: TAllIngredientsActions
): TAllIngredientsState => {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return {
        ...state,
        allIngredientsRequest: true,
        allIngredientsFailed: false,
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        allIngredients: action.data,
        allIngredientsRequest: false,
        allIngredientsFailed: false,
      };
    case GET_DATA_ERROR:
      return {
        ...state,
        allIngredientsRequest: false,
        allIngredientsFailed: true,
      };
    default: {
      return state;
    }
  }
};
