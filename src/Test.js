import {CrossIcon} from "lucide-react";
import DangerButton from "./inputs/button/DangerButton";
import useQuery from "./query/QueryHook";

const fetchUsers = async () => {
	const index = Math.floor(Math.random() * 9 + 1);
	const res = await fetch('https://jsonplaceholder.typicode.com/users/' + index);

	await new Promise(r => setTimeout(r, 1000));

	if (!res.ok ) throw new Error("Alarm");

	return res.json();
};

export default function Test({name}) {

	const {data} = useQuery("users", fetchUsers);

	if (!data) {
		return <div className="flex justify-center">
			<CrossIcon className="text-red-500 animate-spin"/>
		</div>;
	}

	return <div className="p-5 text-dp-24 gap-4 flex flex-col items-center">
			<div className="flex flex-col gap-1 p-1 bg-dp-00 rounded">
				<p>{data?.id}</p>
				<p>{data?.website}</p>
				<p>{data?.username}</p>
				<p>{data?.email}</p>
				<DangerButton content="Refetch"/>
			</div>
	</div>;
}