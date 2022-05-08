import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExtraArgument } from "../../index";
import { DnsService } from "../../../core/services/dns.service";
import { AddEntry } from "../../../core/apis/backend/generated";
import { toast } from "react-toastify";

export const getEntries = createAsyncThunk("item/getEntries", async (_, { extra }) => {
	const { container } = extra as ExtraArgument;
	const service = container.get(DnsService);
	return await toast.promise(service.list(), { pending: "Loading entries...", error: "Failed to load entries." });
});

export const addEntry = createAsyncThunk("item/addEntry", async ({ ip, host }: AddEntry, { extra }) => {
	const { container } = extra as ExtraArgument;
	const service = container.get(DnsService);
	return await toast.promise(service.add(host, ip), {
		error: "Failed to add entry",
		pending: "Adding entry...",
		success: "Entry added",
	});
});

export const deleteEntry = createAsyncThunk("item/deleteEntry", async (host: string, { extra }) => {
	const { container } = extra as ExtraArgument;
	const service = container.get(DnsService);
	return await toast.promise(service.delete(host), {
		error: `Failed to delete entry ${host}`,
		pending: "Deleting entry...",
	});
});
