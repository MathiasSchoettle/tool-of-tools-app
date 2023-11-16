import {useRef, useState} from "react";

function errorMessage(target) {

	let validity = target.validity;
	let customErrorMessage = target.getAttribute('data-error-message');

	if (validity.valid) return;
	if (customErrorMessage) return customErrorMessage;

	if (validity.badInput) return 'bad value';
	if (validity.valueMissing) return `Required`;

	if (validity.patternMismatch) return `${target.name} not matching pattern (${target.pattern})`;

	if (validity.tooShort) return `${target.name} too short (min: ${target.minLength})`;
	if (validity.tooLong) return `${target.name} too long (max: ${target.maxLength})`;

	if (validity.rangeUnderflow) return `${target.name} too low (min: ${target.min})`;
	if (validity.rangeOverflow) return `${target.name} too high (max: ${target.max})`;
	if (validity.stepMismatch) return `step mismatch (step: ${target.step})`;

	if (validity.typeMismatch) {
		if (target.type === 'email') return 'not a valid email';
		if (target.type === 'url') return 'not a valid url';
	}

	return 'unknown error';
}

export function useForm() {
	const inputs = useRef(new Map());
	const [errors, setErrors] = useState(new Map());

	/**
	 * Register an input to the form hook
	 *
	 * @param name The key of the submitted value in the form
	 * @param listener An optional listener for the input onChange event
	 * @returns {onChange, name, errors} attributes for the input
	 */
	const register = (name, listener) => {

		let onChange = (e) => {
			const target = e.target;
			const value = target?.value;

			if (value && inputs.current.get(target.name)) {
				inputs.current.get(target.name).value = value;
			}

			listener?.(value);
		}

		inputs.current.set(name, {
			name: name,
			valid: true
		});

		return {name: name, onChange: onChange, errors: errors.get(name)};
	};

	/**
	 * Creates a function which is passed to the controlled form submit attribute
	 * It will handle the default form validation e.g. required fields
	 * If no errors in the form exist the passed handleSubmit function is called
	 *
	 * @param handleSubmit function which is called when the form validation succeeds
	 * @returns the form submit function
	 */
	const createSubmit = (handleSubmit) => {
		return (e) => {
			e.preventDefault();
			let err = new Map();

			inputs.current.forEach((v, k) => {

				if (!e.target[k]) return;

				let message = errorMessage(e.target[k]);
				if (message) {
					if (!err.has(k)) err.set(k, []);

					err.get(k).push({error: message});
				}
			});

			setErrors(err);

			if (err.size === 0) {
				handleSubmit(e);
			}
		};
	};

	const addError = () => {
		// FIXME a way of adding errors from custom validations
		console.error("NOT IMPLEMENTED YET");
	};

	return [register, createSubmit, addError];
}