import {useCallback, useEffect, useRef} from "react";

/**
 * Use this hook to programmatically emit an event on an element.
 *
 * @param type type of the emitted event e.g. 'change'
 * @param callback the function which should be called when the event occurs.
 * The event parameter will be passed to this callback
 */
export default function useEvent(type, callback) {
	const ref = useRef(null);
	const emit = useCallback(() => ref.current?.dispatchEvent(new Event(type)), [ref, type]);

	useEffect(() => {
		const eventCallback = (e) => callback(e);
		const current = ref.current;
		current?.addEventListener(type, eventCallback);
		return () => current?.removeEventListener(type, eventCallback);
	}, [type, callback]);

	return [ref, emit];
}