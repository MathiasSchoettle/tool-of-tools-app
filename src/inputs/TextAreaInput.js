import React, {useEffect, useState} from "react";
import classBuilder, {cond} from "../utils/ConditionalClassBuilder";

export default function TextAreaInput({name, errorMessage, onChange, label, errors, required = false, minLength = 0, maxLength = Infinity, autofocus = false, rows = 3}) {

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

	let inputClasses = classBuilder(
		'w-full rounded border shadow-md bg-dp-08 px-2 py-1.5 text-dp-32 text-xs resize-none',
		cond(validity.valid, 'border-dp-12 focus:border-dp-16', 'border-red-500 border-opacity-30 focus:border-red-400')
	);

	return (
		<div className="w-full flex flex-col">
			{label && <div className="flex justify-between text-xs h-5 mb-1">
				<div className="flex items-end h-full pl-1">
					<div className="text-dp-24">{label}</div>
					{required ? <div className="text-xs flex items-center pl-0.5 font-bold bg text-mn-500">*</div> : ''}
				</div>
				{!validity.valid && (
					<div className="h-full text-xs text-red-400 pr-1 flex items-end">
						{validity.error}
					</div>
				)}
			</div>}

			<textarea name={name} className={inputClasses} onChange={handleOnChange}
					  required={required} minLength={minLength} maxLength={maxLength} autoComplete="off"
					  autoFocus={autofocus} data-error-message={errorMessage} rows={rows}/>
		</div>
	);
}