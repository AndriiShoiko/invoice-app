import { combineReducers } from "redux";

import { workModeReducer } from "./WorkMode/WorkModeReducer";

export const rootReducer = combineReducers({
    workMode: workModeReducer
});