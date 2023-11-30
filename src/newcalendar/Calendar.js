import {LayoutGrid, X} from 'lucide-react'
import React, {createContext, useState} from 'react'
import IconButton from '../inputs/button/IconButton'
import MonthView from "./MonthView";
import Modal from "../modal/Modal";

export const ResetContext = createContext(null);

export default function Calendar() {

	// TODO make these part of context ?
	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());

	const [categoryModalOpen, setCategoryModalOpen] = useState(false);

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
		<div className="h-full w-full flex flex-col select-none  overflow-hidden ">
			<div className="w-full text-xs text-dp-24 h-10 border-b border-dp-12 flex items-center justify-end px-2 gap-1">
				<div>
					{/*TODO UI Elements to input year / month, switch between week and month*/}
				</div>

				<IconButton onClick={() => setCategoryModalOpen(true)}>
					<LayoutGrid size={18}/>
				</IconButton>
			</div>

			<div className="w-full h-full flex">
				{/*FIXME could we pass in a whole object in context containing the date, reset and other stuff?*/}
				<ResetContext.Provider value={reset}>
					<MonthView events={events} month={month} setMonth={setMonth} year={year} setYear={setYear}/>
				</ResetContext.Provider>
			</div>

			<Modal open={categoryModalOpen} doClose={() => setCategoryModalOpen(false)}>
				<div className="p-2 flex flex-col select-none gap-4 w-96 h-48">
					<div className="flex w-full items-center justify-between pl-1 text-dp-24">
						<div className="flex items-center gap-2">
							<LayoutGrid size={16}/>
							<div className="text-sm font-medium pt-0.5">Categories</div>
						</div>
						<IconButton onClick={() => setCategoryModalOpen(false)}>
							<X size={16}/>
						</IconButton>
					</div>
				</div>
			</Modal>
		</div>
	);
}
