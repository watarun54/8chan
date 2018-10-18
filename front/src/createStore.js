import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import { todoReducer } from "./reducers/Todo";

export default function createStore() {
  const store = reduxCreateStore(
    combineReducers({
      todo: todoReducer,
    }),
    applyMiddleware(
      logger,
      thunk
    )
  );

  return store;
}