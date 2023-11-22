import {CrossIcon, Loader, ServerCrash} from "lucide-react";
import DangerButton from "./inputs/button/DangerButton";
import useQuery from "./query/QueryHook";
import {FetchStatusType} from "./query/QueryClient";

const fetchUsers = async () => {
	const index = Math.floor(Math.random() * 9 + 1);
	const res = await fetch('https://jsonplaceholder.typicode.com/users/' + index);

	await new Promise(r => setTimeout(r, 1000));

	if (!res.ok) throw new Error("Alarm");

	return res.json();
};

export default function Test({name}) {

	const {data, isFetching, isSuccess, isError, isPending} = useQuery("users", fetchUsers);

	if (isPending) {
		return <div className="flex justify-center h-40 items-center">
			<Loader size={32} className="text-dp-24 animate-spin"/>
		</div>;
	}

	if (isError) {
		return <div className="flex justify-center h-40 items-center">
			<ServerCrash size={32} className="text-red-500 animate-ping"/>
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