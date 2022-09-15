import ChatComponent from "./chatComponent";

import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";

import { getUsers } from "../../actions/contacts";

// import sockets from "../../services/socket";

function ChatsConteiner({ getMessagesByUser, dispatch, contacts, user }) {
	const id = user._id;
	const server = "http://localhost:3050";
	const socket = io(server);

	useEffect(() => {
		// socket.emit("users:online", { id: "630ade79b79c820ab6e2229f" });
		// socket.on("users:connected", (users) => {
		// 	setContacts(users);
		// });
		dispatch(getUsers(id));
	}, []);
	return (
		<div className="chats_container">
			<div className="chats_onlines">
				Personas conectas ({contacts?.length})
			</div>
			{contacts &&
				contacts.map((contact, index) => (
					<ChatComponent
						getMessagesByUser={getMessagesByUser}
						key={index}
						chat={contact}
					/>
				))}
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
