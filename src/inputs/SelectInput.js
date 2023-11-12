import React, {useEffect, useRef, useState} from "react";
import classBuilder, {cond} from "../utils/ConditionalClassBuilder";
import {ChevronDown} from "lucide-react";
import {useOnClickOutside} from "../utils/ClickOutsideHook";
import InputLabel from "./util/InputLabel";
import useValidity from "./util/ValidityFormHook";

export default function SelectInput({name, onChange, errors, label, required, autofocus, listener, options, initial}) {

	const [expanded, setExpanded] = useState(false)
	const [selected, setSelected] = useState(initial)
	const validity = useValidity(errors);

	const contextMenuRef = useRef(null);
	useOnClickOutside(contextMenuRef, () => setExpanded(false));

	const select = (e, index) => {
		setSelected(index);
		setExpanded(false);
		listener?.(options[index]);
		e.preventDefault();
		e.stopPropagation();
	}

	const build = () => {
		return options.map((element, index) => {
			return <div key={index} onClick={(e) => select(e, index)}
						className="p-1 hover:bg-dp-14 rounded cursor-pointer">
				{element.value}
			</div>
		});
	}

	const getId = () => {
		if (selected !== undefined) return options[selected].id;
		return "";
	};

	const selection = () => {
		if (selected !== undefined) return options[selected].value;
		return "No Selection"
	};

	let inputClasses = classBuilder(
		'w-full rounded border shadow-md bg-dp-08 px-2 text-dp-32 text-xs h-8',
		'relative flex items-center justify-between min-h-[32px] cursor-pointer',
		cond(validity.valid, 'border-dp-12 focus:border-dp-16', 'border-red-500 border-opacity-30 focus:border-red-400')
	);

	const popupClasses = classBuilder(
		"w-full bg-dp-04 border border-dp-14 border-t-0 max-h-32 overflow-y-scroll no-scrollbar shadow-lg rounded-b flex flex-col p-1 gap-1",
		cond(!expanded, 'hidden')
	);

	const expand = () => setExpanded(true);
	const collapse = () => setExpanded(false);

	return (
		<div className="w-full text-xs text-dp-32">
			<InputLabel labelName={label} validity={validity} required={required}/>

			<div tabIndex="0" className={inputClasses} autoFocus={autofocus} onFocus={expand} onBlur={collapse} onClick={expand}>
				{selection()}

				<ChevronDown size={16}/>

				<div className="absolute w-full left-0 top-0 translate-y-8 z-50 px-0.5">
					<div ref={contextMenuRef} className={popupClasses}>
						{build()}
					</div>
				</div>
			</div>

			<select name={name} className="hidden" onChange={onChange} required={required}>
				<option value={getId()}>Hello</option>
			</select>
		</div>
	);
}