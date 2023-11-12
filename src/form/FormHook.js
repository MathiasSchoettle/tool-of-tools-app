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

	const register = (name) => {
		let onChange = (e) => {
			const target = e.target;
			inputs.current.get(target.name).value = target.value;
		}

		inputs.current.set(name, {
			name: name,
			valid: true
		});

		return {name: name, onChange: onChange, errors: errors.get(name)};
	};

	const submit = (handleSubmit) => {
		return (e) => {
			e.preventDefault();
			let err = new Map();

			inputs.current.forEach((v, k) => {

				console.log(v,k)

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

	return [register, submit, () => setErrors(new Map())];
}