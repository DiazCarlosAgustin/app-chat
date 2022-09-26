import { GET_CHAT_BY_USER, POST_NEW_MESSAGE } from "../../actions/types";

const initialState = [];

export default function chats(state = initialState, action) {
	switch (action.type) {
		case GET_CHAT_BY_USER:
			return { ...state, chats: action.payload };
		case POST_NEW_MESSAGE:
			return { ...state, chats: [...state.chats, action.payload] };
		default:
			return state;
	}
}
