import { SET_USERS, ADD_USER } from "../../actions/types";

const initialState = [];

export default function contacts(state = initialState, action) {
	switch (action.type) {
		case SET_USERS:
			return { ...state, contacts: action.payload };
		case ADD_USER:
			console.log(state.contacts, action.payload);
			return { ...state, contacts: [...state.contacts, action.payload] };
		default:
			return state;
	}
}
