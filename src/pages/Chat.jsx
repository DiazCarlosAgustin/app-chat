import { useState, useEffect, useRef } from "react";
import ChatsComponent from "../components/chats/chatsComponent";
import { formatDistanceToNow } from "date-fns";
import { connect } from "react-redux";
import io from "socket.io-client";

// import SendIcon from "@mui/icons-material/send";

// const server = process.env.REACT_APP_SERVER_SOCKET;
const server = "http://localhost:3050";
const socket = io(server);

import { send_new_message } from "../actions/chat";

import { getChatByUser } from "../actions/chat";
import { openChat } from "../actions/chat";

function Chat({ dispatch, chats, user, open_chat }) {
	const [from, setFrom] = useState(user?._id || null);
	const [to, setTo] = useState(null);
	const [nameTo, setNameTo] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const messageRef = useRef("");
	const messagesRef = useRef("");

	const handleGetChat = async (user_to, name_to) => {
		setTo(user_to);
		setNameTo(name_to);

		await socket.emit("chat:startChat", { to: user_to, from: from });
		await dispatch(getChatByUser(from, user_to));

		messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
	};
	const handleSendMessage = async () => {
		const params = {
			to: to,
			from: from,
			message: messageRef.current.value,
		};

		socket.emit("chat:sendMessage", params);
		messageRef.current.value = "";
		messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
		/* dispatch(send_new_message(params)); */
	};
	useEffect(() => {
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

	useEffect(async () => {
		socket.on("getMessage", async (msg) => {
			await dispatch(send_new_message(msg.data));
			messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
		});
	}, [socket]);
	return (
		<div className="m-0 p-0 h-full overflow-hidden w-full box-content dark:text-slate-50 text-gray-900 flex dark:bg-gray-900 ">
			<ChatsComponent
				getMessagesByUser={handleGetChat}
				classes={` ${open_chat ? "hidden md:block" : ""}`}
			/>
			<div
				className={`w-full max-w-screen  h-screen ${
					!open_chat ? "hidden" : ""
				} md:block`}
			>
				{to && (
					<div className="h-full max-h-16 p-0 m-0 w-full ">
						<div className="px-3 h-16 shadow-md dark:text-slate-50 text-gray-900 dark:bg-gray-800 flex items-center ">
							<span
								className="cursor-pointer font-light pr-3  block"
								onClick={() => dispatch(openChat())}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
									/>
								</svg>
							</span>
							<span className="font-semibold  w-full">
								{nameTo}
							</span>
						</div>
					</div>
				)}
				<div
					className="chat-container w-full overflow-y-auto max-h-screen px-2"
					ref={messagesRef}
					style={{ height: "calc(100vh - 140px)" }}
				>
					{!chats.chats || chats.chats.length === 0 ? (
						<div className="flex justify-center w-full mt-4 text-gray-800">
							<div className="rounded-full bg-gray-300 w-auto p-3">
								No hay mensajes disponibles.
							</div>
						</div>
					) : (
						chats.chats &&
						chats.chats.length > 0 &&
						chats.chats.map((message, index) =>
							message.send_by == from ? (
								<div
									key={index}
									className=" my-2 h-auto w-auto"
								>
									<div className="w-full h-auto justify-end">
										<div className="w-full flex justify-end message">
											<div className="bg-blue-400 px-3 py-2 rounded-full font-light">
												<span>{message.message}</span>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div
									key={index}
									className=" h-auto w-auto my-2"
								>
									<div className="w-full h-auto justify-start">
										<div className="w-full flex justify-start">
											<div className="dark:bg-gray-700 bg-slate-200 dark:text-gray-300 px-3 py-2 rounded-full font-light">
												<span>{message.message}</span>
											</div>
										</div>
									</div>
								</div>
							),
						)
					)}
				</div>
				{!to ? null : (
					<div className="px-4 flex w-full h-auto justify-between dark:text-slate-50 text-gray-900">
						<div className="w-full pr-4 dark:text-slate-50 text-gray-900">
							<input
								type="text"
								id="message"
								className="dark:text-slate-50 text-gray-900 h-14 w-full rounded-lg px-2 border-2 dark:border-none"
								placeholder="Escribir mensaje..."
								ref={messageRef}
								onKeyPress={(e) =>
									e.key === "Enter" && handleSendMessage()
								}
							/>
						</div>
						<div
							className="flex w-14 h-auto items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"
							onClick={() => handleSendMessage()}
						>
							<svg
								className="w-6 h-6 rotate-90 text-blue-500 text-center"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
							</svg>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		chats: state.chats,
		user: state.users.user,
		open_chat: state.chats.openChat,
	};
};

export default connect(mapStateToProps)(Chat);
