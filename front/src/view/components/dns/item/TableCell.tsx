import { TableCell, tableCellClasses, TableRow } from "@mui/material";
import { styled } from "@mui/styles";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));
