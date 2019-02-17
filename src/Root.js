import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default ({ children }) => {
  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
  return <Provider store={store}>{children}</Provider>;
};
