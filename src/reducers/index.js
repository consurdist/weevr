import { combineReducers } from "redux";
import authReducer from "./auth.Reducer";
import errorReducer from "./errors.Reducer";
import sessionReducer from "./session.Reducer";
import entryReducer from "./entry.Reducer";

// import tensorflowReducer from "./tensorflowReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    session: sessionReducer,
    entry: entryReducer,
    // tensorflow: tensorflowReducer
});