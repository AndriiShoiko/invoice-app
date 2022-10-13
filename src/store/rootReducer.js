import { combineReducers } from "redux";

import { workModeReducer } from "./workMode/workModeReducer";

export const rootReducer = combineReducers({
    workMode: workModeReducer
});