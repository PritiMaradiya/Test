

import { combineReducers } from "redux";
import postReducer from "./userReducer"

export default combineReducers({
    posts: postReducer
})
