import * as types from "../actions/actionTypes";
// import some apis from the api folder
import * as coursesApi from "../../api/courseApi";
import { beginApiCall } from "./apiStatusActions";

// import { dispatch } from "rxjs/internal/observable/range";

// Actions

export const loadCourseSuccess = courses => {
  return { type: types.LOAD_COURSES_SUCCESS, courses }; // should always return a type and a payload
};

export const updatedCourseSuccess = course => {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
};

export const createCoursesSuccess = course => {
  return { type: types.CREATE_COURSE_SUCCESS, course };
};

// Redux thunk
// fetching data
export const loadCourses = () => {
  return dispatch => {
    dispatch(beginApiCall());
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

// aysnc writes
// the getState argument contains all the items in the state but not necessary to use
export const saveCourse = course => (dispatch, getState) => {
  dispatch(beginApiCall());

  coursesApi
    .saveCourse(course)
    .then(savedCourse => {
      savedCourse.id
        ? dispatch(updatedCourseSuccess(savedCourse))
        : dispatch(createCoursesSuccess(savedCourse));
    })
    .catch(err => {
      throw err;
    });
};
