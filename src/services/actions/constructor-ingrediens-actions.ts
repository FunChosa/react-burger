import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  FILTER_INGREDIENTS,
  RESET_INGREDIENTS,
} from "../constants/constructor-ingrediens-constants";
import { IIngredientType } from "../../utils/types";
export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: IIngredientType;
  readonly key: string;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly itemType: string;
  readonly itemKey: string | undefined;
}

export interface IIncreaseCounter {
  readonly type: typeof INCREASE_COUNTER;
  readonly itemType: string;
  readonly itemId: string;
}

export interface IDecreaseCounter {
  readonly type: typeof DECREASE_COUNTER;
  readonly itemType: string;
  readonly itemId: string;
}

export interface IFilterIngredients {
  readonly type: typeof FILTER_INGREDIENTS;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export interface IResetIngredients {
  readonly type: typeof RESET_INGREDIENTS;
}

export type TConstructorIngredientsActions =
  | IAddIngredient
  | IDeleteIngredient
  | IIncreaseCounter
  | IDecreaseCounter
  | IFilterIngredients
  | IResetIngredients;

export const addIngredient = (): IAddIngredient => ({
  type: ADD_INGREDIENT,
  item: {
    _id: "",
    name: "",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
    key: "",
  },
  key: "",
});

export const deleteIngredient = (): IDeleteIngredient => ({
  type: DELETE_INGREDIENT,
  itemType: "",
  itemKey: "",
});

export const increaseCounter = (): IIncreaseCounter => ({
  type: INCREASE_COUNTER,
  itemType: "",
  itemId: "",
});

export const decreaseCounter = (): IDecreaseCounter => ({
  type: DECREASE_COUNTER,
  itemType: "",
  itemId: "",
});

export const filterIngredients = (): IFilterIngredients => ({
  type: FILTER_INGREDIENTS,
  dragIndex: 0,
  hoverIndex: 0,
});

export const resetIngredients = (): IResetIngredients => ({
  type: RESET_INGREDIENTS,
});
