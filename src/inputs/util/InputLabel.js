import React from "react";


export default function InputLabel({labelName, required, validity}) {

	if (!labelName) return <></>;

	return (
		<div className="flex justify-between text-xs h-5 mb-1">
			<div className="flex items-end h-full pl-1">
				<div className="text-dp-24">{labelName}</div>
				{required ? <div className="text-xs flex items-center pl-0.5 font-bold bg text-mn-500">*</div> : ''}
			</div>
			{!validity.valid && (
				<div className="h-full text-xs text-red-400 pr-1 flex items-end">
					{validity.error}
				</div>
			)}
		</div>
	);
}