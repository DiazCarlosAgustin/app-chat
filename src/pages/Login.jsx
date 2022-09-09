import React, { useState } from "react";
import { connect } from "react-redux";
import { login_user } from "../actions/user";
import { Navigate, useLocation } from "react-router-dom";
function Login({ dispatch, isAuthenticated }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const location = useLocation();

	const handleLogin = async (e) => {
		e.preventDefault();

		dispatch(login_user(username, password));

		setUsername("");
		setPassword("");

		if (isAuthenticated === "true" || isAuthenticated === true) {
			console.log("entre ql");
			window.location.href = "/";
		}
	};
	if (isAuthenticated === "true" || isAuthenticated === true) {
		console.log("entre ql");
		window.location.href = "/";
	}
	return (
		<div className="login_main">
			<div className="login_form">
				<div className="login_head">
					<span className="titulo">Login</span>
				</div>
				<form className="login_form_">
					<div className="form_imput">
						<label htmlFor="username" className="label_form">
							Username
						</label>
						<input
							type="text"
							name="username"
							id="username"
							className="input_form"
							autoComplete="username"
							onChange={(e) => setUsername(e.target.value)}
							value={username}
						/>
					</div>
					<div className="form_imput">
						<label htmlFor="password" className="label_form">
							password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className="input_form"
							autoComplete="current-password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</div>
					<div className="form_imput">
						<button onClick={handleLogin} type="submit">
							Ingresar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.users.isAuthenticated,
	};
};

export default connect(mapStateToProps)(Login);
