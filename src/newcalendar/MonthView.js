import React from "react";
import MonthDayField from "./MonthDayField";
import {addDays, sameDay} from "../utils/DateUtils";

export default function MonthView({events, month, setMonth, year, setYear}) {

	const onScroll = (e) => {
		let newMonth = month + (e.deltaY > 0 ? 1 : -1);

		if (newMonth === 12) {
			setYear(year + 1);
			newMonth = 0;
		}

		if (newMonth === -1) {
			setYear(year - 1);
			newMonth = 11;
		}

		setMonth(newMonth);
	}

	const getDays = () => {
		let start = new Date(year, month, 1);
		let daysToSubtract = (start.getDay() + 6) % 7;
		start.setDate(start.getDate() - daysToSubtract);

		let days = [];

		for (let i = 0; i < 6; ++i) {
			let current = new Date(start);
			current.setDate(start.getDate() + i * 7);

			for (let j = 0; j < 7; ++j) {
				let date = addDays(current, j);
				let dayEvents = events.filter((e) => sameDay(new Date(e.start), date));
				days.push(
					<MonthDayField key={i + '-' + j} events={dayEvents} date={date} month={month}/>
				);
			}
		}

		return days;
	}

	return (
		<div onWheel={onScroll} className="grid grid-cols-7 grid-rows-6 w-full h-full min-h-0 min-w-0">
			{getDays()}
		</div>
	);
}