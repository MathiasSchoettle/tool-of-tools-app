import React from "react";
import classBuilder, {cond} from "../utils/ConditionalClassBuilder";
import useValidity from "./util/ValidityFormHook";
import InputLabel from "./util/InputLabel";

export default function TextAreaInput({name, onChange, errors, label, required, autofocus, minLength = 0, maxLength = Infinity, rows = 3}) {

	const validity = useValidity(errors);

	const handleOnChange = (e) => {
		onChange?.(e);
	}

	let inputClasses = classBuilder(
		'w-full rounded border shadow-md bg-dp-08 px-2 py-1.5 text-dp-32 text-xs resize-none',
		cond(validity.valid, 'border-dp-12 focus:border-dp-16', 'border-red-500 border-opacity-30 focus:border-red-400')
	);

	return (
		<div className="w-full flex flex-col">
			<InputLabel labelName={label} validity={validity} required={required}/>

			<textarea name={name} className={inputClasses} onChange={handleOnChange}
					  required={required} autoFocus={autofocus}
					  autoComplete="off" rows={rows} minLength={minLength} maxLength={maxLength}/>
		</div>
	);
}