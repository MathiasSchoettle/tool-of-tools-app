import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import QueryProvider from "./query/QueryProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient()

root.render(

	<QueryClientProvider client={queryClient}>
		<QueryProvider>
			<App/>
		</QueryProvider>
	</QueryClientProvider>

);

