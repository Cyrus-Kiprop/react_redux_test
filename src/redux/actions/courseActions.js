import * as types from "../actions/actionTypes";

export const createCourse = course => {
  return {
    type: types.CREATE_COURSE,
    course
  };
};
