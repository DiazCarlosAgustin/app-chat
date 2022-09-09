import axios from "axios";
import { GET_USERS } from "./types";
import { server } from "../services/server";

export async function getUsers(id) {
	const req = await axios
		.get(`${server}/user/getChat?id=${id}`)
		.then((result) => result.data.result);

	return {
		type: GET_USERS,
		payload: req,
	};
}
