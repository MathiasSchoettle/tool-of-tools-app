import {useCallback, useContext, useState, useSyncExternalStore} from "react";
import {QueryContext} from "./QueryProvider";
import QueryObserver from "./QueryObserver";

export default function useQuery(queryKey, queryFn) {

	const queryClient = useContext(QueryContext);
	const [observer] = useState(() => new QueryObserver(queryKey, queryFn, queryClient));

	const subscribe = useCallback((listener) => {
		return observer.register(listener);
	}, [observer]);

	return useSyncExternalStore(
		subscribe,
		() => observer.getResult()
	);
}