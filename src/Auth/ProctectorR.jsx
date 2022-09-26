import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedR({ children, isAuthenticated }) {
	return isAuthenticated || isAuthenticated === "true" ? (
		children
	) : (
		<Navigate to="/login" />
	);
}
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.users.isAuthenticated,
	};
};

export default connect(mapStateToProps)(ProtectedR);
