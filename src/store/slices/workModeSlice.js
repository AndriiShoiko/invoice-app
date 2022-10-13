import { createSlice } from "@reduxjs/toolkit";

export const DARK_MODE = "DARK_MODE";
export const DAY_MODE = "DAY_MODE";

const workModeSlice = createSlice({
    name: "@@workMode",
    initialState: DAY_MODE,
    reducers: {
        toggleMode: (state) => {
            if (state === DAY_MODE) {
                return DARK_MODE;
            } else {
                return DAY_MODE;
            }
        }
    }
});

export function workModeSelector(state) {
    return state.workMode;
}

export const {toggleMode} = workModeSlice.actions;
export const workModeReducer = workModeSlice.reducer;