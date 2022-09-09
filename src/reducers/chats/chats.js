import { GET_CHAT_BY_USER } from "../../actions/types";

const initialState = [];

export default function chats(state = initialState, action) {
	switch (action.type) {
		case GET_CHAT_BY_USER:
			return { ...state, chats: action.payload };
		default:
			return state;
	}
}
