import axios from "axios";
import { useState, useEffect } from "react";
import ChatsComponent from "../components/chats/chatsComponent";
import { formatDistanceToNow } from "date-fns";
import { connect } from "react-redux";

import { getChatByUser } from "../actions/chat";

function Chat({ dispatch, chats }) {
	const from = "630ade79b79c820ab6e2229f";
	const handleGetChat = (to) => {
		dispatch(getChatByUser(from, to));
	};

	return (
		<main className="main__">
			<ChatsComponent getMessagesByUser={handleGetChat} />
			<section className="chat_messages">
				<div className="chat_messages_container">
					{chats.chats &&
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
						)}
				</div>
				<div className="chat_form_message">
					<fieldset className="chat_input_conteiner">
						<input
							type="text"
							placeholder="Escribir mensaje"
							id="message"
						/>
						<button className="chat_btn_send">Enviar</button>
					</fieldset>
				</div>
			</section>
		</main>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		chats: state.chats,
	};
};

export default connect(mapStateToProps)(Chat);
