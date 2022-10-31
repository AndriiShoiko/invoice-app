import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInvoices, getInvoiceById, putInvoiceById, postInvoice } from "../../utils/mockApi";

export const STATUS_LOADING = "loading";
export const STATUS_IDLE = "idle";

async function getSelectedStatuses(state) {

    let arrSelectedStatuses = [];
    const selected = state.statuses.selected;
    const allStatuses = state.statuses.entities;

    selected.forEach(id => {
        const index = allStatuses.findIndex(el => el.id === id);
        arrSelectedStatuses.push(allStatuses[index].status.toLowerCase());
    });

    return arrSelectedStatuses;
}

export const loadInvoices = createAsyncThunk(
    '@@invoices/load-all',
    async () => {
        return getInvoices();
    }
);

export const loadInvoicesByFilters = createAsyncThunk(
    '@@invoices/load-by-filters',
    async (_, { getState }) => {
        //This logic must be on the server!!!
        let resultInvoices = [];

        const statuses = await getSelectedStatuses(getState());
        const invoicesServer = await getInvoices();

        if (!statuses.length) {
            return invoicesServer;
        }

        invoicesServer.forEach((el) => {
            const findIndex = statuses.findIndex(st => st === el.status);
            if (findIndex !== -1) {
                resultInvoices.push(el);
            }
        });

        return resultInvoices;
    }
);

export const loadInvoiceById = createAsyncThunk(
    '@@invoices/load-by-id',
    async (id) => {
        return getInvoiceById(id);
    }
);

export const updateInvoiceById = createAsyncThunk(
    '@@invoices/update-by-id',
    async (props) => {
        return putInvoiceById(props.id, props.data);
    }
);

export const addInvoice = createAsyncThunk(
    '@@invoices/add',
    async (data) => {
        return postInvoice(data);
    }
);

const statusesSlice = createSlice({
    name: "@@invoices",
    initialState: {
        entities: [],
        loading: STATUS_IDLE,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadInvoices.fulfilled, (state, action) => {
                state.entities = action.payload;
            })
            .addCase(loadInvoicesByFilters.fulfilled, (state, action) => {
                state.entities = action.payload;
            })
            .addCase(loadInvoiceById.fulfilled, (state, action) => {
                const id = action.payload.id;
                const findIndex = state.entities.findIndex(ent => ent.id === id);
                if (findIndex === -1) {
                    state.entities.push(action.payload);
                } else {
                    state.entities[findIndex] = action.payload;
                }
            })
            .addCase(updateInvoiceById.fulfilled, (state, action) => {
                const id = action.payload.id;
                const findIndex = state.entities.findIndex(ent => ent.id === id);
                if (findIndex === -1) {
                    state.entities.push(action.payload);
                } else {
                    state.entities[findIndex] = action.payload;
                }
            })
            .addCase(addInvoice.fulfilled, (state, action) => {
                state.entities.push(action.payload);
            })
            .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
                state.loading = STATUS_LOADING;
                state.error = null;
            })
            .addMatcher((action) => action.type.endsWith('/rejected'), (state) => {
                state.loading = STATUS_IDLE;
                state.error = "Error while getting or update invoices from server";
            })
            .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
                state.loading = STATUS_IDLE;
                state.error = null;
            })
    }
});

export function invoicesSelector(state) {
    return state.invoices;
}

export function invoicesIsErrorSelector(state) {
    return state.invoices.error !== null;
}

export function invoicesSelectorById(state, id) {

    const findIndex = state.invoices.entities.findIndex(ent => ent.id === id);
    if (findIndex !== -1) {
        return state.invoices.entities[findIndex];
    }

    return null;
}

export const invoicesReducer = statusesSlice.reducer;