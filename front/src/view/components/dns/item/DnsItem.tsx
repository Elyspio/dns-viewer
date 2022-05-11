import React, { useCallback, useMemo } from "react";
import { DnsEntry } from "../../../../core/apis/backend/generated";
import { Menu, MenuItem, Typography } from "@mui/material";
import { useMenu } from "../../../hooks/useMenu";
import { useAppDispatch } from "../../../../store";
import { bindActionCreators } from "redux";
import { deleteEntry } from "../../../../store/module/dns/dns.actions";
import { StyledTableCell, StyledTableRow } from "./TableCell";

// DnsItem Props
interface TodoItemProps {
	data: DnsEntry;
}

export function DnsItem({ data }: TodoItemProps) {
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

	return (
		<>
			<Menu open={menuOpen} onClose={closeMenu} anchorReference="anchorPosition" anchorPosition={position}>
				<MenuItem color={"error"} onClick={remove}>
					Delete
				</MenuItem>
			</Menu>

			<StyledTableRow onContextMenu={onContextMenu}>
				<StyledTableCell scope="row">
					<Typography>{data.host}</Typography>
				</StyledTableCell>
				<StyledTableCell align="right">
					<Typography>{data.ip}</Typography>
				</StyledTableCell>
			</StyledTableRow>
		</>
	);
}
