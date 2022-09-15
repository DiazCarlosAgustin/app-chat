import axios from "axios";
import { GET_CHAT_BY_USER, POST_NEW_MESSAGE } from "./types";
import { server } from "../services/server";

export async function getChatByUser(from, to) {
	const req = await axios
		.get(`${server}/chat/getChat?from=${from}&to=${to}`)
		.then((result) => {
			if (result.data.chat.length > 0) {
				return result?.data?.chat[0]?.chats;
			}
			return [];
		});

	return {
		type: GET_CHAT_BY_USER,
		payload: req,
	};
}

export async function send_new_message(msg) {
	return {
		type: POST_NEW_MESSAGE,
		payload: msg,
	};
}
