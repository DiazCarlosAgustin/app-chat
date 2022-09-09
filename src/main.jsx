import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./app.scss";

import { Provider } from "react-redux";
import reducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
	<React.StrictMode>
		<Provider
			store={store(
				reducer,
				window.__REDUX_DEVTOOLS_EXTENSION__ &&
					window.__REDUX_DEVTOOLS_EXTENSION__(),
			)}
		>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);
