import * as React from "react";
import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { addEntry } from "../../../../store/module/dns/dns.actions";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DnsService } from "../../../../core/services/dns.service";
import { useInjection } from "inversify-react";

type AddEntryProps = {
	close: () => void;
	defaultIp?: string;
	defaultHost?: string;
};

export const AddEntry = ({ close, defaultHost = "", defaultIp = "" }: AddEntryProps) => {
	const [host, setHost] = React.useState(defaultHost);
	const [ip, setIp] = React.useState(defaultIp);

	const dnsService = useInjection(DnsService);

	const isIpValid = useMemo(() => dnsService.isIpValid(ip), [ip, dnsService]);

	const entries = useAppSelector((state) => state.dns.entries);

	const ips = React.useMemo(() => {
		let all = entries.map((e) => e.ip);
		all = [...new Set(all)];
		all.sort();
		return all;
	}, [entries]);

	const dispatch = useAppDispatch();

	const add = useCallback(async () => {
		close();
		await dispatch(addEntry({ ip, host }));
		setHost("");
	}, [dispatch, ip, host, close]);

	return (
		<Dialog open={true} onClose={close}>
			<DialogTitle>Add a new DNS entry</DialogTitle>
			<DialogContent>
				<Box p={1} mx={1}>
					<TextField error={!host} autoFocus id="dns-set-host" label="Host" fullWidth variant="standard" value={host} onChange={(e) => setHost(e.target.value)} />
				</Box>

				<Box p={1} mx={1} mt={3}>
					<Autocomplete
						disableClearable
						id="dns-set-ip"
						onInputChange={(e, value) => setIp(value)}
						options={ips}
						freeSolo
						inputValue={ip}
						renderInput={(params) => <TextField {...params} error={!isIpValid} label="IP" />}
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button color={"inherit"} onClick={close}>
					Cancel
				</Button>
				<Button color={"primary"} disabled={!isIpValid} onClick={add}>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
};
