import React, { useState } from "react";
import { connect } from "react-redux";
import { logout_user } from "../../actions/user";
import { Navigate, useLocation } from "react-router-dom";
import { List, ListItemIcon, ListItemText, Box, Avatar } from "@mui/material";

function HeadProfile({ dispatch, user, isAuthenticated }) {
	const location = useLocation();
	const handleLogout = () => {
		dispatch(logout_user(user._id));
		return <Navigate to="/login" state={{ from: location }} replace />;
	};
	return (
		<div className="flex pr-3 items-center">
			<div className="sider_image_profile pr-2 ">
				{user.image.includes("http") ? (
					<Avatar
						src={`${user.image}`}
						loading="lazy"
						alt="img_profile"
						className="image__profile"
					/>
				) : (
					<Avatar
						src={`http://localhost:3050/img/${user.image}`}
						loading="lazy"
						alt="img_profile"
					/>
				)}
			</div>
			<div className="block w-full">
				<div className="px-2">{user.username}</div>
				<div className="flex justify-between w-full">
					<span>{isAuthenticated ? "Connected" : "Offline"}</span>
					<span className="cursor-pointer" onClick={handleLogout}>
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
