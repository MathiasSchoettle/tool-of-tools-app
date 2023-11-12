import React, {useEffect, useState} from "react";
import {Calendar} from "lucide-react";

export default function MonthPickerInput({
											 name,
											 errorMessage,
											 onChange,
											 errors,
											 required = false
										 }) {

	const [validity, setValidity] = useState({valid: true, error: ''});

	useEffect(() => {
		setValidity({
			valid: !errors || !errors?.length > 0,
			error: errors?.[0].error
		});
	}, [errors]);

	const handleOnChange = (e) => {
		onChange?.(e);
	}

	return (
		<div className="w-full flex flex-col">

			<div className="flex justify-between text-xs h-5 mb-1">
				<div className="flex items-end h-full pl-1">
					<div className="text-dp-24">{name}</div>
					{required ? <div className="text-xs flex items-center pl-0.5 font-bold bg text-mn-500">*</div> : ''}
				</div>
			</div>

			<div tabIndex="0" className="text-xs w-full rounded border shadow-md bg-dp-08 px-2 py-1.5 text-dp-32 border-dp-12 focus:border-dp-16 flex justify-between items-center cursor-pointer relative">
				<div>
					Feb. 2024
				</div>

				<div className="aspect-square">
					<Calendar size={15}/>

				</div>

				<div className="absolute w-36 h-40 rounded bg-dp-08 border border-dp-14 shadow-lg top-0">
					<div></div>
				</div>
			</div>
			<input hidden={true} name={name} type="month" onChange={handleOnChange} className=""/>

			<div className="h-5 pt-0.5 flex items-start">
				{!validity.valid && (
					<div className="text-xs text-red-400 pl-1">
						{validity.error}
					</div>
				)}
			</div>
		</div>
	);
}