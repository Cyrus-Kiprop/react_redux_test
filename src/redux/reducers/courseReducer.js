// importing types
// import { CREATE_COURSE } from "../actions/actionTypes"
import * as types from "../actions/actionTypes";

export const courseReducer = (state = [], action) => {
  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, { ...action.course }];
    default:
      return state;
  }
};
