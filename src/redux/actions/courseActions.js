import * as types from "../actions/actionTypes";
// import some apis from the api folder
import * as coursesApi from "../../api/courseApi";
// import { dispatch } from "rxjs/internal/observable/range";

export const createCourse = course => {
  return {
    type: types.CREATE_COURSE,
    course
  };
};

export const loadCourseSuccess = courses => {
  return { type: types.LOAD_COURSES_SUCCESS, courses }; // should always return a type and a payload
};

// Redux thunk for fetching data from the mockdatabase
export const loadCourses = () => {
  return dispatch => {
    return coursesApi
      .getCourses()
      .then(courses => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
};
