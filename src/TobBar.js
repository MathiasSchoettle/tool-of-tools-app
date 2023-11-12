import React from 'react'
import { Minus, PanelLeft, Square, XIcon } from 'lucide-react'
import IconButton from './inputs/IconButton'

export default function TopBar({ toggle_sidebar }) {
    return (
        <div className="bg-dp-12 w-full z-50 text-neutral-300 h-topbar flex border-b border-dp-12">
            <div className="flex flex-shrink-0 items-center justify-center w-11">
                <IconButton onClick={toggle_sidebar}>
                    <PanelLeft size={18} />
                </IconButton>
            </div>

            <div className="grow draggable"></div>

            <div
                onClick={() => window.api.send('minimize-app')}
                className="flex items-center justify-center w-12 hover:bg-neutral-700 cursor-pointer text-sm hover:text-neutral-200"
            >
                <Minus size={12} />
            </div>

            <div
                onClick={() => window.api.send('maximize-app')}
                className="flex items-center justify-center w-12 hover:bg-neutral-700 cursor-pointer text-sm hover:text-neutral-200"
            >
                <Square size={12} />
            </div>

            <div
                onClick={() => window.api.send('close-app')}
                className="flex items-center justify-center w-12 hover:bg-red-500 cursor-pointer hover:text-neutral-200"
            >
                <XIcon size={12} />
            </div>
        </div>
    )
}
