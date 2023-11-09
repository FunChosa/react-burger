import {
  OPEN_MODAL_INGREDIENT_DETAILS,
  CLOSE_MODAL_INGREDIENT_DETAILS,
} from "../actions/ingredient-details-actions";

const initialState = {
  ingredient: {},
  isModalActive: false,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_INGREDIENT_DETAILS:
      return {
        ...state,
        isModalActive: true,
        ingredient: action.ingredient,
      };
    case CLOSE_MODAL_INGREDIENT_DETAILS:
      return {
        ...state,
        isModalActive: false,
        ingredient: {},
      };
    default: {
      return state;
    }
  }
};
