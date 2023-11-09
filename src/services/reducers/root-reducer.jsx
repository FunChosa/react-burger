import { combineReducers } from "redux";
import { allIngredientsReducer } from "./all-ingredients-reducer";
import { constructorIngrediensReducer } from "./constructor-ingrediens-reducer";
import { ingredientDetailsReducer } from "./ingredient-details-reducer";
import { orderDetailsReducer } from "./order-details-reducer";

const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  constructorIngrediens: constructorIngrediensReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
});

export default rootReducer;
