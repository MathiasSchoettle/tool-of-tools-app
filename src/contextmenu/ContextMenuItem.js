import React from 'react';

function ContextMenuItem({children, onClick, enabled = true}) {

    let style = {
        opacity: 0.3,
        pointerEvents: 'none'
    };

    return (
        <div style={enabled ? {} : style} className="cursor-pointer text-neutral-300 text-sm bg-white bg-opacity-0 hover:bg-opacity-10 pl-1 pr-5 py-0.5 rounded flex items-center gap-2 group" onClick={onClick}>
            {children}
        </div>
    );
}

export default ContextMenuItem;