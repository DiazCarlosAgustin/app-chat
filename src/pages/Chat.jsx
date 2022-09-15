import axios from "axios";
import { useState, useEffect, useRef } from "react";
import ChatsComponent from "../components/chats/chatsComponent";
import { formatDistanceToNow } from "date-fns";
import { connect } from "react-redux";
import socket from "../services/socket";
import { send_new_message } from "../actions/chat";

import { getChatByUser } from "../actions/chat";

function Chat({ dispatch, chats, user }) {
	const [from, setFrom] = useState(user?._id || null);
	const [to, setTo] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const messageRef = useRef("");
	const handleGetChat = (user_to) => {
		setTo(user_to);
		socket.emit("chat:startChat", { to: to, from: from });
		socket.on("chat:messages", (msg) => {
			console.log(msg);
		});
		dispatch(getChatByUser(from, to));
	};
	const handleSendMessage = () => {
		const params = {
			to: to,
			from: from,
			message: messageRef.current.value,
		};
		socket.emit("chat:sendMessage", params);
		/* dispatch(send_new_message(params)); */
	};
	useEffect(() => {
		console.log("connected", socket.connected);
		socket.on("connect", () => {
			setIsConnected(true);
		});
		socket.on("disconnect", () => {
			setIsConnected(false);
		});
		return () => {
			socket.off("connect"), socket.off("disconnect");
		};
	}, [isConnected]);

	useEffect(() => {
		socket.on("getMessage", (msg) => {
			console.log("getMessage", msg[0].chats);
			dispatch(send_new_message(msg[0].chats));
		});
	}, [socket]);

	return (
		<main className="main__">
			<ChatsComponent getMessagesByUser={handleGetChat} />
			<section className="chat_messages">
				<div className="chat_messages_container">
					{!chats.chats || chats.chats.length === 0 ? (
						<span className="chat_messages_empty">
							No hay mensajes disponibles.
						</span>
					) : (
						chats.chats &&
						chats &&
						chats.chats.map((message, index) =>
							message.send_by == from ? (
								<div
									key={index}
									className="chat_bubble_message_to"
								>
									<span className="chat_bubble_message">
										<span className="chat_bubble_message_text">
											{message.message}
										</span>
										<div className="chat_date">
											{formatDistanceToNow(
												new Date(message.createdAt),
												{
													addSuffix: true,
												},
											)}
										</div>
									</span>
								</div>
							) : (
								<div
									key={index}
									className="chat_bubble_message_from"
								>
									<span className="chat_bubble_message_">
										<span className="chat_bubble_message_text">
											{message.message}
										</span>
										<div className="chat_date">
											{formatDistanceToNow(
												new Date(message.createdAt),
												{
													addSuffix: true,
												},
											)}
										</div>
									</span>
								</div>
							),
						)
					)}
				</div>
				<div className="chat_form_message">
					<fieldset className="chat_input_conteiner">
						<input
							type="text"
							placeholder="Escribir mensaje"
							id="message"
							ref={messageRef}
							onKeyPress={(e) =>
								e.key === "Enter" && handleSendMessage()
							}
						/>
						<button
							className="chat_btn_send"
							onClick={() => handleSendMessage()}
						>
							Enviar
						</button>
					</fieldset>
				</div>
			</section>
		</main>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		chats: state.chats,
		user: state.users.user,
	};
};

export default connect(mapStateToProps)(Chat);
