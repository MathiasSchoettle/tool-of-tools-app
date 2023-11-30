import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import QueryProvider from "./query/QueryProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<QueryProvider>
		<App/>
	</QueryProvider>
);

