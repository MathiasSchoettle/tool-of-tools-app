import React from 'react'

export default function IconButton({onClick, children}) {

    const doClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.();
    }

    return (
        <button type="button" onClick={doClick} className="select-none cursor-pointer text-dp-24 bg-white px-1.5 py-1 rounded bg-opacity-0 hover:bg-opacity-5 transition duration-100">
            {children}
        </button>
    );
}
