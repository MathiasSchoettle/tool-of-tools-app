import {useEffect, useState} from "react";

export default function useValidity(errors) {

	const [validity, setValidity] = useState({valid: true, error: ''});

	useEffect(() => {
		setValidity({
			valid: !errors || !errors?.length > 0,
			error: errors?.[0]?.error
		});
	}, [errors]);

	return validity;
}