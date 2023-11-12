import React from "react";

export default function MonthFullDayEventEntry({text}) {
	return (
		<div className="flex items-center bg-dp-08 rounded p-0.5 px-2 text-dp-24">
			{text}
		</div>
	);
}