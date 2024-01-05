// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose } from "redux";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers/root-reducer";
import { WS_URL, WS_URL_USER } from "./utils/data";
import { wsActions } from "./services/actions/ws-actions";
import { wsActionsAuth } from "./services/actions/ws-auth-actions";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(WS_URL, wsActions, false),
    socketMiddleware(WS_URL_USER, wsActionsAuth, true)
  )
);
const store = createStore(rootReducer, enhancer);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
