import { configureStore } from "@reduxjs/toolkit";
import { workModeReducer } from "./slices/workModeSlice";
import { statusesReducer } from "./slices/statusesSlice";
import { invoicesReducer } from "./slices/invoicesSlice";

export const store = configureStore({
    reducer: {
        workMode: workModeReducer,
        statuses: statusesReducer,
        invoices: invoicesReducer
    },
    devTools: true,
    middleware: (getDeafaultMiddlware) => getDeafaultMiddlware(),
    enhancers: []
});