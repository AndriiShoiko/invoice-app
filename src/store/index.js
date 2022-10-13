import { configureStore } from "@reduxjs/toolkit";
import { workModeReducer } from "./slices/workModeSlice";
import {statusesReducer} from "./slices/statusesSlice";

export const store = configureStore({
    reducer: {
        workMode: workModeReducer,
        statuses: statusesReducer
    },
    devTools: true,
    middleware: (getDeafaultMiddlware) => getDeafaultMiddlware(),
    enhancers: []
});