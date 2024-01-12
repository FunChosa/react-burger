import {
  allIngredientsReducer,
  TAllIngredientsState,
} from "../all-ingredients-reducer";
import * as actions from "../../actions/all-ingredients-actions";

const initialState: TAllIngredientsState = {
  allIngredients: [],
  allIngredientsRequest: false,
  allIngredientsFailed: false,
};

describe("allIngredientsReducer", () => {
  it("should return the initial state of allIngredients", () => {
    expect(
      allIngredientsReducer(undefined, {} as actions.TAllIngredientsActions)
    ).toEqual(initialState);
  });

  it("should handle GET_DATA_REQUEST action", () => {
    expect(
      allIngredientsReducer(undefined, actions.getIngredientsRequest())
    ).toEqual({
      ...initialState,
      allIngredientsRequest: true,
    });
  });
  it("should handle GET_DATA_SUCCESS action", () => {
    expect(
      allIngredientsReducer(undefined, actions.getIngredientsSuccess([]))
    ).toEqual({
      ...initialState,
      allIngredients: [],
      allIngredientsRequest: false,
      allIngredientsFailed: false,
    });
  });
  it("should handle GET_DATA_ERROR action", () => {
    expect(
      allIngredientsReducer(undefined, actions.getIngredientsError())
    ).toEqual({
      ...initialState,
      allIngredientsRequest: false,
      allIngredientsFailed: true,
    });
  });
});
