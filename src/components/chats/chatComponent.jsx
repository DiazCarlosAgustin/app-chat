import React from "react";
import { Avatar } from "@mui/material";
import { openChat } from "../../actions/chat";
import { useDispatch } from "react-redux";
export default function ChatComponent({ chat, getMessagesByUser }) {
	const dispatch = useDispatch();
	const handleContact = async () => {
		dispatch(openChat());
		getMessagesByUser(chat._id, chat.username);
	};
	return (
		<div
			onClick={handleContact}
			className="chatContact flex justify-start py-4 px-2 w-full h-full items-center hover:dark:bg-gray-700"
		>
			<div className="pr-3">
				{chat.image.includes("http") ? (
					<Avatar
						src={`${chat.image}`}
						loading="lazy"
						alt="img_profile"
					/>
				) : (
					<Avatar
						src={`http://localhost:3050/img/${chat.image}`}
						loading="lazy"
						alt="img_profile"
					/>
				)}
			</div>
			<div className="flex justify-between items-center w-full">
				<div className="flex justify-items-center h-full">
					<div>{chat.username}</div>
				</div>
				<span className="w-3 h-3 bg-green-500 block rounded-full"></span>
			</div>
		</div>
	);
}
