import React from "react";
import CustomInput from "./util/CustomInput";

export default function TextInput({name, onChange, errors, label, required, readOnly, placeholder, disabled, autofocus, minLength, maxLength, pattern}) {

	const attributes = {
		name: name,
		required: required,
		disabled: disabled,
		readOnly: readOnly,
		placeholder: placeholder,
		autoFocus: autofocus,
		minLength: minLength,
		maxLength: maxLength,
		pattern: pattern
	};

	return (
		<CustomInput onChange={onChange} errors={errors} label={label} attributes={attributes}>
			<input type="text"/>
		</CustomInput>
	);
}