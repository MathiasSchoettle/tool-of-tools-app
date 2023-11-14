import React from "react";
import CustomInput from "./util/CustomInput";

export default function NumberInput({name, onChange, errors, label, required, min, max, placeholder, disabled, readOnly, defaultValue, step, autofocus}) {

	const attributes = {
		name: name,
		required: required,
		disabled: disabled,
		readOnly: readOnly,
		autoFocus: autofocus,
		min: min,
		max: max,
		placeholder: placeholder,
		defaultValue: defaultValue,
		step: step
	};

	return (
		<CustomInput onChange={onChange} errors={errors} label={label} attributes={attributes}>
			<input type="number"/>
		</CustomInput>
	);
}