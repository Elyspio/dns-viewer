import { Box, Card, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import "./Test.scss";
import * as React from "react";
import { useEffect } from "react";
import { DnsItem } from "./item/DnsItem";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getEntries } from "../../../store/module/dns/dns.actions";
import { Add } from "@mui/icons-material";
import { useModal } from "../../hooks/useModal";
import { AddEntry } from "./add/AddEntry";

export const Dns = () => {
	const headColor = useAppSelector((state) => (state.theme.current === "dark" ? "#000" : "#d8fafd"));

	const entries = useAppSelector((state) => state.dns.entries);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getEntries());
	}, [dispatch]);

	const { open, setOpen, setClose } = useModal(false);

	return (
		<Container className={"Dns"}>
			<Paper elevation={2}>
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
								{entries.map((entry, i) => (
									<DnsItem data={entry} key={entry.host} odd={i % 2 !== 0} />
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>

				{open && <AddEntry close={setClose} />}
			</Paper>
		</Container>
	);
};
