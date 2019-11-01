import { createStore, applyMiddleware, compose } from "redux"; //create the store
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for redux dev tools
  return createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
