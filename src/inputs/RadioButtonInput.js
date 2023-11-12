import React from "react";
import classBuilder, {cond} from "../utils/ConditionalClassBuilder";

export default function RadioButtonInput({label, value, checked, onChange}) {
	const changed = () => {
		onChange(value);
	}

	const insideClasses = classBuilder(
		"w-full h-full border border-mn-500 bg-mn-500 rounded-full transition duration-100",
		cond(checked, "scale-1", "scale-0")
	);

	const outsideClasses = classBuilder(
		"bg-dp-08 border w-3.5 rounded-full aspect-square p-0.5 transition duration-100",
		cond(checked, "border-mn-600", "border-dp-16")
	);

	return (
		<div className="w-full items-center gap-2 flex cursor-pointer h-8" onClick={changed}>
			<div className={outsideClasses}>
				<div className={insideClasses}/>
			</div>

			<div>
				{label}
			</div>
		</div>
	);
}