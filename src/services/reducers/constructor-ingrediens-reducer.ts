import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  FILTER_INGREDIENTS,
  RESET_INGREDIENTS,
} from "../constants/constructor-ingrediens-constants";
import { TConstructorIngredientsActions } from "../actions/constructor-ingrediens-actions";
import { IIngredientType } from "../../utils/types";

export type TConstructorIngrediensState = {
  ingredients: IIngredientType[];
  bun: IIngredientType;
  counts: {
    [key: string]: number;
  };
};

const constructorIngrediensInitialState: TConstructorIngrediensState = {
  ingredients: [],
  bun: {} as IIngredientType,
  counts: {},
};

export const constructorIngrediensReducer = (
  state = constructorIngrediensInitialState,
  action: TConstructorIngredientsActions
): TConstructorIngrediensState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const { type } = action.item;
      if (type === "bun") {
        return {
          ...state,
          bun: action.item,
        };
      } else {
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            { ...action.item, key: action.key },
          ],
        };
      }
    }
    case DELETE_INGREDIENT: {
      const { itemType, itemKey } = action;
      if (itemType !== "bun") {
        return {
          ...state,
          ingredients: state.ingredients.filter((item) => item.key !== itemKey),
        };
      } else {
        return state;
      }
    }
    case INCREASE_COUNTER: {
      const { itemType, itemId } = action;
      if (itemType !== "bun") {
        const counts = { ...state.counts };
        if (!counts[itemId]) {
          counts[itemId] = 1;
        } else {
          counts[itemId]++;
        }
        return {
          ...state,
          counts,
        };
      } else {
        return state;
      }
    }
    case DECREASE_COUNTER: {
      const { itemType, itemId } = action;
      if (itemType !== "bun") {
        const counts = { ...state.counts };
        if (counts[itemId] === 1) {
          delete counts[itemId];
        } else {
          counts[itemId]--;
        }
        return {
          ...state,
          counts,
        };
      } else {
        return state;
      }
    }
    case FILTER_INGREDIENTS: {
      const { dragIndex, hoverIndex } = action;
      const ingredients = [...state.ingredients];
      const dragItem = ingredients[dragIndex];
      ingredients.splice(dragIndex, 1);
      ingredients.splice(hoverIndex, 0, dragItem);
      return {
        ...state,
        ingredients,
      };
    }
    case RESET_INGREDIENTS: {
      return {
        ...state,
        ingredients: [],
        bun: {} as IIngredientType,
        counts: {},
      };
    }
    default:
      return state;
  }
};
