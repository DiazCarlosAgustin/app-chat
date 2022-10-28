import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login_user, loging_user_with_random_user } from "../actions/user";

import { Paper, Grid, Typography, TextField, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function Login({ dispatch, isAuthenticated }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const login_random_user = async (e) => {
		e.preventDefault();
		setLoading(true);

		await dispatch(loging_user_with_random_user);

		setLoading(false);
	};

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
						<Typography variant="h4" sx={{ fontWeight: "bold" }}>
							Welcome Back
						</Typography>
						<p sx={{ fontWeight: "semibold" }}>
							Enter your credentials to access your account
						</p>
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
									autoComplete="username"
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
							<Grid item className="form_imput">
								<LoadingButton
									sx={{ width: "100%", margin: "10px 0" }}
									size="medium"
									loading={loading}
									onClick={login_random_user}
									loadingIndicator="Loading…"
									variant="text"
									type="button"
								>
									Sign in with Random User
								</LoadingButton>
							</Grid>
						</Grid>
					</form>
					<Grid item sx={{ textAlign: "center", width: "100%" }}>
						<Typography variant="text" className="">
							Don't have an account?{" "}
							{
								<Link to="/register" className="link">
									Sing Up
								</Link>
							}
						</Typography>
					</Grid>
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
