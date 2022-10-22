import { configureStore } from "@reduxjs/toolkit";
import { workModeReducer } from "./slices/workModeSlice";
import { statusesReducer } from "./slices/statusesSlice";
import { invoicesReducer } from "./slices/invoicesSlice";
import { termsReducer } from "./slices/termsSlice";

export const store = configureStore({
    reducer: {
        workMode: workModeReducer,
        statuses: statusesReducer,
        invoices: invoicesReducer,
        terms: termsReducer
    },
    devTools: true,
    middleware: (getDeafaultMiddlware) => getDeafaultMiddlware(),
    enhancers: []
});