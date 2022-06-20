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
		function sort(state: DnsState) {
			state.entries = [...state.entries.sort((a, b) => [...a.host].reverse().join("").localeCompare([b.host].reverse().join("")))];
		}

		builder.addCase(getEntries.fulfilled, (state, action) => {
			state.entries = action.payload;
			sort(state);
		});

		builder.addCase(addEntry.fulfilled, (state, action) => {
			state.entries.push(action.payload);
			sort(state);
		});

		builder.addCase(deleteEntry.fulfilled, (state, action) => {
			state.entries = state.entries.filter((entry) => entry.host !== action.meta.arg);
			sort(state);
		});
	},
});

export const dnsReducer = slice.reducer;
