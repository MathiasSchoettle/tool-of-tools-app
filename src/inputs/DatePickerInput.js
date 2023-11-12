import React from "react";
import classBuilder, {cond} from "../utils/ConditionalClassBuilder";
import useValidity from "./util/ValidityFormHook";
import InputLabel from "./util/InputLabel";

export default function DatePickerInput({name, onChange, errors, label, required}) {

	const validity = useValidity(errors);

	let inputClasses = classBuilder(
		'w-full rounded border shadow-md bg-dp-08 px-2 text-dp-32 text-xs h-8',
		cond(validity.valid, 'border-dp-12 focus:border-dp-16', 'border-red-500 border-opacity-30 focus:border-red-400')
	);

	return (
		<div className="w-full flex flex-col">
			<InputLabel labelName={label} validity={validity} required={required}/>

			<input type="date" name={name} className={inputClasses} onChange={onChange} required={required}/>
		</div>
	);
}