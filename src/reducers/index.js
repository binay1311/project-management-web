import {combineReducers} from "redux";
import loggedUser from "./securityReducer";

const rootReducer = combineReducers({
    security: loggedUser
});

export default rootReducer;