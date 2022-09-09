import React, { useState } from "react";
import { connect } from "react-redux";
import logout_user from "../../actions/user";
import { Navigate, useLocation } from "react-router-dom";
function HeadProfile({ dispatch, user, isAuthenticated }) {
	const location = useLocation();
	const handleLogout = () => {
		dispatch(logout_user());
		return <Navigate to="/login" state={{ from: location }} replace />;
	};
	return (
		<div className="sider_header">
			<div className="sider_image_profile">
				{user.image.includes("http") ? (
					<img
						src={`${user.image}`}
						loading="lazy"
						alt="img_profile"
						width="50"
						height="45"
						className="image__profile"
					/>
				) : (
					<img
						src={`http://localhost:3050/img/${user.image}`}
						loading="lazy"
						alt="img_profile"
						width="50"
						height="45"
						className="image__profile"
					/>
				)}
			</div>
			<div className="sider_data_profile">
				<div className="sider_name">{user.username}</div>
				<div className="sider_status">
					<span>{isAuthenticated ? "Connected" : "Offline"}</span>
					<span className="loguot" onClick={handleLogout}>
						Logout
					</span>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.users.user,
		isAuthenticated: state.users.isAuthenticated,
	};
};

export default connect(mapStateToProps)(HeadProfile);
