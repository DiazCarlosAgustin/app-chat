import axios from "axios";
import { ADD_USER, SET_USERS } from "./types";
import { server } from "../services/server";

export async function getUsers(id) {
	const req = await axios
		.get(`${server}/user/getChat?id=${id}`)
		.then((result) => result.data.result);

	return {
		type: SET_USERS,
		payload: req,
	};
}

export async function setContact(payload) {
	return {
		type: SET_USERS,
		payload: payload,
	};
}

export async function addContact(payload) {
	console.log(
		"🚀 ~ file: contacts.js ~ line 24 ~ addContact ~ payload",
		payload,
	);
	return {
		type: ADD_USER,
		payload: payload,
	};
}
