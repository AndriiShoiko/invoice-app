import { configureStore } from "@reduxjs/toolkit";
import { workModeReducer } from "./slices/workModeSlice";

export const store = configureStore({
    reducer: {
        workMode: workModeReducer
    },
    devTools: true,
    middleware: (getDeafaultMiddlware) => getDeafaultMiddlware(),
    enhancers: []
});