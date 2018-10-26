import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from "react-router-redux";
import { todoReducer } from "./reducers/Todo";
import { userReducer } from "./reducers/User";


export default function createStore(history) {
  const store = reduxCreateStore(
    combineReducers({
      todo: todoReducer,
      user: userReducer,
      router: routerReducer,
    }),
    applyMiddleware(
      logger,
      thunk,
      routerMiddleware(history)
    )
  );

  return store;
}