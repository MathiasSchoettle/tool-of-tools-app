import React from "react";
import {CornersOut, Minus, X} from "phosphor-react";

export default class TopBar extends React.Component {
    render() {
        return (
            <div className="bg-main-black w-full z-50 text-gray-500 h-topbar flex">
                <div className="grow draggable"></div>

                <div onClick={() => window.api.send("minimize-app")} className="flex items-center justify-center w-12 hover:bg-main-dark cursor-pointer text-sm hover:text-neutral-300">
                    <Minus size={16} />
                </div>

                <div onClick={() => window.api.send('maximize-app')} className="flex items-center justify-center w-12 hover:bg-main-dark cursor-pointer text-sm hover:text-neutral-300">
                    <CornersOut size={16} />
                </div>

                <div onClick={() => window.api.send('close-app')} className="flex items-center justify-center w-12 hover:bg-red-800 cursor-pointer hover:text-neutral-300">
                    <X size={16} />
                </div>
            </div>
        );
    }
}
