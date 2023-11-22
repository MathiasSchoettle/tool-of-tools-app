import {monthName} from '../utils/DateUtils'
import {ChevronDown} from 'lucide-react'
import React, {createContext, useState} from 'react'
import IconButton from '../inputs/button/IconButton'
import MonthView from "./MonthView";

export const ResetContext = createContext(null);

export default function Calendar() {

	// TODO make these part of context ?
	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());

	const [events] = useState([
		{
			id: 1,
			deviationId: null,
			start: '2023-09-01T11:30:00+0100',
			duration: 3600,
			content: {
				title: 'Work Event',
				description: 'Description for my awesome event so long and long and long and long long',
				location: 'OTH Regensburg',
				link: ''
			},
			categoryName: 'category',
			color: '#f1e13a'
		},
		{
			id: 2,
			deviationId: null,
			start: '2023-08-10T12:00:00+0100',
			duration: 3600,
			content: {
				title: 'My Birthday',
				description: 'well duh',
				location: 'at home',
				link: ''
			},
			categoryName: 'category',
			color: '#d34c38'
		}
	]);

	const reset = () => {
		let d = new Date();
		setMonth(d.getMonth());
		setYear(d.getFullYear());
	}

	return (
		<div className="h-full w-full flex flex-col select-none overflow-hidden">
			<div className="w-full text-xs text-dp-24 h-8 border-b border-dp-12 flex items-center justify-center gap-1">
				<div onClick={reset}
					 className="text-center w-24 bg-white bg-opacity-0 hover:bg-opacity-5 rounded py-0.5">
					{monthName(month)} {year}
				</div>

				<IconButton>
					<ChevronDown size={12}/>
				</IconButton>
			</div>

			<ResetContext.Provider value={reset}>
				<MonthView events={events} month={month} setMonth={setMonth} year={year} setYear={setYear}/>
			</ResetContext.Provider>
		</div>
	);
}
