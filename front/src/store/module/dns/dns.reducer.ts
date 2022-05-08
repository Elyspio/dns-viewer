import { createSlice } from "@reduxjs/toolkit";
import { DnsEntry } from "../../../core/apis/backend/generated";
import { addEntry, deleteEntry, getEntries } from "./dns.actions";

export type DnsState = {
	entries: DnsEntry[];
};

const initialState: DnsState = {
	entries: [],
};

const slice = createSlice({
	name: "dns",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getEntries.fulfilled, (state, action) => {
			state.entries = action.payload;
		});

		builder.addCase(addEntry.fulfilled, (state, action) => {
			state.entries.push(action.payload);
		});

		builder.addCase(deleteEntry.fulfilled, (state, action) => {
			state.entries = state.entries.filter((entry) => entry.host !== action.meta.arg);
		});
	},
});

export const dnsReducer = slice.reducer;
