import React, {useEffect, useRef, useState} from "react";
import classBuilder, {cond} from "../utils/ConditionalClassBuilder";
import {ChevronDown} from "lucide-react";
import {useOnClickOutside} from "../utils/ClickOutsideHook";
import CustomInput from "./util/CustomInput";
import useEvent from "./util/EventHook";

// FIXME this is not optimal
export default function SelectInput({name, onChange, errors, label, required, autofocus, options, initial}) {

	const [expanded, setExpanded] = useState(false)
	const expand = () => setExpanded(true);
	const collapse = () => setExpanded(false);

	const [selected, setSelected] = useState(initial)
	const contextMenuRef = useRef(null);
	const [ref, emitEvent] = useEvent('change', (e) => onChange?.(e));

	useEffect(() => {
		emitEvent();
	}, [selected, emitEvent]);

	useOnClickOutside(contextMenuRef, collapse);

	const select = (e, index) => {
		setSelected(index);
		collapse();
		e.stopPropagation();
	}

	const attributes = {
		name: name,
		required: required
	};

	const popupClasses = classBuilder(
		"w-full bg-dp-04 border border-dp-14 border-t-0 max-h-32 overflow-y-scroll no-scrollbar shadow-lg rounded-b flex-col p-1 gap-1",
		cond(expanded, 'flex', 'hidden')
	);

	return (
		// FIXME the usage of the custom input here is a bit scuffed, as it only expects one child to be passed in
		//  we should rework it to make it usable with custom inputs like this select
		<CustomInput errors={errors} label={label} attributes={attributes}>
			<input ref={ref} value={selected !== undefined ? options[selected].id : ""} className="hidden"/>

			<div tabIndex="0" className="relative flex items-center justify-between min-h-[32px] cursor-pointer" autoFocus={autofocus} onFocus={expand} onBlur={collapse} onClick={expand}>
				{selected !== undefined ? options[selected].value : "No Selection"}

				<ChevronDown size={16}/>

				<div className="absolute w-full left-0 top-0 translate-y-8 z-50 px-0.5">
					<div ref={contextMenuRef} className={popupClasses}>
						{options.map((element, index) =>
							<div key={index} onClick={(e) => select(e, index)} className="p-1 hover:bg-dp-14 rounded cursor-pointer">
								{element.value}
							</div>
						)}
					</div>
				</div>
			</div>
		</CustomInput>
	);
}