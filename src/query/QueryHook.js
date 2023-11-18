import {useContext, useEffect, useState} from "react";
import {QueryContext} from "./QueryProvider";

// fixme create a better hash value than the current name
//  refactor fetch, refetch and and useEffect calls
export default function useQuery(key, promise) {

	const [status, setStatus] = useState("pending");
	const [data, setData] = useState(undefined);
	const [error, setError] = useState(undefined);

	const queryClient = useContext(QueryContext);

	const callback = (data) => {
		setData(data);
	};

	useEffect(() => {
		const name = "test" + Math.random();
		queryClient.clearFromCache(key);
		queryClient.register(key, name, callback);
		fetch(true);

		return () => queryClient.deregister(key, name);
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