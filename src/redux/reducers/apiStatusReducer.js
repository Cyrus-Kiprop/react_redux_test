import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

//  Reducer function always takes in an initial state and an action
export default function(state = initialState.apiCallsInProgress, action) {
  if (action.type === types.BEGIN_API_CALL) {
    state + 1;
  } else if (actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
