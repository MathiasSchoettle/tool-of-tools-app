import React, {useState} from 'react'

export default function Toggle({on_toggle}) {
    const [is_toggled = false, toggle] = useState(false);

    let do_toggle = () => {
        toggle(!is_toggled);
        on_toggle(toggle);
    }

    return (
        <div onClick={do_toggle} className={"bg-gray-900 w-8 h-5 rounded-full p-1 cursor-pointer flex " + (is_toggled ? "justify-end" : "")}>
            <div className={"aspect-square rounded-full h-full " + (is_toggled ? "border border-gray-300 bg-gray-500" : "border border-gray-600 bg-gray-800")}>

            </div>
        </div>
    );
}
