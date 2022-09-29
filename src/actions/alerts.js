import { ADD_NEW_ALERT, CLEAR_ALERTS } from "./types";

export function add_new_alert(payload) {
	console.log(payload);
	return {
		type: ADD_NEW_ALERT,
		payload: payload,
	};
}
export function clear_alerts() {
	return { type: CLEAR_ALERTS };
}
