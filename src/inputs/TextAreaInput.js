import React from "react";
import CustomInput from "./util/CustomInput";

export default function TextAreaInput({name, onChange, errors, label, required, disabled, autofocus, minLength = 0, maxLength = Infinity, rows = 3}) {

	const attributes = {
		name: name,
		required: required,
		disabled: disabled,
		autoFocus: autofocus,
		minLength: minLength,
		maxLength: maxLength,
		rows: rows
	};

	return (
		<CustomInput onChange={onChange} errors={errors} label={label} attributes={attributes} grow>
			<textarea className="resize-none py-1.5"/>
		</CustomInput>
	);
}