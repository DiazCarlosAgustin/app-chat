import { LOGIN_USER, LOGOUT_USER } from "../../actions/types";

const initialState = {
	isAuthenticated: localStorage.getItem("isAuthenticated"),
	user: JSON.parse(localStorage.getItem("user")),
	token: localStorage.getItem("token"),
};

export default function users(state = initialState, action) {
	switch (action.type) {
		case LOGIN_USER:
			return {
				...state,
				user: action.payload.user,
				isAuthenticated: action.payload.auth,
				token: action.payload.token,
			};
		case LOGOUT_USER:
			return {
				...state,
				user: [],
				isAuthenticated: false,
				token: "",
			};
		default:
			return state;
	}
}
