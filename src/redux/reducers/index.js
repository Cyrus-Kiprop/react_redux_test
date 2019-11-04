import { combineReducers } from "redux";

import { courseReducer } from "./courseReducer";
import { authorReducer } from "./authorReducer";

const rootReducer = combineReducers({
  courses: courseReducer,
  authors: authorReducer
});

export default rootReducer;
