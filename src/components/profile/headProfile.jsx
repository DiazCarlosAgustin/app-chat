import React, { useState } from "react";
import { connect } from "react-redux";
import logout_user from "../../actions/user";
import { Navigate, useLocation } from "react-router-dom";
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Box,
	Avatar,
} from "@mui/material";

function HeadProfile({ dispatch, user, isAuthenticated }) {
	const location = useLocation();
	const handleLogout = () => {
		dispatch(logout_user());
		return <Navigate to="/login" state={{ from: location }} replace />;
	};
	return (
		<ListItem>
			<ListItemIcon className="sider_image_profile">
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
			</ListItemIcon>
			<ListItemText>
				<div>{user.username}</div>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<span>{isAuthenticated ? "Connected" : "Offline"}</span>
					<span onClick={handleLogout}>Logout</span>
				</Box>
			</ListItemText>
		</ListItem>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.users.user,
		isAuthenticated: state.users.isAuthenticated,
	};
};

export default connect(mapStateToProps)(HeadProfile);
