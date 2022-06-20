import React, { useCallback, useMemo, useState } from "react";
import { DnsEntry } from "../../../../core/apis/backend/generated";
import { Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useMenu } from "../../../hooks/useMenu";
import { useAppDispatch } from "../../../../store";
import { bindActionCreators } from "redux";
import { deleteEntry } from "../../../../store/module/dns/dns.actions";
import { StyledTableCell, StyledTableRow } from "./TableCell";
import { Add, Close } from "@mui/icons-material";
import { AddEntry } from "../add/AddEntry";
import { useTheme } from "@mui/styles";

// DnsItem Props
interface TodoItemProps {
	data: DnsEntry;
	odd: boolean;
}

export function DnsItem({ data, odd }: TodoItemProps) {
	const [newDefaultEntry, setNewDefaultEntry] = useState<DnsEntry>();

	const { open: menuOpen, closeMenu, onContextMenu, position } = useMenu();

	const dispatch = useAppDispatch();
	const actions = useMemo(
		() =>
			bindActionCreators(
				{
					deleteEntry,
				},
				dispatch
			),
		[dispatch]
	);

	const remove = useCallback(async () => {
		closeMenu();
		await actions.deleteEntry(data.host);
	}, [actions, data, closeMenu]);

	const addSubDomain = useCallback(() => {
		closeMenu();
		setNewDefaultEntry(data);
	}, [data, closeMenu]);

	const close = useCallback(() => setNewDefaultEntry(undefined), []);

	const theme = useTheme();

	return (
		<>
			<Menu open={menuOpen} onClose={closeMenu} anchorReference="anchorPosition" anchorPosition={position}>
				<MenuItem onClick={addSubDomain}>
					<Stack spacing={1} direction={"row"}>
						<Add color={"primary"} />
						<Typography>Add subdomain</Typography>
					</Stack>
				</MenuItem>
				<MenuItem onClick={remove}>
					<Stack spacing={1} direction={"row"}>
						<Close color={"error"} />
						<Typography>Delete</Typography>
					</Stack>
				</MenuItem>
			</Menu>

			<StyledTableRow
				onContextMenu={onContextMenu}
				sx={{
					backgroundColor: odd ? theme.palette.background.default : theme.palette.action.hover,
				}}
			>
				<StyledTableCell align="left">
					<Typography>{data.host}</Typography>
				</StyledTableCell>
				<StyledTableCell align="right">
					<Typography>{data.ip}</Typography>
				</StyledTableCell>
			</StyledTableRow>

			{newDefaultEntry && <AddEntry close={close} defaultHost={newDefaultEntry.host} defaultIp={newDefaultEntry.ip} />}
		</>
	);
}
