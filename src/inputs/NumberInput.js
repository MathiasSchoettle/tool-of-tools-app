import React, {useEffect, useState} from "react";
import classBuilder, {cond} from "../utils/ConditionalClassBuilder";

export default function NumberInput({
										name,
										onChange,
										errors,
										required = false,
										disabled = false,
										min = 0,
										max = Infinity,
										initial,
										step = 1,
										autofocus = false,
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

	let inputClasses = classBuilder(
		'rounded border shadow-md bg-dp-08 px-2 text-dp-32 text-xs h-8 appearance-none text-xs',
		cond(validity.valid, 'border-dp-12 focus:border-dp-16', 'border-red-500 border-opacity-30 focus:border-red-400'),
		cond(disabled, 'opacity-40')
	);

	return (
		<div className="w-full flex flex-col">

			{name && <div className="flex justify-between h-5 mb-1 text-xs">
				<div className="flex items-end h-full pl-1">
					<div className="text-dp-24">{name}</div>
					{required ? <div className="text-xs flex items-center pl-0.5 font-bold bg text-mn-500">*</div> : ''}
				</div>
				{!validity.valid && (
					<div className="h-full text-xs text-red-400 pr-1 flex items-end">
						{validity.error}
					</div>
				)}
			</div>}

			<input type="number" name={name} className={inputClasses} onChange={handleOnChange}
				   required={required} min={min} max={max} step={step} autoComplete="off"
				   disabled={disabled}
				   autoFocus={autofocus} defaultValue={initial}/>
		</div>
	);
}