import React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { bindActionCreators } from "redux";
import { login, silentLogin } from "../../../../store/module/authentication/authentication.action";
import { useAppDispatch } from "../../../../store";

export function RequireLogin() {
	const dispatch = useAppDispatch();
	const storeActions = React.useMemo(() => bindActionCreators({ login, silentLogin }, dispatch), [dispatch]);

	React.useEffect(() => {
		storeActions.silentLogin();
	}, [storeActions]);

	return (
		<Paper>
			<Grid container direction={"column"} p={4} alignItems={"center"}>
				<Grid>
					<Typography variant={"h6"}>You must be logged in to view this page</Typography>
				</Grid>
				<Grid item mt={2}>
					<Button variant={"outlined"} onClick={storeActions.login}>
						Login
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
}
