import React from 'react'

const button_colors = {
    default: 'bg-neutral-700 border-neutral-500 focus:bg-neutral-600 hover:bg-neutral-600',
    primary: 'bg-blue-900 border-blue-600 focus:bg-blue-700 hover:bg-blue-700',
    success: 'bg-green-900 border-green-600 hover:bg-green-700 focus:bg-green-700',
    danger: 'bg-red-900 border-red-600 hover:bg-red-700 focus:bg-red-700',
}

export default function Button({type, disabled, onClick, children}) {
    let color_classes = button_colors[type];
    if (!color_classes) color_classes = button_colors.default;

    return (
        <button disabled={disabled} className={"select-none text-sm font-medium-none border rounded text-gray-300 hover:text-white py-1.5 px-3 " + color_classes + (disabled ? " opacity-30" : "")} onClick={onClick}>
            {children}
        </button>
    );
}
