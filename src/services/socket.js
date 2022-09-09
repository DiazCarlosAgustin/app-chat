import io from "socket.io-client";

// const server = process.env.REACT_APP_SERVER_SOCKET;
const server = "http://localhost:3050";
const socket = io(server);

export default socket;
