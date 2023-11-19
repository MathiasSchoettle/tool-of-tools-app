import {useContext, useEffect, useState} from "react";
import {QueryContext} from "./QueryProvider";

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
		queryClient.clearFromCache(key);

		setStatus("pending");
		setData(undefined)
		setError(undefined);

		callPromise(promise);
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
		queryClient.clearFromCache(key);
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