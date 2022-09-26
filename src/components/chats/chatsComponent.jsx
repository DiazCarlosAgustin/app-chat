import React from "react";
import ChatsConteiner from "./chatsConteiner";
import HeadProfile from "../profile/headProfile";
import { Grid, Paper } from "@mui/material";

export default function ChatsComponent({ getMessagesByUser }) {
	return (
		<Grid item xs={4} lg={2}>
			<Paper sx={{ maxHeight: "100vh", height: "100%" }} elevation={3}>
				<HeadProfile />
				<ChatsConteiner getMessagesByUser={getMessagesByUser} />
			</Paper>
		</Grid>
	);
}
