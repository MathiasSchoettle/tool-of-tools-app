import React, {useEffect, useState} from "react";
import classBuilder, {cond} from "../utils/ConditionalClassBuilder";

export default function DatePickerInput({name, onChange, errors, required, label, disabled}) {

	const [validity, setValidity] = useState({valid: true, error: ''});

	useEffect(() => {
		setValidity({
			valid: !errors || !errors?.length > 0,
			error: errors?.[0].error
		});
	}, [errors]);

	let inputClasses = classBuilder(
		'w-full rounded border shadow-md bg-dp-08 text-dp-32 text-xs h-8 cursor-pointer relative',
		cond(validity.valid, 'border-dp-12 focus:border-dp-16', 'border-red-500 border-opacity-30 focus:border-red-400'),
		cond(disabled, 'opacity-40')
	);

	return (
		<div className="w-full flex flex-col">
			{label && <div className="flex justify-between text-xs h-5 mb-1">
				<div className="flex items-end h-full pl-1">
					<div className="text-dp-24">{label}</div>
					{required ? <div className="text-xs flex items-center pl-0.5 font-bold bg text-mn-500">*</div> : ''}
				</div>
				{!validity.valid && (<div className="h-full text-xs text-red-400 pr-1 flex items-end">{validity.error}</div>)}
			</div>}

			<input className={inputClasses} style={{paddingLeft: '8px', paddingRight: '8px'}} type="date" disabled={disabled} name={name} required={required} onChange={onChange}/>
		</div>
	);
}