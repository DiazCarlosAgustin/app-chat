const AuthProvider = {
	isAuthenticated: false,

	singIn(callback) {
		authProvider.isAuthenticated = true;
		setTimeout(callback, 100);
	},

	singOut(callback) {
		authProvider.isAuthenticated = false;
		setTimeout(callback, 100);
	},
};

export { AuthProvider };
