import { combineReducers } from "redux";
import contacts from "./contacts/contacts";
import chats from "./chats/chats";
import users from "./users/users";
import alerts from "./alerts/alerts";

const rootReducer = combineReducers({ contacts, chats, users, alerts });

export default rootReducer;
