import {
  OPEN_MODAL_INGREDIENT_DETAILS,
  DELETE_MODAL_INGREDIENT_DETAILS,
} from "../actions/ingredient-details-actions";

const initialState = {
  ingredient: {},
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredient: action.ingredient,
      };
    case DELETE_MODAL_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredient: {},
      };
    default: {
      return state;
    }
  }
};
