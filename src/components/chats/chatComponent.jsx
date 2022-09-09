import React from "react";

export default function ChatComponent({ chat, getMessagesByUser }) {
	return (
		<div
			className="chat_element"
			onClick={() => getMessagesByUser(chat._id)}
		>
			<div className="chat_img_profile ">
				{chat.image.includes("http") ? (
					<img
						src={`${chat.image}`}
						loading="lazy"
						alt="img_profile"
					/>
				) : (
					<img
						src={`http://localhost:3050/img/${chat.image}`}
						loading="lazy"
						alt="img_profile"
					/>
				)}
			</div>
			<div className="chat_content">
				<div className="chat_name">
					<span>{chat.username}</span>
				</div>
				{/* <div className="chat_message">
					<span>{chat.message}</span>
				</div> */}
			</div>
			{/* <div className="message_count">
				<span className="bubble_count">
					{chat.count <= 9 ? chat.count : "+9"}
				</span>
			</div> */}
		</div>
	);
}
