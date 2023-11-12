import React from 'react'

export default function SuccessButton({type = "button", disabled = false, onClick, children}) {
	return (
		<button type={type} disabled={disabled} className="text-sm rounded bg-mn-700 hover:shadow-sm hover:bg-mn-600 focus:bg-mn-600 border border-transparent hover:border-mn-500 focus:border-mn-500 text-white font-medium h-fit py-1 px-3 transition duration-100" onClick={onClick}>
			{children}
		</button>
	);
}
