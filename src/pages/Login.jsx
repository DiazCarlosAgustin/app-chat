import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login_user } from "../actions/user";

import { Paper, Grid, Typography, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function Login({ dispatch }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);

		/* Dispatching the action `login_user` with the parameters `username` and `password` */
		await dispatch(login_user(username, password));
		setLoading(false);

		setUsername("");
		setPassword("");
		//window.location.href = "/";
	};

	if (localStorage.getItem("isAuthenticated") === "true") {
		window.location.href = "/";
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Grid
				container
				sx={{
					height: "100vh",
					maxHeight: "100vh",
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Grid
					item
					xs={12}
					md={4}
					lg={3}
					elevation={3}
					component={Paper}
					sx={{ padding: "25px" }}
					square={true}
				>
					<Grid item sx={{ padding: "10px 0", textAlign: "center" }}>
						<Typography variant="h3">Login</Typography>
					</Grid>
					<form>
						<Grid
							container
							sx={{
								padding: "10px 0",
								textAlign: "center",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<Grid
								item
								sx={{ padding: "10px 0", width: "100%" }}
							>
								<TextField
									sx={{ width: "100%" }}
									name="username"
									id="username"
									label="username"
									onChange={(e) =>
										setUsername(e.target.value)
									}
									value={username}
								/>
							</Grid>
							<Grid
								item
								sx={{ padding: "10px 0", width: "100%" }}
							>
								<TextField
									sx={{ width: "100%" }}
									type="password"
									name="password"
									id="password"
									label="password"
									autoComplete="current-password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									value={password}
								/>
							</Grid>
							<Grid item className="form_imput">
								<LoadingButton
									sx={{ width: "100%" }}
									size="medium"
									loading={loading}
									onClick={handleLogin}
									loadingIndicator="Loading…"
									variant="contained"
									type="submit"
								>
									Ingresar
								</LoadingButton>
							</Grid>
						</Grid>
					</form>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.users.isAuthenticated,
		user: state.users.user,
	};
};

export default connect(mapStateToProps)(Login);
