import React, {Children} from "react";
import classBuilder, {cond} from "../../utils/ConditionalClassBuilder";
import useValidity from "./ValidityFormHook";
import InputLabel from "./InputLabel";

export default function CustomInput({onChange, errors, label, attributes, children, grow}) {

	const validity = useValidity(errors);

	const handleOnChange = (e) => {
		onChange?.(e);
	}

	let inputClasses = classBuilder(
		'w-full rounded border shadow-md bg-dp-08 px-2 text-dp-32 text-xs',
		cond(!grow, 'h-8'),
		cond(attributes?.disabled, 'bg-opacity-30 border-opacity-70 text-dp-16'),
		cond(validity.valid, 'border-dp-12 focus:border-dp-16', 'border-red-500 border-opacity-40 focus:border-red-400')
	);

	const getInput = () => {
		return Children.map(children, child =>
			React.cloneElement(
				child,
				{
					className: `${inputClasses} ${child.props.className}`,
					onChange: handleOnChange,
					autoComplete: "off",
					...attributes
				}
			)
		)
	}

	return (
		<div className="w-full flex flex-col ">
			<InputLabel labelName={label} validity={validity} required={attributes?.required} disabled={attributes?.disabled}/>
			{getInput()}
		</div>
	);
}