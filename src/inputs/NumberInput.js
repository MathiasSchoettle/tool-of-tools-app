import React from "react";
import classBuilder, {cond} from "../utils/ConditionalClassBuilder";
import useValidity from "./util/ValidityFormHook";
import InputLabel from "./util/InputLabel";

export default function NumberInput({name, onChange, errors, label, required, min = 0, max = Infinity, initial, step = 1, autofocus}) {

	const validity = useValidity(errors);

	const handleOnChange = (e) => {
		onChange?.(e);
	}

	let inputClasses = classBuilder(
		'rounded border shadow-md bg-dp-08 px-2 text-dp-32 text-xs h-8 appearance-none text-xs',
		cond(validity.valid, 'border-dp-12 focus:border-dp-16', 'border-red-500 border-opacity-30 focus:border-red-400')
	);

	return (
		<div className="w-full flex flex-col">
			<InputLabel labelName={label} validity={validity} required={required}/>

			<input type="number" name={name} className={inputClasses} onChange={handleOnChange}
				   required={required} autoFocus={autofocus} autoComplete="off"
				   min={min} max={max} step={step} defaultValue={initial}/>
		</div>
	);
}