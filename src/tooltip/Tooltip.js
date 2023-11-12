import React, {useEffect, useRef, useState} from "react";

// TODO should be more generic with placement and offsets
// FIXME does this even work
export default function Tooltip({open, bounds, children}) {
	const ref = useRef(null);
	const [style, setStyle] = useState({
		left: 0,
		top: 0,
		opacity: 0
	});

	useEffect(() => {
		let offset = 5;
		let halfHeight = (bounds.bottom - bounds.top) / 2;

		let x = bounds.right + offset;
		let y = bounds.top + halfHeight;

		if (x + ref.current.offsetWidth > window.innerWidth) {
			x -= ref.current.offsetWidth + bounds.right - bounds.left + 2 * offset;
		}

		let difference = y + ref.current.offsetHeight / 2 + halfHeight - window.innerHeight;
		if (difference > 0) {
			y -= difference + offset;
		}

		setStyle({
			left: x + 'px',
			top:  y + 'px',
			opacity: 1
		})
	}, []);

	return (
		<div ref={ref} style={style} className="pointer-events-none z-50 fixed overflow-hidden shadow-lg border -translate-y-1/2 border-dp-12 bg-dp-08 shadow-dp-00 rounded text-dp-24 p-2">
			{children}
		</div>
	);
}
