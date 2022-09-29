import { Snackbar, Alert } from "@mui/material";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { clear_alerts } from "../../actions/alerts";
import { Icon, IconButton } from "@material-ui/core";

function AlertComponent({ alerts }) {
	const dispatch = useDispatch();
	function handleClose() {
		// dispatch(clear_alerts());
	}
	console.log(alerts.severity);
	return alerts?.isOpen == true ? (
		<Snackbar
			anchorOrigin={{
				vertical: `${alerts.vertical}`,
				horizontal: `${alerts.horizontal}`,
			}}
			open={alerts.isOpen}
			autoHideDuration={4000}
			onClose={handleClose}
			key={alerts.vertical + alerts.horizontal}
		>
			<Alert
				onClose={handleClose}
				severity={alerts.severity}
				elevation={6}
				variant={alerts.variant}
			>
				{alerts.message}
			</Alert>
		</Snackbar>
	) : null;
}

const mapStateToProps = (state) => {
	return { alerts: state.alerts };
};

export default connect(mapStateToProps)(AlertComponent);
