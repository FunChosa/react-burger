import {
  constructorIngrediensReducer,
  TConstructorIngrediensState,
} from "../../reducers/constructor-ingrediens-reducer";
import * as actions from "../../actions/constructor-ingrediens-actions";
import { IIngredientType } from "../../../utils/types";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
} from "../../constants/constructor-ingrediens-constants";

const initialState: TConstructorIngrediensState = {
  ingredients: [],
  bun: {} as IIngredientType,
  counts: {},
};

const ingredientWithTypeBun = {
  _id: "60666c42cc7b410027a1a9b1",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
  key: "",
};

const ingredientWithTypeNotBun = {
  _id: "60666c42cc7b410027a1a9b7",
  name: "Соус Spicy-X",
  type: "sauce",
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: "https://code.s3.yandex.net/react/code/sauce-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
  __v: 0,
};

describe("constructorIngrediensReducer", () => {
  it("should return initial state of constructorIngrediensReducer", () => {
    expect(
      constructorIngrediensReducer(
        undefined,
        {} as actions.TConstructorIngredientsActions
      )
    ).toEqual(initialState);
  });

  it("should handle ADD_INGREDIENT action for bun type", () => {
    const action = {
      type: ADD_INGREDIENT,
      item: ingredientWithTypeBun,
      key: "",
    };
    const expectedState = {
      ...initialState,
      bun: action.item,
    };
    const receivedState = constructorIngrediensReducer(initialState, action);
    expect(receivedState).toEqual(expectedState);
  });
  it("should handle ADD_INGREDIENT action for not bun type", () => {
    const action = {
      type: ADD_INGREDIENT,
      item: ingredientWithTypeNotBun,
      key: "",
    };
    const expectedState = {
      ...initialState,
      ingredients: [
        ...initialState.ingredients,
        { ...action.item, key: action.key },
      ],
    };
    const receivedState = constructorIngrediensReducer(initialState, action);
    expect(receivedState).toEqual(expectedState);
  });
  it("should handle DELETE_INGREDIENT action for bun type", () => {
    const action = {
      type: DELETE_INGREDIENT,
      itemType: "bun",
      itemKey: "",
    };
    const expectedState = {
      ...initialState,
    };
    const receivedState = constructorIngrediensReducer(initialState, action);
    expect(receivedState).toEqual(expectedState);
  });
  it("should handle DELETE_INGREDIENT action for not bun type", () => {});
  it("should handle RESET_INGREDIENTS action", () => {
    expect(
      constructorIngrediensReducer(undefined, actions.resetIngredients())
    ).toEqual(initialState);
  });
});
