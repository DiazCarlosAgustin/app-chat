import ChatComponent from "./chatComponent";

import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
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
		<List sx={{ overflowY: "auto" }}>
			<ListItem>
				<Box sx={{ textAlign: "center", width: "100%" }}>
					<ListItemText>
						Personas conectas ({contacts?.length})
					</ListItemText>
				</Box>
			</ListItem>
			{contacts &&
				contacts.map((contact, index) => (
					<ListItem key={index}>
						<ChatComponent
							getMessagesByUser={getMessagesByUser}
							key={index}
							chat={contact}
						/>
					</ListItem>
				))}
		</List>
	);
}

const mapStateToProps = (state) => {
	return {
		contacts: state.contacts.contacts,
		user: state.users.user,
	};
};

export default connect(mapStateToProps)(ChatsConteiner);
