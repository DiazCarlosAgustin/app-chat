import axios from "axios";
import { LOGIN_USER, LOGOUT_USER, ADD_NEW_ALERT } from "./types";
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
		.then((result) => result?.data)
		.catch((error) => {
			return error;
		});

	if (req.data?.user) {
		localStorage.setItem("user", JSON.stringify(req.data.user));
		localStorage.setItem("token", JSON.stringify(req.token));
		localStorage.setItem(
			"isAuthenticated",
			JSON.stringify(!!req.data.user),
		);
	} else {
		return {
			type: ADD_NEW_ALERT,
			payload: {
				vertical: "buttom",
				horizontal: "center",
				variant: "filled",
				severity: "error",
				isOpen: true,
				message: "El usuario o contraseña no existe.",
			},
		};
	}
	//En caso que ingrese correctamente.

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
