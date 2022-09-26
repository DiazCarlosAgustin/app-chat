import React from "react";
import { Avatar, Grid, Box, ListItemText } from "@mui/material";

export default function ChatComponent({ chat, getMessagesByUser }) {
	return (
		<Grid
			container
			onClick={() => getMessagesByUser(chat._id, chat.username)}
			className="chatContact"
			sx={{ width: "100%", padding: "10px" }}
		>
			<Grid item xs={4}>
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
			</Grid>
			<Grid item xs={8}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						height: "100%",
					}}
				>
					<ListItemText>{chat.username}</ListItemText>
				</Box>
				{/* <div className="chat_message">
					<span>{chat.message}</span>
				</div> */}
			</Grid>
			{/* <div className="message_count">
				<span className="bubble_count">
					{chat.count <= 9 ? chat.count : "+9"}
				</span>
			</div> */}
		</Grid>
	);
}
