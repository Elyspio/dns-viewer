import {
	Box,
	Button,
	Card,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import "./Test.scss";
import * as React from "react";
import { useCallback, useEffect, useMemo } from "react";
import { DnsItem } from "./item/DnsItem";
import { useAppDispatch, useAppSelector } from "../../../store";
import { bindActionCreators } from "redux";
import { addEntry, getEntries } from "../../../store/module/dns/dns.actions";
import { Add } from "@mui/icons-material";
import { useModal } from "../../hooks/useModal";

export const Dns = () => {
	const headColor = useAppSelector((state) => (state.theme.current === "dark" ? "#000" : "#d8fafd"));

	const entries = useAppSelector((state) => state.dns.entries);

	const dispatch = useAppDispatch();
	const actions = useMemo(
		() =>
			bindActionCreators(
				{
					getEntries,
					addEntry,
				},
				dispatch
			),
		[dispatch]
	);

	useEffect(() => {
		actions.getEntries();
	}, [actions]);

	const [host, setHost] = React.useState("");
	const [ip, setIp] = React.useState("");

	const { open, setOpen, setClose } = useModal(false);

	const add = useCallback(async () => {
		setClose();
		await actions.addEntry({ ip, host });
		setHost("");
	}, [actions, ip, setClose]);

	const isIpValid = useMemo(() => /[1-9]\d{0,2}.[1-9]\d{0,2}.[1-9]\d{0,2}.[1-9]\d{0,2}/.test(ip), [ip]);

	return (
		<Container className={"Dns"}>
			<Paper>
				<Grid container spacing={2} justifyContent={"space-between"} alignItems={"center"} px={4}>
					<Grid item>
						<Typography variant={"overline"}>Dns entries</Typography>
					</Grid>

					<Grid item>
						<IconButton color={"primary"} onClick={setOpen}>
							<Add />
						</IconButton>
					</Grid>
				</Grid>

				<Box padding={4}>
					<TableContainer component={Card}>
						<Table aria-label="simple table">
							<TableHead sx={{ backgroundColor: headColor, fontWeight: "bold" }}>
								<TableRow>
									<TableCell>
										<Typography variant={"overline"}>Host</Typography>
									</TableCell>
									<TableCell align="right">
										<Typography variant={"overline"}>IP</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{entries.map((entry) => (
									<DnsItem data={entry} key={entry.host} />
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Paper>

			<Dialog open={open} onClose={setClose}>
				<DialogTitle>Add a new DNS entry</DialogTitle>
				<DialogContent>
					<Box p={1} mx={1}>
						<TextField autoFocus id="dns-set-host" label="Host" fullWidth variant="standard" value={host} onChange={(e) => setHost(e.target.value)} />
					</Box>

					<Box p={1} mx={1} mt={3}>
						<TextField id="dns-set-ip" label="IP" fullWidth variant="standard" error={!isIpValid} value={ip} onChange={(e) => setIp(e.target.value)} />
					</Box>
				</DialogContent>
				<DialogActions>
					<Button color={"inherit"} onClick={setClose}>
						Cancel
					</Button>
					<Button color={"primary"} onClick={add}>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};
