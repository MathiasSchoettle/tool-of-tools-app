import {Loader, ServerCrash} from "lucide-react";
import DangerButton from "./inputs/button/DangerButton";
import useQuery from "./query/QueryHook";

const fetchUsers = async () => {
	const index = Math.floor(Math.random() * 9 + 1);
	const res = await fetch('https://jsonplaceholder.typicode.com/users/' + index);

	await new Promise(r => setTimeout(r, 1000));

	if (!res.ok || Math.random() > 0.5) throw new Error("Could not fetch user data");

	return res.json();
};

export default function Test({name}) {

	const {data, error, isFetching, isSuccess, isError, isPending} = useQuery("users", fetchUsers);

	if (isPending) {
		return <div className="flex justify-center h-40 items-center">
			<Loader size={32} className="text-dp-24 animate-spin"/>
		</div>;
	}

	if (isError) {
		return <div className="flex flex-col justify-center h-40 items-center gap-2">
			<div className="text-dp-24 flex gap-2">
				<div>{error}</div>
				{isFetching ? <div><Loader className="animate-spin text-dp-24"/></div> : <></>}
			</div>
			<ServerCrash size={32} className="text-red-500"/>
		</div>;
	}

	return <div className="p-5 text-dp-24 gap-4 flex flex-col items-center">
			<div className="flex flex-col gap-1 p-1 bg-dp-00 rounded w-64">

				<div className="flex justify-between">
					<p>{data?.username}</p>
					{isFetching ? <div><Loader className="animate-spin text-dp-24"/></div> : <></>}
				</div>

				<p>{data?.id}</p>
				<p>{data?.website}</p>
				<p>{data?.email}</p>

				<DangerButton content="Refetch"/>
			</div>
	</div>;
}