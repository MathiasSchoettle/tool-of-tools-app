import React from 'react'

export default function DefaultButton({type = "button", disabled = false, onClick, children}) {
	return (
		<button type={type} disabled={disabled} className="text-sm rounded hover:shadow-sm hover:bg-dp-12 focus:bg-dp-12 border border-transparent hover:border-dp-14 focus:border-dp-14 text-dp-32 h-fit py-1 px-2 transition duration-75" onClick={onClick}>
			{children}
		</button>
	);
}
