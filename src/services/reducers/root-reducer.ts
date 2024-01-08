import { combineReducers } from "redux";
import { allIngredientsReducer } from "./all-ingredients-reducer";
import { constructorIngrediensReducer } from "./constructor-ingrediens-reducer";
import { orderDetailsReducer } from "./order-details-reducer";
import { userReducer } from "./user-reducer";
import { wsReducer } from "./ws-reducer";
import { wsReducerAuth } from "./ws-auth-redicer";

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  constructorIngrediens: constructorIngrediensReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  ws: wsReducer,
  wsAuth: wsReducerAuth,
});
