import * as React from "react";
import "./Application.scss";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import { Dns } from "./dns/Dns";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleTheme } from "../../store/module/theme/theme.action";
import { createDrawerAction, withDrawer } from "./utils/drawer/Drawer.hoc";
import { Box } from "@mui/material";
import { login, logout } from "../../store/module/authentication/authentication.action";
import { Login, Logout } from "@mui/icons-material";
import { bindActionCreators } from "redux";
import { RequireLogin } from "./utils/login/RequireLogin";

function Application() {
	const dispatch = useAppDispatch();

	const { theme, themeIcon, logged } = useAppSelector((s) => ({
		theme: s.theme.current,
		themeIcon: s.theme.current === "dark" ? <Brightness5Icon /> : <Brightness3Icon />,
		logged: s.authentication.logged,
	}));

	const storeActions = React.useMemo(
		() =>
			bindActionCreators(
				{
					toggleTheme,
					logout,
					login,
				},
				dispatch
			),
		[dispatch]
	);

	const actions = [
		createDrawerAction(theme === "dark" ? "Light Mode" : "Dark Mode", {
			icon: themeIcon,
			onClick: storeActions.toggleTheme,
		}),
	];

	if (logged) {
		actions.push(
			createDrawerAction("Logout", {
				icon: <Logout fill={"currentColor"} />,
				onClick: storeActions.logout,
			})
		);
	} else {
		actions.push(
			createDrawerAction("Login", {
				icon: <Login fill={"currentColor"} />,
				onClick: storeActions.login,
			})
		);
	}

	const drawer = withDrawer({
		component: logged ? <Dns /> : <RequireLogin />,
		actions,
		title: "Dns",
	});

	return (
		<Box className={"Application"} bgcolor={"background.default"}>
			{drawer}
		</Box>
	);
}

export default Application;
