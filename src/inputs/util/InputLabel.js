import React from "react";
import classBuilder, {cond} from "../../utils/ConditionalClassBuilder";


export default function InputLabel({labelName, validity, required, disabled}) {

	if (!labelName) return <></>;

	const labelClasses = classBuilder(
		'text-dp-24',
		cond(disabled, 'line-through')
	)

	return (
		<div className="flex justify-between text-xs h-5 mb-1">
			<div className="flex items-end h-full pl-1">
				<div className={labelClasses}>{labelName}</div>
				{(required && !disabled) ? <div className="text-xs flex items-center pl-0.5 font-bold bg text-mn-500">*</div> : ''}
			</div>
			{!validity.valid && (
				<div className="h-full text-xs text-red-400 pr-1 flex items-end">
					{validity.error}
				</div>
			)}
		</div>
	);
}