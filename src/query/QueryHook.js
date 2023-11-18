import {useContext, useEffect, useState} from "react";
import {QueryContext} from "./QueryProvider";

// fixme refactor fetch, refetch and and useEffect calls
export default function useQuery(key, promise) {

	const [status, setStatus] = useState("pending");
	const [data, setData] = useState(undefined);
	const [error, setError] = useState(undefined);

	const queryClient = useContext(QueryContext);

	const callback = (data) => {
		setData(data);
	};

	useEffect(() => {
		queryClient.clearFromCache(key);
		const hash = queryClient.register(key, callback);
		fetch();
		return () => queryClient.deregister(key, hash);
	}, []);

	const fetch = () => {

		if (queryClient.hasCacheFor(key)) {
			setData(queryClient.getFromCache(key));
			setStatus("success");
			setError(undefined);
			return;
		}

		setStatus("pending");
		setData(undefined)
		setError(undefined);

		promise()
			.then((data) => {
				setData(data);
				queryClient.cacheQuery(key, data);
				setStatus("success");
			})
			.catch((err) => {
				setError(err);
				setStatus("error");
			});
	};

	const refetch = () => {
		queryClient.clearFromCache(key);
		if (status !== "pending") fetch();
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