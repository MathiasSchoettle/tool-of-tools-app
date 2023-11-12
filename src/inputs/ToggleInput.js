import React, {useState} from "react";
import classBuilder, {cond} from "../utils/ConditionalClassBuilder";

// FIXME improve and update for forms
export default function ToggleInput({name, errorMessage, onChange,}) {

	const [checked, setChecked] = useState(false);

	let style = {
		marginLeft: checked ? '20px' : 0
	}

	const handleOnChange = (e) => {
		onChange?.(e);
	}

	const toggle = () => {
		setChecked(prev => !prev);
	}

	let bobbleClasses = classBuilder(
		'duration-200 h-full aspect-square left-4 rounded-full',
		cond(checked, 'bg-dp-24', 'bg-dp-14')
	);

	let containerClasses = classBuilder(
		'duration-200 w-10 h-full border shadow p-0.5 cursor-pointer rounded-full bg-dp-00 border-dp-12',
		cond(checked, '', '')
	);

	return (
		<div className="flex h-5">

			<div className={containerClasses} onClick={toggle}>
				<div className={bobbleClasses} style={style}></div>
			</div>

			<input className="hidden" type="checkbox" checked={checked} name={name} onChange={handleOnChange} data-error-message={errorMessage} value="true"/>
		</div>
	);
}