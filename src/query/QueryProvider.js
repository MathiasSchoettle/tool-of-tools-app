import {createContext} from "react";
import QueryClient from "./QueryClient";

export const QueryContext = createContext(null);

export default function QueryProvider({children}) {
	return (
		<QueryContext.Provider value={new QueryClient()}>
			{children}
		</QueryContext.Provider>
	)
}