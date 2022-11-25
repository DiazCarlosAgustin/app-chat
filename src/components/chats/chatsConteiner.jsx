import ChatComponent from "./chatComponent";

import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { List, ListItem, Box, ListItemText } from "@mui/material";

import { setContact, addContact } from "../../actions/contacts";

import socket from "../../services/socket";

function ChatsConteiner({ getMessagesByUser, dispatch, contacts, user }) {
	const id = user._id;

	useEffect(() => {
		socket.emit("users:online", { id: id });
	}, [id]);

	useEffect(() => {
		socket.on("users:connected", (users) => {
			dispatch(setContact(users));
		});
	}, []);

	useEffect(() => {
		socket.on("users:newUserLogged", (user) => {
			dispatch(addContact(user));
		});
	}, []);
	return (
		<div className="h-full max-h-screen overflow-y-auto my-3 snap-none">
			<div className="my-3 w-full">
				<div className="w-full text-center">
					<div>Personas conectas ({contacts?.length})</div>
				</div>
			</div>
			<div className="h-auto">
				{contacts &&
					contacts.map((contact, index) => (
						<div key={index}>
							<ChatComponent
								getMessagesByUser={getMessagesByUser}
								key={index}
								chat={contact}
							/>
						</div>
					))}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		contacts: state.contacts.contacts,
		user: state.users.user,
	};
};

export default connect(mapStateToProps)(ChatsConteiner);
