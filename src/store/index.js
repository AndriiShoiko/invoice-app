import { legacy_createStore } from "redux";
import { rootReducer } from "./rootReducer";
import {DAY_MODE} from "./workMode/workModeConst";

const initState = {
    workMode: DAY_MODE
};

export const store = legacy_createStore(rootReducer,
    initState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());