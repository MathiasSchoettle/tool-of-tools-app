import {useOnClickOutside} from "../utils/ClickOutsideHook";
import {useEffect, useRef, useState} from "react";

export default function ContextMenuInternal({children, x, y, closeMenu}) {
	const contextMenuRef = useRef(null);
	useOnClickOutside(contextMenuRef, closeMenu);

	const [style, setStyle] = useState({
		left: 0,
		top: 0,
		opacity: 0
	});

	useEffect(() => {
		let newX = x;
		if (newX + contextMenuRef.current.offsetWidth >= window.innerWidth) {
			newX -= contextMenuRef.current.offsetWidth;
		}

		let newY = y;
		if (newY + contextMenuRef.current.offsetHeight >= window.innerHeight) {
			newY -= contextMenuRef.current.offsetHeight;
		}

		setStyle({
			left: newX + 'px',
			top:  newY + 'px',
			opacity: 1
		})
	}, [x, y]);

	let handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		closeMenu();
	};

	return (
		<div
			ref={contextMenuRef}
			onClick={handleClick}
			className="absolute z-50 rounded py-1.5 px-2 bg-dp-04 border border-dp-12 shadow-lg shadow-dp-00"
			style={style}
		>
			{children}
		</div>
	);
}