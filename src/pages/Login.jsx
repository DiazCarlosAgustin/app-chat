import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login_user, loging_user_with_random_user } from "../actions/user";

import { Grid, Typography, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

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
		<div className="max-h-screen h-screen w-ful flex justify-center items-center align-middle dark:text-slate-50 text-gray-900 bg-slate-100 dark:bg-gray-900">
			<div className="w-auto h-auto p-9 max-w-sm rounded-md">
				<div className="py-4 text-center">
					<h3 className="text-3xl py-1">Welcome Back</h3>
					<h5>Enter your credentials to access your account</h5>
				</div>
				<form>
					<div className="py-3 text-center flex flex-col">
						<div className="py-3 w-full">
							<input
								type="text"
								id="username"
								className="dark:text-slate-50 text-gray-900 h-14 w-full rounded-lg px-2 border-2 dark:border-none dark:bg-gray-700"
								placeholder="Usuario"
								autoComplete="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="py-3 w-full">
							<input
								type="password"
								id="password"
								className="dark:text-slate-50 text-gray-900 h-14 w-full rounded-lg px-2 border-2 dark:border-none dark:bg-gray-700"
								placeholder="Password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="form_imput my-3">
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
						</div>
						<div className="form_imput">
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
						</div>
					</div>
				</form>
				<div className="text-center w-full">
					<p className="">
						Don't have an account?{" "}
						{
							<Link to="/register" className="link">
								Sing Up
							</Link>
						}
					</p>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.users.isAuthenticated,
		user: state.users.user,
	};
};

export default connect(mapStateToProps)(Login);
