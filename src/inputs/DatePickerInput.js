import React from "react";
import CustomInput from "./util/CustomInput";

export default function DatePickerInput({name, onChange, errors, label, required, disabled, defaultValue, readOnly, min, max, step}) {

	const attributes = {
		name: name,
		required: required,
		disabled: disabled,
		defaultValue: defaultValue,
		readOnly: readOnly,
		min: min,
		max: max,
		step: step
	};

	return (
		<CustomInput onChange={onChange} errors={errors} label={label} attributes={attributes}>
			<input type="date"/>
		</CustomInput>
	);
}