import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedR from "./Auth/ProctectorR";
import Chat from "./pages/Chat";
import Login from "./pages/Login";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedR>
							<Chat />
						</ProtectedR>
					}
				/>
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
}
