import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
	let auth = false;
	let location = useLocation();

	if (!auth.user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	return children;
}
