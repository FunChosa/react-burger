import { combineReducers } from "redux";
import {
  allIngredientsReducer,
  TAllIngredientsState,
} from "./all-ingredients-reducer";
import {
  constructorIngrediensReducer,
  TConstructorIngrediensState,
} from "./constructor-ingrediens-reducer";
import {
  orderDetailsReducer,
  TOrderDetailsState,
} from "./order-details-reducer";
import { TUserState, userReducer } from "./user-reducer";
import { wsReducer } from "./ws-reducer";
import { wsReducerAuth } from "./ws-auth-redicer";
import { TWSActionActions } from "../actions/ws-actions";
import { TWSActionsAuthActions } from "../actions/ws-auth-actions";

export type TRootState = {
  allIngredients: TAllIngredientsState;
  constructorIngrediens: TConstructorIngrediensState;
  orderDetails: TOrderDetailsState;
  user: TUserState;
  ws: TWSActionActions;
  wsAuth: TWSActionsAuthActions;
};

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  constructorIngrediens: constructorIngrediensReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  ws: wsReducer,
  wsAuth: wsReducerAuth,
});
