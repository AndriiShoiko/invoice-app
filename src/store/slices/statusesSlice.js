import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpointStatuses } from "../../utils/mockApi";

const STATUS_LOADING = "loading";
const STATUS_IDLE = "idle";

async function getStatuses() {
    const res = await axios(endpointStatuses);
    const data = await res.data;
    return data;
}

export const loadStatuses = createAsyncThunk(
    '@@statuses/load-all',
    async () => {
        return getStatuses();
    }
);

const statusesSlice = createSlice({
    name: "@@statuses",
    initialState: {
        entities: [],
        selected: [],
        loading: STATUS_IDLE,
        error: null,
    },
    reducers: {
        toggleSelectedStatus: (state, action) => {
            const index = state.selected.findIndex(el => el === action.payload);
            if(index !== -1) {
                state.selected = state.selected.filter(f => f !== action.payload);
            } else{
                state.selected.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadStatuses.fulfilled, (state, action) => {
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
    return state.statuses;
}

export const {toggleSelectedStatus} = statusesSlice.actions;

export const statusesReducer = statusesSlice.reducer;