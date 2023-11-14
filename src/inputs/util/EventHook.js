import {useEffect, useRef} from "react";

export default function useEvent(name, callback) {
	const ref = useRef(null);
	useEffect(() => {
		ref.current?.addEventListener(name, callback);
		return () => ref.current?.removeEventListener(name, callback);
	}, [ref.current, name, callback]);
	return [ref, () => ref.current?.dispatchEvent(new Event(name))];
}