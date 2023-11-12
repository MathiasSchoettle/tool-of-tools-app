import React, {useEffect, useRef, useState} from "react";
import classBuilder, {cond} from "../utils/ConditionalClassBuilder";
import {ChevronDown} from "lucide-react";
import {useOnClickOutside} from "../utils/ClickOutsideHook";

export default function NewSelectInput({name, onChange, errors, required = false, autofocus = false, options, initial}) {

	const [expanded, setExpanded] = useState(false)
	const [selected, setSelected] = useState(initial)

	const [validity, setValidity] = useState({valid: true, error: ''});

	useEffect(() => {
		setValidity({
			valid: !errors || !errors?.length > 0,
			error: errors?.[0].error
		});
	}, [errors]);

	const contextMenuRef = useRef(null);
	useOnClickOutside(contextMenuRef, () => setExpanded(false));

	const classes = classBuilder(
		"w-full bg-dp-04 border border-dp-14 max-h-32 overflow-y-scroll no-scrollbar shadow-lg rounded flex flex-col p-1 gap-1",
		cond(!expanded, 'hidden')
	)

	const select = (e, index) => {
		setSelected(index);
		setExpanded(false);
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
		'w-full relative flex items-center justify-between px-2 min-h-[32px] rounded shadow-md bg-dp-08 cursor-pointer border',
		cond(validity.valid, 'border-dp-12 focus:border-dp-16', 'border-red-500 border-opacity-30 focus:border-red-400')
	);

	return (
		<div className="w-full text-xs text-dp-32">
			{name && <div className="flex justify-between text-xs h-5 mb-1">
				<div className="flex items-end h-full pl-1">
					<div className="text-dp-24">{name}</div>
					{required ? <div className="text-xs flex items-center pl-0.5 font-bold bg text-mn-500">*</div> : ''}
				</div>
				{!validity.valid && (
					<div className="h-full text-xs text-red-400 pr-1 flex items-end">
						{validity.error}
					</div>
				)}
			</div>}

			<div tabIndex="0"
				 autoFocus={autofocus}
				 onFocus={() => setExpanded(true)}
				 onBlur={() => setExpanded(false)}
				 onClick={() => setExpanded(true)}
				 className={inputClasses}>

				{selection()}

				<ChevronDown size={16}/>

				<div className="absolute w-full left-0 top-0 translate-y-8 mt-2 z-50">
					<div ref={contextMenuRef} className={classes}>
						{build()}
					</div>
				</div>
			</div>

			<select name={name} required={required} className="hidden">
				<option value={getId()}>Hello</option>
			</select>
		</div>
	);
}