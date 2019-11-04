import * as types from "../actions/actionTypes";
// import some apis from the api folder
import * as authorsApi from "../../api/authorApi";
// import { dispatch } from "rxjs/internal/observable/range";

export const loadAuthorsSuccess = authors => {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors }; // should always return a type and a payload
};

// Redux thunk for fetching data from the mockdatabase
export const loadAuthors = () => {
  return dispatch => {
    return authorsApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        throw error;
      });
  };
};
