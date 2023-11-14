import CustomInput from "./util/CustomInput";

export default function PasswordInput({onChange, errors, label, name, required, disabled, autofocus, maxLength, minLength, pattern, readOnly}) {

	const attributes = {
		name: name,
		required: required,
		disabled: disabled,
		autoFocus: autofocus,
		maxLength: maxLength,
		minLength: minLength,
		pattern: pattern,
		readOnly: readOnly
	};

	return (
		<CustomInput onChange={onChange} errors={errors} label={label} attributes={attributes}>
			<input type="password"/>
		</CustomInput>
	);
}