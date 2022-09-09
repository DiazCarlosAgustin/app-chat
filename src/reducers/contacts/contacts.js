import { GET_USERS } from "../../actions/types";

const initialState = [];

export default function contacts(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return { ...state, contacts: action.payload };
		default:
			return state;
	}
}
