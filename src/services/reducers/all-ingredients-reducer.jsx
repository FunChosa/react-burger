import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
} from "../actions/all-ingredients-actions";

const initialState = {
  allIngredients: [],
  allIngredientsRequest: false,
  allIngredientsFailed: false,
};

export const allIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return {
        ...state,
        allIngredientsRequest: true,
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
