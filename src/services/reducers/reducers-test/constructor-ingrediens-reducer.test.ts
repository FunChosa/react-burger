import {
  constructorIngrediensReducer,
  TConstructorIngrediensState,
} from "../../reducers/constructor-ingrediens-reducer";
import * as actions from "../../actions/constructor-ingrediens-actions";
import { IIngredientType } from "../../../utils/types";
import {
  ADD_INGREDIENT,
  DECREASE_COUNTER,
  DELETE_INGREDIENT,
  FILTER_INGREDIENTS,
  INCREASE_COUNTER,
} from "../../constants/constructor-ingrediens-constants";

const initialState: TConstructorIngrediensState = {
  ingredients: [],
  bun: {} as IIngredientType,
  counts: {},
};

const bun_01: IIngredientType = {
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  name: "Флюоресцентная булка R2-D3",
  price: 988,
  proteins: 44,
  type: "bun",
  __v: 0,
  _id: "643d69a5c3f7b9001cfa093d",
  key: "0",
};
const sauce_04: IIngredientType = {
  calories: 14,
  carbohydrates: 11,
  fat: 22,
  image: "https://code.s3.yandex.net/react/code/sauce-04.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  name: "Соус фирменный Space Sauce",
  price: 80,
  proteins: 50,
  type: "sauce",
  __v: 0,
  _id: "643d69a5c3f7b9001cfa0943",
  key: "1",
};
const mineral_rings: IIngredientType = {
  calories: 986,
  carbohydrates: 609,
  fat: 689,
  image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
  image_large: "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
  image_mobile:
    "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
  name: "Хрустящие минеральные кольца",
  price: 300,
  proteins: 808,
  type: "main",
  __v: 0,
  _id: "643d69a5c3f7b9001cfa0946",
  key: "2",
};
const sp_1: IIngredientType = {
  calories: 77,
  carbohydrates: 55,
  fat: 5,
  image: "https://code.s3.yandex.net/react/code/sp_1.png",
  image_large: "https://code.s3.yandex.net/react/code/sp_1-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
  name: "Плоды Фалленианского дерева",
  price: 874,
  proteins: 20,
  type: "main",
  __v: 0,
  _id: "643d69a5c3f7b9001cfa0947",
  key: "3",
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
      item: bun_01,
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
      item: sauce_04,
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
    const state = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {},
    };
    const expectedState = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {},
    };
    const receivedState = constructorIngrediensReducer(state, action);
    expect(receivedState).toEqual(expectedState);
  });
  it("should handle DELETE_INGREDIENT action for not bun type", () => {
    const action = {
      type: DELETE_INGREDIENT,
      itemType: "sauce",
      itemKey: "1",
    };
    const state = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {},
    };
    const expectedState = {
      ingredients: [mineral_rings, sp_1],
      bun: bun_01,
      counts: {},
    };
    const receivedState = constructorIngrediensReducer(state, action);
    expect(receivedState).toEqual(expectedState);
  });
  it("should handle INCREASE_COUNTER action for bun type", () => {
    const action = {
      type: INCREASE_COUNTER,
      itemType: "bun",
      itemId: "643d69a5c3f7b9001cfa093d",
    };
    const state = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {
        "643d69a5c3f7b9001cfa0947": 1,
      },
    };
    const expectedState = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {
        "643d69a5c3f7b9001cfa0947": 1,
      },
    };
    const receivedState = constructorIngrediensReducer(state, action);
    expect(receivedState).toEqual(expectedState);
  });
  it("should handle INCREASE_COUNTER action for not bun type !count", () => {
    const action = {
      type: INCREASE_COUNTER,
      itemType: "sauce",
      itemId: "643d69a5c3f7b9001cfa0943",
    };
    const state = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {
        "643d69a5c3f7b9001cfa0947": 1,
      },
    };
    const expectedState = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {
        "643d69a5c3f7b9001cfa0947": 1,
        "643d69a5c3f7b9001cfa0943": 1,
      },
    };
    const receivedState = constructorIngrediensReducer(state, action);
    expect(receivedState).toEqual(expectedState);
  });
  it("should handle INCREASE_COUNTER action for not bun type count > 1", () => {
    const action = {
      type: INCREASE_COUNTER,
      itemType: "sauce",
      itemId: "643d69a5c3f7b9001cfa0943",
    };
    const state = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {
        "643d69a5c3f7b9001cfa0947": 1,
        "643d69a5c3f7b9001cfa0943": 1,
      },
    };
    const expectedState = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {
        "643d69a5c3f7b9001cfa0947": 1,
        "643d69a5c3f7b9001cfa0943": 2,
      },
    };
    const receivedState = constructorIngrediensReducer(state, action);
    expect(receivedState).toEqual(expectedState);
  });
  it("should handle DECREASE_COUNTER action for bun type", () => {
    const action = {
      type: DECREASE_COUNTER,
      itemType: "bun",
      itemId: "643d69a5c3f7b9001cfa093d",
    };
    const state = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {
        "643d69a5c3f7b9001cfa0947": 1,
      },
    };
    const expectedState = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {
        "643d69a5c3f7b9001cfa0947": 1,
      },
    };
    const receivedState = constructorIngrediensReducer(state, action);
    expect(receivedState).toEqual(expectedState);
  });
  it("should handle DECREASE_COUNTER action for not bun type count > 2", () => {
    const action = {
      type: DECREASE_COUNTER,
      itemType: "sauce",
      itemId: "643d69a5c3f7b9001cfa0943",
    };
    const state = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {
        "643d69a5c3f7b9001cfa0943": 2,
      },
    };
    const expectedState = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {
        "643d69a5c3f7b9001cfa0943": 1,
      },
    };
    const receivedState = constructorIngrediensReducer(state, action);
    expect(receivedState).toEqual(expectedState);
  });
  it("should handle DECREASE_COUNTER action for not bun type count = 1", () => {
    const action = {
      type: DECREASE_COUNTER,
      itemType: "sauce",
      itemId: "643d69a5c3f7b9001cfa0943",
    };
    const state = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {
        "643d69a5c3f7b9001cfa0943": 1,
      },
    };
    const expectedState = {
      ingredients: [sauce_04, mineral_rings, sp_1],
      bun: bun_01,
      counts: {},
    };
    const receivedState = constructorIngrediensReducer(state, action);
    expect(receivedState).toEqual(expectedState);
  });
  it("should handle FILTER_INGREDIENTS action", () => {
    const action = {
      type: FILTER_INGREDIENTS,
      dragIndex: 2,
      hoverIndex: 3,
    };
    const state = {
      ingredients: [sauce_04, mineral_rings, mineral_rings, sp_1],
      bun: bun_01,
      counts: {},
    };
    const expectedState = {
      ingredients: [sauce_04, mineral_rings, sp_1, mineral_rings],
      bun: bun_01,
      counts: {},
    };
    const receivedState = constructorIngrediensReducer(state, action);
    expect(receivedState).toEqual(expectedState);
  });
  it("should handle RESET_INGREDIENTS action", () => {
    expect(
      constructorIngrediensReducer(undefined, actions.resetIngredients())
    ).toEqual(initialState);
  });
});
