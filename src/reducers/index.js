import { combineReducers } from "redux";
import contacts from "./contacts/contacts";
import chats from "./chats/chats";
import users from "./users/users";
const rootReducer = combineReducers({ contacts, chats, users });

export default rootReducer;
