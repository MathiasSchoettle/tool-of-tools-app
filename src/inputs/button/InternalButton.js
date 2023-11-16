import classBuilder, {cond} from "../../utils/ConditionalClassBuilder";
import React from "react";

export function InternalButton({type = "button", disabled, onClick, content, className}) {

	const classes = classBuilder(
		'text-sm rounded border border-transparent font-medium h-fit py-1 px-3 transition duration-75',
		className,
		cond(disabled, 'opacity-50')
	);

	return (
		<button type={type} disabled={disabled} className={classes} onClick={onClick}>
			{content}
		</button>
	);
}