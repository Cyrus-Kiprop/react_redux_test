import * as types from "../actions/actionTypes";
// import some apis from the api folder
import * as coursesApi from "../../api/courseApi";
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
export const saveCourse = course => (dispatch, getState) => {
  return coursesApi
    .saveCourse(course) //call the api request with the course objects
    .then(savedCourse => {
      course.id
        ? dispatch(updatedCourseSuccess(savedCourse))
        : dispatch(createCoursesSuccess(savedCourse));
    })
    .catch(err => {
      throw err;
    });
};

// export function saveCourse(course) {
//   return function(dispatch) {
//     return coursesApi.saveCourse(course).then(savedCourse => {
//       course.id
//         ? dispatch(updatedCourseSuccess(savedCourse))
//         : dispatch(createCoursesSuccess(savedCourse));
//     });
//   };
// }
