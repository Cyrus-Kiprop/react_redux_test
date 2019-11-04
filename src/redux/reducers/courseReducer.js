// importing types
// import { CREATE_COURSE } from "../actions/actionTypes"
import * as types from "../actions/actionTypes";
import initialState from "../reducers/initialState";

export const courseReducer = (state = initialState.courses, action) => {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.UPDATE_COURSE_SUCCESS:
      return state.courses.map(course =>
        course.id === action.course.id ? action.course : course
      );
    default:
      return state;
  }
};
