import {useContext, useEffect, useState} from "react";
import {QueryContext} from "./QueryProvider";

/**
 * TODO
 *  - if an error occurs when fetching new data all registered callbacks should be informed the data is invalid
 *  	meaning the callback function should not just set the data but also set the error and status
 *  - we should have an option to select the cache time we want
 *  	it should not be hardcoded to CACHE_LIFETIME in the query client
 *  - currently our default state is "pending". when the cache already contains data it should be set to "success"
 *  	otherwise when rendering a component we have a slight flicker as it shows the pending status and updates
 *  	to the success status very quickly
 *
 *  FIXME:
 *  	- when mounting and unmounting a component very quickly we call the fetch data function often when another call
 *  	is already in flight
 *  	- we should have a way of checking if the query is currently fetching (isFetching, fetchStatus etc.)
 *  	- https://tanstack.com/query/v4/docs/react/guides/queries#fetchstatus
 *		- set a boolean flag in the query client somewhere maybe? when executing the promise maybe?
 *
 */
export default function useQuery(key, promise) {

	const [status, setStatus] = useState("pending");
	const [data, setData] = useState(undefined);
	const [error, setError] = useState(undefined);

	const queryClient = useContext(QueryContext);

	const callback = (data) => {
		setData(data);
	};

	useEffect(() => {
		const hash = queryClient.register(key, callback);
		fetchData();
		return () => queryClient.deregister(key, hash);
	}, []);

	const fetchData = () => {

		if (queryClient.cacheIsStale(key)) {
			queryClient.clearFromCache(key);

			setStatus("pending");
			setData(undefined)
			setError(undefined);

			callPromise(promise);
		} else {
			setStatus("success");
			setData(queryClient.getFromCache(key));
			setError(undefined);
		}

	};

	const callPromise = (promise) => {
		promise()
			.then(data => {
				setData(data);
				queryClient.cacheQuery(key, data);
				setStatus("success");
			})
			.catch(error => {
				setError(error);
				setStatus("error");
			});
	}

	const refetch = () => {
		if (status !== "pending") fetchData();
	};

	return {
		data: data,
		status: status,
		error: error,
		isPending: status === "pending",
		isError: status === "error",
		isSuccess: status === "success",
		refetch: refetch
	};
}