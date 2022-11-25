import {
	GET_CHAT_BY_USER,
	POST_NEW_MESSAGE,
	OPEN_CHAT,
} from "../../actions/types";

const initialState = { chats: [], openChat: false };

export default function chats(state = initialState, action) {
	switch (action.type) {
		case GET_CHAT_BY_USER:
			return { ...state, chats: action.payload };
		case POST_NEW_MESSAGE:
			return { ...state, chats: [...state.chats, action.payload] };
		case OPEN_CHAT:
			return {
				...state,
				openChat: !state.openChat,
			};
		default:
			return state;
	}
}
