import React, {useContext, useState} from "react";
import ContextMenu, {initialContextMenu} from "../contextmenu/ContextMenu";
import Tooltip from "../tooltip/Tooltip";
import {Calendar as CalendarLucide, CalendarPlus, CalendarRange, Clock3, FileText, RotateCcw} from "lucide-react";
import ContextMenuItem from "../contextmenu/ContextMenuItem";
import DeleteContextMenuItem from "../contextmenu/DeleteContextMenuItem";
import ContextMenuSpacer from "../contextmenu/ContextMenuSpacer";
import {ResetContext} from "./Calendar";

export default function MonthEventEntry({event}) { // title, time, hexColor

	const [contextMenu, setContextMenu] = useState(initialContextMenu);
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const [bounds, setBounds] = useState({left: 0, right: 0, top: 0, bottom: 0});

	const reset = useContext(ResetContext);

	let date = new Date(event.start);
	let style = {
		backgroundColor: event.color
	};

	const handleContextMenu = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const {pageX, pageY} = e;
		setContextMenu({open: true, x: pageX, y: pageY});
		setTooltipOpen(false);
	};

	const closeContextMenu = () => {
		setContextMenu(initialContextMenu);
	};

	const handleMouseEnter = (e) => {
		if (contextMenu.open) return;
		setTooltipOpen(true);
		let {left, right, top, bottom} = e.currentTarget.getBoundingClientRect();
		setBounds({
			left: left,
			right: right,
			top: top,
			bottom: bottom
		});
	};

	return (
		<div className="text-sm text-dp-24 h-6 flex items-center gap-1 rounded hover:bg-dp-08 px-1 cursor-pointer"
			 onContextMenu={handleContextMenu} onMouseEnter={handleMouseEnter}
			 onMouseLeave={() => setTooltipOpen(false)}>

			<div className="h-2 aspect-square rounded" style={style}/>
			<div className="font-bold">
				{date.getHours() + ':' + date.getMinutes()}
			</div>
			<div className="overflow-hidden overflow-ellipsis">
				{event.content.title}
			</div>

			<>
				{tooltipOpen && (
					<Tooltip open={tooltipOpen} bounds={bounds}>
						<div className="flex flex-col text-dp-24 gap-1 max-w-xs overflow-ellipsis">
							<div className="flex w-full items-center">
								<div className="w-6 flex">
									<div className="w-4 flex justify-center">
										<div className="h-3 aspect-square rounded"
											 style={{backgroundColor: event.color}}></div>
									</div>
								</div>
								<div className="font-bold">
									{event.content.title}
								</div>
							</div>

							<div className="flex items-center text-sm">
								<div className="w-6 flex">
									<Clock3 size={16}/>
								</div>
								<div>
									{date.toGMTString()}
								</div>
							</div>

							<div className="flex items-center text-sm">
								<div className="w-6 flex">
									<FileText size={16}/>
								</div>
								<div className="whitespace-normal break-words">
									{event.content.description}
								</div>
							</div>
						</div>
					</Tooltip>
				)}
			</>

			<ContextMenu content={contextMenu} closeMenu={closeContextMenu}>
				<ContextMenuItem>
					<CalendarLucide size={16}/>
					<div>Edit Event</div>
				</ContextMenuItem>

				<DeleteContextMenuItem enabled={false} text={"Delete Event"}/>

				<ContextMenuSpacer/>

				<ContextMenuItem>
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