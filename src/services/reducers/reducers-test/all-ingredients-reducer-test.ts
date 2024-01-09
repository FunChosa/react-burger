import { allIngredientsReducer } from "../all-ingredients-reducer";
import * as actions from "../../actions/all-ingredients-actions";

describe("allIngredientsReducer", () => {
  it("should return the initial state", () => {
    expect(
      allIngredientsReducer(undefined, {} as actions.TAllIngredientsActions)
    ).toEqual({
      allIngredients: [],
      allIngredientsRequest: false,
      allIngredientsFailed: false,
    });
  });

  it("should handle GET_DATA_REQUEST", () => {
    expect(
      allIngredientsReducer(undefined, actions.getIngredientsRequest())
    ).toEqual({
      allIngredients: [],
      allIngredientsRequest: true,
      allIngredientsFailed: false,
    });
  });
  it("should handle GET_DATA_SUCCESS", () => {
    expect(
      allIngredientsReducer(undefined, actions.getIngredientsSuccess([]))
    ).toEqual({
      allIngredients: [],
      allIngredientsRequest: false,
      allIngredientsFailed: false,
    });
  });
  it("should handle GET_DATA_ERROR", () => {
    expect(
      allIngredientsReducer(undefined, actions.getIngredientsError())
    ).toEqual({
      allIngredients: [],
      allIngredientsRequest: false,
      allIngredientsFailed: true,
    });
  });
});
