import React, {useContext, useState} from "react";
import ContextMenu, {initialContextMenu} from "../contextmenu/ContextMenu";
import ContextMenuItem from "../contextmenu/ContextMenuItem";
import {CalendarPlus, CalendarRange, RotateCcw} from "lucide-react";
import ContextMenuSpacer from "../contextmenu/ContextMenuSpacer";
import {ResetContext} from "./Calendar";
import MonthFullDayEventEntry from "./MonthFullDayEventEntry";
import MonthEventEntry from "./MonthEventEntry";
import Modal from "../modal/Modal";
import {useForm} from "../form/FormHook";
import EventForm from "./EventForm";

export default function MonthDayField({events, date, month}) {

	const [modalOpen, setModalOpen] = useState(false);
	const [contextMenu, setContextMenu] = useState(initialContextMenu);
	const reset = useContext(ResetContext);
	// FIXME move to form
	const [register, submit, clearErrors] = useForm();

	const handleContextMenu = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const {pageX, pageY} = e;
		setContextMenu({open: true, x: pageX, y: pageY});
	};

	const closeContextMenu = () => {
		setContextMenu(initialContextMenu);
	};

	const closeModal = () => {
		setModalOpen(false);
		clearErrors();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		console.log(Object.fromEntries(formData));
		closeModal();
	};

	return (
		<div
			className={'border-r border-b border-dp-12 flex whitespace-nowrap flex-col p-2 gap-2 ' + (month === date.getMonth() ? 'bg-dp-03 hover:bg-dp-04' : 'bg-dp-01 hover:bg-dp-02')}
			onContextMenu={handleContextMenu}
			onDoubleClick={() => setModalOpen(true)}>
			<div className="w-full flex text-dp-16 justify-between items-center gap-2 pr-1 font-bold">

				{/*TODO*/}
				{date.getDate() === 22 || false ?
					<div className="flex text-sm font-medium w-full h-full gap-2 overflow-hidden">
						<MonthFullDayEventEntry text={"Muttertag"}/>
					</div>
					:
					''
				}

				<div className={month === date.getMonth() ? '' : 'text-dp-12'}>
					{date.getDate()}
				</div>
			</div>

			<div className="w-full flex-grow overflow-hidden">
				{events.map((event, index) => (
					<MonthEventEntry key={index} event={event}/>
				))}
			</div>

			<Modal open={modalOpen} doClose={closeModal}>
				<EventForm register={register} onSubmit={submit(handleSubmit)} closeModal={closeModal}/>
			</Modal>

			<ContextMenu content={contextMenu} closeMenu={closeContextMenu}>
				<ContextMenuItem onClick={() => setModalOpen(true)}>
					<CalendarPlus size={16}/>
					<div>Create new Event</div>
				</ContextMenuItem>

				<ContextMenuSpacer/>

				<ContextMenuItem>
					<CalendarRange size={16}/>
					<div>View Week</div>
				</ContextMenuItem>

				<ContextMenuItem onClick={reset}>
					<RotateCcw size={16}/>
					<div>Reset View</div>
				</ContextMenuItem>
			</ContextMenu>
		</div>
	);
}