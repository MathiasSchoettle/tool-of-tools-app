import React, {useEffect, useState} from "react";
import classBuilder, {cond} from "../utils/ConditionalClassBuilder";

export default function TimePickerInput({name, onChange, errors, label, required, disabled}) {

	const [validity, setValidity] = useState({valid: true, error: ''});

	useEffect(() => {
		setValidity({
			valid: !errors || !errors?.length > 0,
			error: errors?.[0].error
		});
	}, [errors]);

	let inputClasses = classBuilder(
		'w-full rounded border shadow-md bg-dp-08 px-2  text-xs h-8',
		cond(validity.valid, 'border-dp-12 focus:border-dp-16', 'border-red-500 border-opacity-30 focus:border-red-400'),
		cond(disabled, 'text-dp-16', 'text-dp-32')
	);

	let labelClasses = classBuilder(
		'text-dp-24',
		cond(disabled, 'line-through')
	);

	return (
		<div className="w-full flex flex-col">
			{label && <div className="flex justify-between text-xs h-5 mb-1">
				<div className="flex items-end h-full pl-1">
					<div className={labelClasses}>{label}</div>
					{required ? <div className="text-xs flex items-center pl-0.5 font-bold bg text-mn-500">*</div> : ''}
				</div>
				{!validity.valid && (
					<div className="h-full text-xs text-red-400 pr-1 flex items-end">
						{validity.error}
					</div>
				)}
			</div>}

			<input type="time" disabled={disabled} name={name} required={required} onChange={onChange}
				   className={inputClasses}/>
		</div>
	);
}