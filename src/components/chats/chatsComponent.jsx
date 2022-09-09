import React from "react";
import ChatsConteiner from "./chatsConteiner";
import HeadProfile from "../profile/headProfile";

export default function ChatsComponent({ getMessagesByUser }) {
	return (
		<aside className="sider_chat">
			<HeadProfile />
			<ChatsConteiner getMessagesByUser={getMessagesByUser} />
		</aside>
	);
}
