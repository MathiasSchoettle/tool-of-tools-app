import React from "react";

export default function SelectInput({name, onChange, children}) {

	const handleOnChange = (e) => {
		onChange(e.target.value);
	}

	return (
		<div className="flex flex-col w-full">

			{name && <div className="flex justify-between h-5 mb-1 text-xs">
				<div className="flex items-end h-full pl-1">
					<div className="text-dp-24">{name}</div>
				</div>
			</div>}

			<select onChange={handleOnChange} className="h-8 text-xs rounded shadow-md bg-dp-08 border-dp-12 focus:border-dp-16 focus:bg-dp-12 border text-dp-32 py-1 px-2 transition duration-100 cursor-pointer">
				{children}
			</select>
		</div>
	);
}