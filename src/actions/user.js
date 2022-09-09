import axios from "axios";
import { LOGIN_USER, LOGOUT_USER } from "./types";
import { server } from "../services/server";

export async function login_user(username, password) {
	const req = await axios
		.post(
			`${server}/auth/login`,
			{
				username: username,
				password: password,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		)
		.then((result) => result.data);

	if (req.data.user) {
		localStorage.setItem("user", JSON.stringify(req.data.user));
		localStorage.setItem("token", JSON.stringify(req.token));
		localStorage.setItem(
			"isAuthenticated",
			JSON.stringify(!!req.data.user),
		);
	}
	return {
		type: LOGIN_USER,
		payload: {
			isAuthenticated: !!req.data.user,
			user: req.data.user,
			token: req.token,
		},
	};
}

export default function logout_user() {
	localStorage.removeItem("user");
	localStorage.removeItem("token");
	localStorage.removeItem("isAuthenticated");

	return {
		type: LOGOUT_USER,
	};
}
