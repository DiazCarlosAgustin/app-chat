import axios from "axios";
import { useState, useEffect, useRef } from "react";
import ChatsComponent from "../components/chats/chatsComponent";
import { formatDistanceToNow } from "date-fns";
import { connect } from "react-redux";
import io from "socket.io-client";

import {
	Grid,
	TextField,
	Fab,
	List,
	ListItem,
	ListItemText,
	Paper,
	Divider,
	Chip,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

import SendIcon from "@mui/icons-material/send";

// const server = process.env.REACT_APP_SERVER_SOCKET;
const server = "http://localhost:3050";
const socket = io(server);

import { send_new_message } from "../actions/chat";

import { getChatByUser } from "../actions/chat";

function Chat({ dispatch, chats, user }) {
	const [from, setFrom] = useState(user?._id || null);
	const [to, setTo] = useState(null);
	const [nameTo, setNameTo] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const messageRef = useRef("");
	const messagesRef = useRef("");

	const handleGetChat = async (user_to, name_to) => {
		setTo(user_to);
		console.log(nameTo);
		setNameTo(name_to);

		await socket.emit("chat:startChat", { to: to, from: from });
		await dispatch(getChatByUser(from, user_to));

		messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
	};
	const handleSendMessage = () => {
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
		socket.on("getMessage", async (msg) => {
			await dispatch(send_new_message(msg.data));
			messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
		});
	}, [socket]);
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Grid
				container
				component={Paper}
				sx={{ padding: 0, height: "100vh" }}
			>
				<ChatsComponent getMessagesByUser={handleGetChat} />
				<Grid item xs={8} lg={10}>
					{chats.length > 0 || chats.chats?.length >= 1 ? (
						<Grid
							item
							xs={12}
							sx={{ padding: 0, margin: 0, height: "50px" }}
						>
							<Paper
								elevation={3}
								sx={{
									height: "100%",
									display: "flex",
									alignItems: "center",
									padding: "0 15px",
									fontWeight: "700",
								}}
							>
								{nameTo}
							</Paper>
						</Grid>
					) : null}

					<List
						className="chat-container"
						ref={messagesRef}
						sx={{
							width: "100%",
							height: "85vh",
							overflowY: "auto",
						}}
					>
						{!chats.chats || chats.chats.length === 0 ? (
							<ListItem>
								<ListItemText
									sx={{ width: "100%", textAlign: "center" }}
								>
									No hay mensajes disponibles.
								</ListItemText>
							</ListItem>
						) : (
							chats.chats &&
							chats &&
							chats.chats.map((message, index) =>
								message.send_by == from ? (
									<ListItem key={index}>
										<Grid container>
											<Grid item xs={12}>
												<ListItemText
													align="right"
													primary={
														<Chip
															color="primary"
															label={
																message.message
															}
														/>
													}
												></ListItemText>
											</Grid>
											<Grid item xs={12}>
												<ListItemText
													align="right"
													secondary={formatDistanceToNow(
														new Date(
															message.createdAt,
														),
														{
															addSuffix: true,
														},
													)}
												></ListItemText>
											</Grid>
										</Grid>
									</ListItem>
								) : (
									<ListItem key={index}>
										<Grid>
											<Grid item xs={12}>
												<ListItemText
													align="left"
													primary={
														<Chip
															label={
																message.message
															}
														/>
													}
												></ListItemText>
											</Grid>
											<Grid item xs={12}>
												<ListItemText
													align="left"
													secondary={formatDistanceToNow(
														new Date(
															message.createdAt,
														),
														{
															addSuffix: true,
														},
													)}
												></ListItemText>
											</Grid>
										</Grid>
									</ListItem>
								),
							)
						)}
					</List>
					<Divider />
					{chats.length <= 0 ? null : (
						<Grid container style={{ padding: "10px" }}>
							<Grid item xs={10} lg={11}>
								<TextField
									fullWidth
									label="Mensaje..."
									id="message"
									inputRef={messageRef}
									onKeyPress={(e) =>
										e.key === "Enter" && handleSendMessage()
									}
								/>
							</Grid>
							<Grid item xs={2} lg={1} align="center">
								<Fab
									color="primary"
									aria-label="add"
									onClick={() => handleSendMessage()}
								>
									<SendIcon />
								</Fab>
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		chats: state.chats,
		user: state.users.user,
	};
};

export default connect(mapStateToProps)(Chat);
