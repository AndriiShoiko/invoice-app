import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTerms } from "../../utils/mockApi";

const STATUS_LOADING = "loading";
const STATUS_IDLE = "idle";

export const loadTerms = createAsyncThunk(
    '@@terms/load-all',
    async () => {
        return getTerms();
    }
);

const termsSlice = createSlice({
    name: "@@terms",
    initialState: {
        entities: [],
        loading: STATUS_IDLE,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadTerms.fulfilled, (state, action) => {
                state.entities = action.payload;
            })
            .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
                state.loading = STATUS_LOADING;
                state.error = null;
            })
            .addMatcher((action) => action.type.endsWith('/rejected'), (state) => {
                state.loading = STATUS_IDLE;
                state.error = "Error while getting statuses from server";
            })
            .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
                state.loading = STATUS_IDLE;
            })
    }
});

export function statusesSelector(state) {
    return state.terms;
}

export const termsReducer = termsSlice.reducer;