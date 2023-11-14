import React from "react";
import CustomInput from "./util/CustomInput";

export default function TimePickerInput({name, onChange, errors, label, required, disabled, readOnly, defaultValue, placeholder, min, max, step}) {

	const attributes = {
		name: name,
		required: required,
		disabled: disabled,
		readOnly: readOnly,
		defaultValue: defaultValue,
		placeholder: placeholder,
		min: min,
		max: max,
		step: step
	};

	return (
		<CustomInput onChange={onChange} errors={errors} label={label} attributes={attributes}>
			<input type="time"/>
		</CustomInput>
	);
}