import React from "react";
import ChatsConteiner from "./chatsConteiner";
import HeadProfile from "../profile/headProfile";
import { Grid, Paper } from "@mui/material";

export default function ChatsComponent({ getMessagesByUser, classes }) {
	return (
		<div
			className={`${classes} max-h-screen max-w-md w-full md:max-w-sm shadow-md dark:text-slate-50 text-gray-900 overflow-hidden dark:bg-gray-800`}
			style={{ height: "100vh" }}
		>
			<div className="w-full p-3 h-full max-h-screen dark:text-slate-50 text-gray-900">
				<HeadProfile />
				<ChatsConteiner getMessagesByUser={getMessagesByUser} />
			</div>
		</div>
	);
}
