import axios from "axios";
import { LOGIN_USER, LOGOUT_USER, ADD_NEW_ALERT } from "./types";
import { server } from "../services/server";
import { add_new_alert } from "./alerts.js";

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
	await add_new_alert({
		vertical: "buttom",
		horizontal: "center",
		variant: "filled",
		severity: "success",
		isOpen: true,
		message: "Se ingreso correctamente.",
	});
	return {
		type: LOGIN_USER,
		payload: {
			isAuthenticated: !!req.data.user,
			user: req.data.user,
			token: req.token,
		},
	};
}

export async function loging_user_with_random_user() {
	const user = await axios
		.get("https://randomuser.me/api/")
		.then((result) => result.data.results[0])
		.catch((err) => {
			console.error(err);
		});

	const validUser = await axios
		.get(`${server}/user/validuser?email=${user.email}`)
		.then((result) => result.data.result)
		.catch((err) => {
			console.error(err);
		});

	const jsonUser = {
		email: user.email,
		password: user.login.password,
		username: user.login.username,
		image: user.picture.medium,
	};

	if (validUser !== null) {
	} else {
		await register(jsonUser);
	}
}

export async function register(payload) {
	try {
		const req = await axios
			.post(`${server}/auth/register`, payload, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((result) => result?.data)
			.catch((error) => {
				return error;
			});
		if (req.user) {
			await login_user(payload.username, payload.password);
		}
	} catch (error) {
		console.error(error);
	}
}

export async function logout_user(id) {
	const result = await axios
		.post(`${server}/auth/logout`, { id: id })
		.then((res) => res.data)
		.catch((error) => {
			console.error(error);
		});

	if (!result.error) {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		localStorage.removeItem("isAuthenticated");

		return {
			type: LOGOUT_USER,
		};
	}
	return;
}
