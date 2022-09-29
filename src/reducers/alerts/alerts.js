import { ADD_NEW_ALERT, CLEAR_ALERTS } from "../../actions/types";

export default function alerts(state = {}, action) {
	switch (action.type) {
		case ADD_NEW_ALERT:
			return {
				...state,
				vertical: action.payload.vertical,
				horizontal: action.payload.horizontal,
				variant: "filled",
				severity: action.payload.severity,
				isOpen: true,
				message: action.payload.message,
			};
		case CLEAR_ALERTS:
			return {
				...state,
				isOpen: false,
			};
		default:
			return state;
	}
}
