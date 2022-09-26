import ChatComponent from "./chatComponent";

import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";

import { List, ListItem, Box, ListItemText } from "@mui/material";

import { getUsers } from "../../actions/contacts";

// import sockets from "../../services/socket";

function ChatsConteiner({ getMessagesByUser, dispatch, contacts, user }) {
	const id = user._id;

	useEffect(() => {
		// socket.emit("users:online", { id: "630ade79b79c820ab6e2229f" });
		// socket.on("users:connected", (users) => {
		// 	setContacts(users);
		// });
		dispatch(getUsers(id));
	}, [id]);
	return (
		<List button>
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
