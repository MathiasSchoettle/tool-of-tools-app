import {useEffect, useState} from "react";

export default function useQuery(promise) {

	const [status, setStatus] = useState("pending");
	const [data, setData] = useState(undefined);
	const [error, setError] = useState(undefined);

	useEffect(() => {
		fetch();
	}, []);

	const fetch = () => {
		promise()
			.then((data) => {
				setData(data);
				setStatus("success");
			})
			.catch((err) => {
				setError(err);
				setStatus("error");
			});
	};

	const refetch = () => {
		if (status === "pending") return;

		setStatus("pending");
		setData(undefined)
		setError(undefined);
		fetch();
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